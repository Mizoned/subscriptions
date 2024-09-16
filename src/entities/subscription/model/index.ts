import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { deleteSubscription } from '@/entities/subscription/api'
import type { ISubscription, ISubscriptionModel } from '@/entities/subscription/model/types'
import { calculateDayDifferenceBetweenDates } from '@/shared/utils'

export const useSubscriptionStore = defineStore('subscriptionStore', () => {
  const subscriptionModels = ref<ISubscriptionModel[]>([
    {
      id: 1001,
      name: 'Подписка 1',
      price: 199,
      dateStart: '2024-09-16',
      dateEnd: '2025-09-16',
      deleted: false
    },
    {
      id: 1002,
      name: 'Подписка 2',
      price: 295,
      dateStart: '2024-09-01',
      dateEnd: '2024-09-01',
      deleted: false
    },
    {
      id: 1003,
      name: 'Подписка 3',
      price: 664,
      dateStart: '2024-04-01',
      dateEnd: '2024-10-01',
      deleted: false
    },
    {
      id: 1004,
      name: 'Подписка 4',
      price: 1293,
      dateStart: '2024-04-01',
      dateEnd: '2024-09-01',
      deleted: false
    },
    {
      id: 1005,
      name: 'Подписка 5',
      price: 129,
      dateStart: '2024-09-16',
      dateEnd: '2024-12-16',
      deleted: false
    }
  ]);
  const subscriptions = computed<ISubscription[]>(() =>
    subscriptionModels.value.map((s) => ({
      ...s,
      diffDays: calculateDayDifferenceBetweenDates(s.dateStart, s.dateEnd),
    }))
  );
  const isOpenDeleteDialog = ref<boolean>(false);
  const subscriptionToBeDeleted = ref<number | null>(null);

  const openDeleteDialog = (id: number) => {
    subscriptionToBeDeleted.value = id;
    isOpenDeleteDialog.value = true;
  }

  const closeDeleteDialog = () => {
    isOpenDeleteDialog.value = false;
    subscriptionToBeDeleted.value = null;
  }

  const deleteSubscriptionHandler = async () => {
    if (subscriptionToBeDeleted.value !== null) {
      const id = await deleteSubscription(subscriptionToBeDeleted.value);

      subscriptionModels.value = [...subscriptionModels.value].filter(item => item.id !== id);
      console.log('Удаление подписки с id: ', id);
      closeDeleteDialog();
      return id;
    }

    return null;
  }

  return {
    openDeleteDialog,
    closeDeleteDialog,
    deleteSubscriptionHandler,
    subscriptions,
    isOpenDeleteDialog
  }
});