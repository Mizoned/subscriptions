<script setup lang="ts">
import { formatCurrency } from '@/shared/utils'
import { useSubscriptionStore } from '@/entities/subscription/model';

const subscriptionStore = useSubscriptionStore();
</script>

<template>
  <Dialog
    v-model:visible="subscriptionStore.isOpenViewDialog"
    :style="{ width: '450px' }"
    header="Информация о подписке"
    @close="subscriptionStore.closeViewDialog"
    :modal="true"
    class="p-fluid"
  >
    <div class="field flex flex-column">
      <label for="name">Название</label>
      <div class="font-bold">{{ subscriptionStore.subscriptionToBeSelected!.name }}</div>
    </div>
    <div class="field flex flex-column">
      <label for="price">Стоимость</label>
      <div class="font-bold">{{ formatCurrency(subscriptionStore.subscriptionToBeSelected!.price) }}</div>
    </div>
    <div class="field flex flex-column">
      <label for="dateStart">Дата подключения</label>
      <div class="font-bold">{{ subscriptionStore.subscriptionToBeSelected?.dateStart }}</div>
    </div>
    <div class="field flex flex-column">
      <label for="dateEnd">Дата отключения</label>
      <div class="font-bold">{{ subscriptionStore.subscriptionToBeSelected!.dateEnd }}</div>
    </div>
  </Dialog>
</template>