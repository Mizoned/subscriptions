<script setup lang="ts">
import { ref } from 'vue';

const settings = ref({
  email: '',
  oldPassword: '',
  newPassword: ''
});
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
            v-model.trim="settings.email"
            id="email"
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
          />
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
          />
        </div>
        <div class="field">
          <Button>Сохранить</Button>
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
