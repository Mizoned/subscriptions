<script setup lang="ts">
import { formatCurrency, plural } from '@/shared/utils'
import { useSubscriptionStore } from '@/entities/subscription';
import { DeleteSubscriptionButton, DeleteSubscriptionDialog } from '@/features/subscription/delete';
import { CreateSubscriptionButton, CreateSubscriptionDialog } from '@/features/subscription/create';
import { ViewSubscriptionButton, ViewSubscriptionDialog } from '@/features/subscription/view';
import { EditSubscriptionButton, EditSubscriptionDialog } from '@/features/subscription/edit';
import { computed, onMounted } from 'vue';
import type { ISubscription } from '@/entities/subscription';
import { useToast } from 'primevue/usetoast';

const subscriptionStore = useSubscriptionStore();
const toast = useToast();

const subscriptionCostPerMonth = computed<number | null>(() => {
  return subscriptionStore.activeSubscriptions?.reduce((acc, subscription) => acc + subscription.price, 0) / 12 ?? null;
});

const subscriptionCostTotal = computed<number | null>(() => {
  return subscriptionStore.activeSubscriptions?.reduce((acc, subscription) => acc + subscription.price, 0) ?? null;
});

const nextWriteOffSubscription = computed<ISubscription | null>(() => {
  if (subscriptionStore.activeSubscriptions.length) {
    return subscriptionStore.activeSubscriptions.reduce((prevSub, currSub) => currSub.diffDays < prevSub.diffDays ? currSub : prevSub);
  }

  return null;
});

onMounted(() => {
  subscriptionStore.getAllSubscriptionHandler()
    .catch(() => {
      toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: 'Не удалось получить список ваших подписок', life: 3000 });
    });
});
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card">
        <div class="statistic-card">
          <div class="statistic-card__header">
            <div class="statistic-card__title">
              <div class="flex align-items-center gap-2">
                <span class="text-500 font-medium">Стоимость подписок в месяц</span>
              </div>
              <div class="text-900 font-medium text-xl">
                {{ subscriptionCostPerMonth ? formatCurrency(subscriptionCostPerMonth) : formatCurrency(0) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card">
        <div class="statistic-card">
          <div class="statistic-card__header">
            <div class="statistic-card__title">
              <div class="flex align-items-center gap-2">
                <span class="text-500 font-medium">Стоимость подписок</span>
              </div>
              <div class="text-900 font-medium text-xl">
                {{ subscriptionCostTotal ? formatCurrency(subscriptionCostTotal) : formatCurrency(0) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card">
        <div class="statistic-card">
          <div class="statistic-card__header">
            <div class="statistic-card__title">
              <div class="flex align-items-center gap-2">
                <span class="text-500 font-medium">Дней до следующего списания</span>
              </div>
              <div class="text-900 font-medium text-xl">{{ nextWriteOffSubscription ? nextWriteOffSubscription.diffDays : 'Нет списания' }}</div>
            </div>
          </div>
          <div v-if="nextWriteOffSubscription" class="statistic-card__footer">
            <span class="text-green-500 font-medium">{{ formatCurrency(nextWriteOffSubscription.price) }}</span>
            <span class="text-500">спишется</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card">
        <div class="statistic-card">
          <div class="statistic-card__header">
            <div class="statistic-card__title">
              <div class="flex align-items-center gap-2">
                <span class="text-500 font-medium">Активные подписки</span>
              </div>
              <div v-if="subscriptionStore.subscriptions.length" class="text-900 font-medium text-xl">{{ subscriptionStore.activeSubscriptions.length + '/' + subscriptionStore.subscriptions.length }}</div>
              <div v-else class="text-900 font-medium text-xl">Нет подписок</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="flex gap-2 justify-content-between">
          <h5>Мои подписки</h5>
          <CreateSubscriptionButton />
        </div>
        <Divider />
        <DataTable :value="subscriptionStore.subscriptions" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column field="name" header="Название" :sortable="true" style="width: 25%"></Column>
          <Column field="price" header="Стоимость" :sortable="true" style="width: 25%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="diffDays" header="Осталось дней" :sortable="true" style="width: 25%">
            <template #body="slotProps">
              <template v-if="slotProps.data.diffDays > 31">
                <Tag icon="pi pi-clock" severity="success">
                  {{
                    slotProps.data.diffDays +
                    ' ' +
                    plural(['день', 'дня', 'дней'], slotProps.data.diffDays)
                  }}
                </Tag>
              </template>
              <template v-else-if="slotProps.data.diffDays <= 31 && slotProps.data.diffDays >= 15">
                <Tag icon="pi pi-clock" severity="warn">
                  {{
                    slotProps.data.diffDays +
                    ' ' +
                    plural(['день', 'дня', 'дней'], slotProps.data.diffDays)
                  }}
                </Tag>
              </template>
              <template v-else>
                <Tag icon="pi pi-clock" severity="danger">
                  {{
                    slotProps.data.diffDays +
                    ' ' +
                    plural(['день', 'дня', 'дней'], slotProps.data.diffDays)
                  }}
                </Tag>
              </template>
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <div class="flex align-items-center justify-content-end gap-2">
                <EditSubscriptionButton :id="slotProps.data.id" />
                <DeleteSubscriptionButton :id="slotProps.data.id" />
                <ViewSubscriptionButton :id="slotProps.data.id" />
              </div>
            </template>
          </Column>
          <template #empty>
            <span v-if="!subscriptionStore.subscriptions.length">Список подписок пуст.</span>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
  <CreateSubscriptionDialog />
  <DeleteSubscriptionDialog />
  <ViewSubscriptionDialog />
  <EditSubscriptionDialog />
</template>

<style scoped lang="scss">
.statistic-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
  }

  &__footer {
    display: flex;
    gap: 0.25rem;
  }
}
</style>
