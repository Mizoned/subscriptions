<script setup lang="ts">
import { ref } from 'vue'
import { useSubscriptionStore } from '@/entities/subscription/model'
import type { ICreateSubscription } from '@/entities/subscription/model/types'

const subscriptionStore = useSubscriptionStore();

const newSubscription = ref<ICreateSubscription>({
  name: '',
  price: null,
  dateStart: null,
  dateEnd: null,
});

const closeDialog = () => {
  newSubscription.value = {
    name: '',
    price: null,
    dateStart: null,
    dateEnd: null,
  }

  subscriptionStore.closeCreateDialog();
}

const saveDialog = () => {
  subscriptionStore.createSubscriptionHandler(newSubscription.value);
  subscriptionStore.closeCreateDialog();
}
</script>

<template>
  <Dialog
    v-model:visible="subscriptionStore.isOpenCreateDialog"
    :style="{ width: '450px' }"
    header="Создать клиента"
    :modal="true"
    class="p-fluid"
  >
    <div class="field flex flex-column">
      <label for="name">Название</label>
      <InputText
        v-model.trim="newSubscription.name"
        id="name"
      />
    </div>
    <div class="field flex flex-column">
      <label for="price">Стоимость</label>
      <InputNumber
        v-model.trim="newSubscription.price"
        mode="currency"
        currency="RUB"
        input-id="price"
      />
    </div>
    <div class="field flex flex-column">
      <label for="dateStart">Дата подключения</label>
      <DatePicker
        v-model="newSubscription.dateStart"
        input-id="dateStart"
      />
    </div>
    <div class="field flex flex-column">
      <label for="dateEnd">Дата отключения</label>
      <DatePicker
        v-model="newSubscription.dateEnd"
        input-id="dateEnd"
      />
    </div>
    <template #footer>
      <Button
        label="Отменить"
        icon="pi pi-times"
        severity="danger"
        @click="closeDialog"
      />
      <Button
        label="Сохранить"
        icon="pi pi-check"
        @click="saveDialog"
      />
    </template>
  </Dialog>
</template>