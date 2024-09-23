import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { CreateNotification, Notification } from '../types';
import { useSubscriptionStore } from '@/entities/subscription';

export const useNotificationsStore = defineStore('NotificationStore', () => {
  const notificationsInLocalStorage: string | null = localStorage.getItem('notifications');
  const notifications = ref<Notification[]>(notificationsInLocalStorage ? JSON.parse(notificationsInLocalStorage) : []);
  const subscriptionStore = useSubscriptionStore();

  const filteredAndSortedNotifications = computed(() => {
    return [...notifications.value].sort((a: Notification, b: Notification) => {
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });

  const isActiveNotificationIndicator = computed<boolean>(() => {
    return notifications.value.some((n) => !n.isRead);
  });

  const setNotifications = () => {
    localStorage.setItem('notifications', JSON.stringify(notifications.value));
  }

  const randomId = (min: number, max: number) => {
    const rand: number = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const addNotification = (notification: CreateNotification) => {
    notifications.value.push({
      ...notification,
      id: randomId(0, 10000),
      isRead: false,
      createdAt: new Date().toISOString()
    });

    setNotifications();
  }

  const readNotification = (id: number) => {
    const notificationIndex: number = notifications.value.findIndex((n) => n.id === id);

    if (notificationIndex !== -1) {
      if (notifications.value[notificationIndex]) {
        notifications.value[notificationIndex].isRead = true;

        setNotifications();
      }
    }
  }

  watch(notifications.value, () => {
    subscriptionStore.checkSubscriptionByTime();
  });

  return {
    addNotification,
    readNotification,
    filteredAndSortedNotifications,
    isActiveNotificationIndicator
  }
});