<script setup lang="ts">
import { ref } from 'vue'
import { useSubscriptionStore } from '@/entities/subscription/model'
import type { ICreateSubscription } from '@/entities/subscription/model/types'

const subscriptionStore = useSubscriptionStore();

const subscriptionData = ref<ICreateSubscription>({
  name: '',
  price: null,
  dateStart: null,
  dateEnd: null,
});

const closeDialog = () => {
  subscriptionData.value = {
    name: '',
    price: null,
    dateStart: null,
    dateEnd: null,
  }

  subscriptionStore.closeEditDialog();
}

const saveDialog = () => {
  subscriptionStore.editSubscriptionHandler({ ...subscriptionData.value });
  closeDialog();
}

const showDialogHandler = () => {
  subscriptionData.value = {
    name: subscriptionStore.subscriptionToBeSelected!.name,
    price: subscriptionStore.subscriptionToBeSelected!.price,
    dateStart: new Date(subscriptionStore.subscriptionToBeSelected!.dateStart),
    dateEnd: new Date(subscriptionStore.subscriptionToBeSelected!.dateEnd)
  }
}
</script>

<template>
  <Dialog
    v-model:visible="subscriptionStore.isOpenEditDialog"
    :style="{ width: '450px' }"
    header="Редактировать подписку"
    @show="showDialogHandler"
    @close="closeDialog"
    :modal="true"
    class="p-fluid"
  >
    <div class="field flex flex-column">
      <label for="name">Название</label>
      <InputText
        v-model.trim="subscriptionData.name"
        id="name"
      />
    </div>
    <div class="field flex flex-column">
      <label for="price">Стоимость</label>
      <InputNumber
        v-model.trim="subscriptionData.price"
        mode="currency"
        currency="RUB"
        input-id="price"
      />
    </div>
    <div class="field flex flex-column">
      <label for="dateStart">Дата подключения</label>
      <DatePicker
        v-model="subscriptionData.dateStart"
        input-id="dateStart"
        date-format="dd.mm.yy"
      />
    </div>
    <div class="field flex flex-column">
      <label for="dateEnd">Дата отключения</label>
      <DatePicker
        v-model="subscriptionData.dateEnd"
        input-id="dateEnd"
        date-format="dd.mm.yy"
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