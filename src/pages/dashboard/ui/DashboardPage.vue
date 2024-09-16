<script setup lang="ts">
import { formatCurrency, plural } from '@/shared/utils'
import { useSubscriptionStore } from '@/entities/subscription/model';
import { DeleteSubscriptionButton, DeleteSubscriptionDialog } from '@/features/subscription/delete';
import { CreateSubscriptionButton, CreateSubscriptionDialog } from '@/features/subscription/create';
import ViewSubscriptionButton from '@/features/subscription/view/ui/ViewSubscriptionButton.vue'
import ViewSubscriptionDialog from '@/features/subscription/view/ui/ViewSubscriptionDialog.vue'

const subscriptionStore = useSubscriptionStore();
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
              <div class="text-900 font-medium text-xl">126,56 ₽</div>
            </div>
          </div>
          <div class="statistic-card__footer">
            <span class="text-green-500 font-medium">60 ₽</span>
            <span class="text-500">выросло</span>
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
              <div class="text-900 font-medium text-xl">6,560 ₽</div>
            </div>
          </div>
          <div class="statistic-card__footer">
            <span class="text-green-500 font-medium">60 ₽</span>
            <span class="text-500">выросло</span>
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
              <div class="text-900 font-medium text-xl">5</div>
            </div>
          </div>
          <div class="statistic-card__footer">
            <span class="text-green-500 font-medium">179 ₽</span>
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
              <div class="text-900 font-medium text-xl">3/5</div>
            </div>
          </div>
          <div class="statistic-card__footer">
            <span class="text-green-500 font-medium">2</span>
            <span class="text-500">неактивны</span>
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
                <Button icon="pi pi-pencil" />
                <DeleteSubscriptionButton :id="slotProps.data.id" />
                <ViewSubscriptionButton :id="slotProps.data.id" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
  <CreateSubscriptionDialog />
  <DeleteSubscriptionDialog />
  <ViewSubscriptionDialog />
</template>

<style scoped lang="scss">
.card {
  height: 100%;
  background: var(--surface-card);
  padding: 2rem;
}

.circle-status {
  span:first-child {
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
  }
}

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
