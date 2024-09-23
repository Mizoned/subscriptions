<script setup lang="ts">
  import { computed } from 'vue';
  import { type Notification, useNotificationsStore } from '@/entities/notification';

  interface NotificationSettings {
    title: string;
    iconColor: string;
  }

  const notificationStore = useNotificationsStore();

  const props = defineProps<Notification>();

  const notificationSettings = computed<NotificationSettings>(() => {
    const settings: NotificationSettings = {
      title: '',
      iconColor: '',
    }

    switch (props.type) {
      case 'info':
        settings.title = 'Информация';
        settings.iconColor = 'is-info';
        break;
      case 'time':
        settings.title = 'Время оплаты';
        settings.iconColor = 'is-time';
        break;
      case 'warning':
        settings.title = 'Предупреждение';
        settings.iconColor = 'is-warning';
        break;
      case 'error':
        settings.title = 'Ошибка';
        settings.iconColor = 'is-error';
        break;
    }

    return settings;
  });

  const submitHandler = () => {
    if (props.isRead) {
      return;
    }

    notificationStore.readNotification(props.id);
  }
</script>

<template>
  <div class="card notification-card">
    <div class="notification-card__header">
      <div class="notification-card__icon" :class="notificationSettings.iconColor">
        <i v-if="props.type === 'warning'" class="pi pi-exclamation-triangle" />
        <i v-if="props.type === 'info'" class="pi pi-info-circle" />
        <i v-if="props.type === 'time'" class="pi pi-clock" />
        <i v-if="props.type === 'error'" class="pi pi-ban" />
      </div>
      <div class="notification-card__title text-lg font-bold">{{ notificationSettings.title }}</div>
    </div>
    <div class="notification-card__content">{{ props.text }}</div>
    <div class="notification-card__actions">
      <Button @click="submitHandler" :disabled="props.isRead">
        {{ props.isRead ? 'Прочитано' : 'Прочитать' }}
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification-card {
  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__icon {
    flex-shrink: 0;

    i {
      font-size: 1.5rem;
    }

    &.is-info {
      color: var(--blue-500);
    }

    &.is-time {
      color: var(--cyan-500);
    }

    &.is-error {
      color: var(--red-500);
    }

    &.is-warning {
      color: var(--orange-500);
    }
  }

  &__content {
    padding: 1rem 0 1rem 2.5rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>