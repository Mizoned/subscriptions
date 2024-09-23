<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSubscriptionStore } from '@/entities/subscription/model';
import type { ICreateSubscription } from '@/entities/subscription/model/types';
import { helpers, required, numeric } from '@vuelidate/validators';
import { isDate, VALIDATION_MESSAGES } from '@/shared/validator';
import { type ServerErrors, useVuelidate } from '@vuelidate/core';
import { useToast } from 'primevue/usetoast';
import { useNotificationsStore } from '@/entities/notification';

const subscriptionStore = useSubscriptionStore();
const notificationStore = useNotificationsStore();
const toast = useToast();

const validationRules = computed(() => ({
  name: {
    required: helpers.withMessage(VALIDATION_MESSAGES.IS_NOT_EMPTY, required),
  },
  price: {
    required: helpers.withMessage(VALIDATION_MESSAGES.IS_NOT_EMPTY, required),
    numeric: helpers.withMessage(VALIDATION_MESSAGES.IS_NUMBER, numeric)
  },
  dateStart: {
    required: helpers.withMessage(VALIDATION_MESSAGES.IS_NOT_EMPTY, required),
    date: helpers.withMessage(VALIDATION_MESSAGES.IS_DATE, isDate)
  },
  dateEnd: {
    required: helpers.withMessage(VALIDATION_MESSAGES.IS_NOT_EMPTY, required),
    date: helpers.withMessage(VALIDATION_MESSAGES.IS_DATE, isDate)
  }
}));

const $externalResults = ref<ServerErrors>({
  name: '',
  price: '',
  dateStart: '',
  dateEnd: '',
});

const newSubscription = ref<ICreateSubscription>({
  name: '',
  price: null,
  dateStart: null,
  dateEnd: null,
});

const $v = useVuelidate<ICreateSubscription>(validationRules, newSubscription, { $externalResults });

const closeDialog = () => {
  newSubscription.value = {
    name: '',
    price: null,
    dateStart: null,
    dateEnd: null,
  }

  subscriptionStore.closeCreateDialog();
}

const resetExternalResultProperty = (propertyName: keyof ICreateSubscription) => {
  $externalResults.value[propertyName] = '';
}

const saveDialog = async () => {
  if (!(await $v.value.$validate())) return;

  await subscriptionStore.createSubscriptionHandler({ ...newSubscription.value })
    .then(() => {
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Подписка успешно создана', life: 3000 });
      notificationStore.addNotification({
        text: `Добавлена новая подписка: ${newSubscription.value.name}`,
        type: 'info'
      });
    });
  closeDialog();
}
</script>

<template>
  <Dialog
    v-model:visible="subscriptionStore.isOpenCreateDialog"
    :style="{ width: '450px' }"
    header="Создать подписку"
    :modal="true"
    @close="closeDialog"
    class="p-fluid"
  >
    <div class="field flex flex-column">
      <label for="name">Название</label>
      <InputText
        v-model.trim="newSubscription.name"
        @blur="$v.name.$touch()"
        :invalid="$v.name.$invalid && $v.name.$error"
        @update:modelValue="resetExternalResultProperty('name')"
        id="name"
      />
      <small
        v-if="$v.name.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.name.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field flex flex-column">
      <label for="price">Стоимость</label>
      <InputNumber
        v-model.trim="newSubscription.price"
        mode="currency"
        currency="RUB"
        input-id="price"
        @blur="$v.price.$touch()"
        :invalid="$v.price.$invalid && $v.price.$error"
        @update:modelValue="resetExternalResultProperty('price')"
      />
      <small
        v-if="$v.price.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.price.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field flex flex-column">
      <label for="dateStart">Дата подключения</label>
      <DatePicker
        v-model="newSubscription.dateStart"
        input-id="dateStart"
        date-format="dd.mm.yy"
        @blur="$v.dateStart.$touch()"
        :invalid="$v.dateStart.$invalid && $v.dateStart.$error"
        @update:modelValue="resetExternalResultProperty('dateStart')"
      />
      <small
        v-if="$v.dateStart.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.dateStart.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field flex flex-column">
      <label for="dateEnd">Дата отключения</label>
      <DatePicker
        v-model="newSubscription.dateEnd"
        input-id="dateEnd"
        date-format="dd.mm.yy"
        @blur="$v.dateEnd.$touch()"
        :invalid="$v.dateEnd.$invalid && $v.dateEnd.$error"
        @update:modelValue="resetExternalResultProperty('dateEnd')"
      />
      <small
        v-if="$v.dateEnd.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.dateEnd.$errors[0]?.$message }}
      </small>
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