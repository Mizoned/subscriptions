<script setup lang="ts">
import NotificationCard from '@/features/notification/ui/NotificationCard.vue';
import { useNotificationsStore } from '@/entities/notification';

const notificationsStore = useNotificationsStore();
</script>

<template>
  <div class="grid gap-3">
    <template v-if="notificationsStore.filteredAndSortedNotifications.length > 0">
      <NotificationCard
        class="col-12"
        v-for="(notification, index) in notificationsStore.filteredAndSortedNotifications"
        :key="index"
        :id="notification.id"
        :type="notification.type"
        :text="notification.text"
        :is-read="notification.isRead"
        :created-at="notification.createdAt"
      />
    </template>
    <template v-else>
      <div class="card col-12">
        <div class="flex justify-content-center text-lg font-bold">Список уведомлений пуст</div>
      </div>
    </template>
  </div>
</template>