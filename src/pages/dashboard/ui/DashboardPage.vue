<script setup lang="ts">
import { ref } from 'vue';
import { plural } from '@/shared/utils';

const products = ref([
  {
    id: '1001',
    name: 'Подписка 1',
    price: 199,
    daysLeft: 156,
    status: true
  },
  {
    id: '1002',
    name: 'Подписка 2',
    price: 295,
    daysLeft: 29,
    status: true
  },
  {
    id: '1003',
    name: 'Подписка 3',
    price: 664,
    daysLeft: 49,
    status: true
  },
  {
    id: '1004',
    name: 'Подписка 4',
    price: 1293,
    daysLeft: 14,
    status: true
  },
  {
    id: '1005',
    name: 'Подписка 5',
    price: 129,
    daysLeft: 0,
    status: false
  }
]);

const formatCurrency = (value: number) => {
  return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
};
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
          <Button icon="pi pi-plus" label="Создать" />
        </div>
        <Divider />
        <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column field="name" header="Название" :sortable="true" style="width: 25%"></Column>
          <Column field="price" header="Стоимость" :sortable="true" style="width: 25%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="daysLeft" header="Осталось дней" :sortable="true" style="width: 25%">
            <template #body="slotProps">
              <template v-if="slotProps.data.daysLeft > 31">
                <Tag icon="pi pi-clock" severity="success">
                  {{
                    slotProps.data.daysLeft +
                    ' ' +
                    plural(['день', 'дня', 'дней'], slotProps.data.daysLeft)
                  }}
                </Tag>
              </template>
              <template v-else-if="slotProps.data.daysLeft <= 31 && slotProps.data.daysLeft >= 15">
                <Tag icon="pi pi-clock" severity="warn">
                  {{
                    slotProps.data.daysLeft +
                    ' ' +
                    plural(['день', 'дня', 'дней'], slotProps.data.daysLeft)
                  }}
                </Tag>
              </template>
              <template v-else>
                <Tag icon="pi pi-clock" severity="danger">
                  {{
                    slotProps.data.daysLeft +
                    ' ' +
                    plural(['день', 'дня', 'дней'], slotProps.data.daysLeft)
                  }}
                </Tag>
              </template>
            </template>
          </Column>
          <Column field="status" header="Статус подписки" :sortable="true" style="width: 25%">
            <template #body="slotProps">
              <template v-if="slotProps.data.status">
                <div class="circle-status flex align-items-center gap-2">
                  <span class="bg-green-500"></span>
                  <span>Активная</span>
                </div>
              </template>
              <template v-else>
                <div class="circle-status flex align-items-center gap-2">
                  <span class="bg-red-500"></span>
                  <span>Неактивная</span>
                </div>
              </template>
            </template>
          </Column>
          <Column>
            <template>
              <div class="flex align-items-center justify-content-end gap-2">
                <Button icon="pi pi-pencil" />
                <Button icon="pi pi-trash" severity="danger" />
                <Button icon="pi pi-eye" severity="danger" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
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
