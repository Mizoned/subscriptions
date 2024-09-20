<script setup lang="ts">
import { computed, ref } from 'vue';
import { type IUpdatePassword, useUserStore } from '@/entities/user';
import { useSettingsStore } from '@/entities/settings/model';
import { type ServerErrors, useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, requiredIf } from '@vuelidate/validators';
import { VALIDATION_MESSAGES as VALIDATION_ERROR } from '@/shared/validator';
import { AxiosError } from 'axios';
import { useToast } from 'primevue/usetoast';
import type { ResponseError } from '@/shared/api';

const email = ref<string>('');
const userStore = useUserStore();
const toast = useToast();

email.value = userStore.user?.email ?? '';

const rules = computed(() => ({
  newPassword: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!settings.value.newPassword.length)
    ),
    minLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MIN_LENGTH, minLength(8)),
    maxLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MAX_LENGTH, maxLength(32))
  },
  oldPassword: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!settings.value.oldPassword.length)
    ),
    minLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MIN_LENGTH, minLength(8)),
    maxLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MAX_LENGTH, maxLength(32))
  }
}));

const $externalSettings = ref<ServerErrors>({
  oldPassword: '',
  newPassword: ''
});

const settings = ref({
  oldPassword: '',
  newPassword: ''
});

const resetExternalSettings = (propertyName: keyof IUpdatePassword) => {
  $externalSettings.value[propertyName] = '';
};

const $vSettings = useVuelidate(rules, settings, {
  $externalResults: $externalSettings
});

const submitSettingsHandler = async () => {
  if (!(await $vSettings.value.$validate())) return;

  try {
    await settingsStore.updatePassword({ ...settings.value });
    settings.value.newPassword = '';
    settings.value.oldPassword = '';
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Пароль обновлен', life: 3000 });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        const message = error.response?.data.message;
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
      } else {
        const errors: ResponseError[] = error?.response?.data?.errors as ResponseError[];

        errors?.forEach((error: ResponseError) => {
          $externalSettings.value[error.property] = error.message;
        });
      }
    }
  }
};

const settingsStore = useSettingsStore();
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex gap-2 justify-content-between">
          <h5>Настройки</h5>
        </div>
        <Divider />
        <div class="field flex flex-column">
          <label for="email">Электронный адрес</label>
          <InputText
            v-model.trim="email"
            id="email"
            disabled
          />
        </div>
        <div class="field flex flex-column">
          <label for="oldPassword">Старый пароль</label>
          <Password
            input-class="w-full"
            v-model.trim="settings.oldPassword"
            input-id="oldPassword"
            toggleMask
            :feedback="false"
            @blur="$vSettings.oldPassword.$touch()"
            @update:modelValue="resetExternalSettings('oldPassword')"
            :invalid="
                $vSettings.oldPassword.$invalid && $vSettings.oldPassword.$error
              "
          />
          <small
            v-if="$vSettings.oldPassword?.$errors[0]?.$message"
            id="oldPasswordHelp"
            class="p-invalid p-error"
          >
            {{ $vSettings.oldPassword?.$errors[0]?.$message }}
          </small>
        </div>
        <div class="field flex flex-column">
          <label for="newPassword">Новый пароль</label>
          <Password
            input-class="w-full"
            v-model.trim="settings.newPassword"
            input-id="newPassword"
            toggleMask
            promptLabel="Введите пароль"
            weakLabel="Слабый"
            mediumLabel="Средний"
            strongLabel="Хороший"
            @blur="$vSettings.newPassword.$touch()"
            @update:modelValue="resetExternalSettings('newPassword')"
            :invalid="
                $vSettings.newPassword.$invalid && $vSettings.newPassword.$error
              "
          />
          <small
            v-if="$vSettings.newPassword?.$errors[0]?.$message"
            id="newPasswordHelp"
            class="p-invalid p-error"
          >
            {{ $vSettings.newPassword?.$errors[0]?.$message }}
          </small>
        </div>
        <div class="field">
          <Button :loading="settingsStore.isLoadingPassword" @click="submitSettingsHandler">Сохранить</Button>
        </div>
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
</style>
