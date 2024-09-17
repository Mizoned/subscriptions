import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { deleteSubscription } from '@/entities/subscription/api'
import type { ICreateSubscription, ISubscription, ISubscriptionModel } from '@/entities/subscription/model/types'
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
  const isOpenDeleteDialog = ref<boolean>(false);
  const isOpenCreateDialog = ref<boolean>(false);
  const isOpenViewDialog = ref<boolean>(false);
  const isOpenEditDialog = ref<boolean>(false);
  const subscriptionToBeSelectedId = ref<number | null>(null);
  const subscriptionToBeSelected = computed<ISubscription | undefined>(() => subscriptions.value.find((item) => item.id === subscriptionToBeSelectedId.value));

  const subscriptions = computed<ISubscription[]>(() =>
    subscriptionModels.value.map((s) => ({
      ...s,
      diffDays: calculateDayDifferenceBetweenDates(new Date().toDateString(), s.dateEnd),
    }))
  );

  const activeSubscriptions = computed<ISubscription[]>(() => subscriptions.value.filter((s) => s.diffDays > 0));

  const openEditDialog = (id: number) => {
    subscriptionToBeSelectedId.value = id;
    isOpenEditDialog.value = true;
  }

  const closeEditDialog = () => {
    isOpenEditDialog.value = false;
    subscriptionToBeSelectedId.value = null;
  }

  const editSubscriptionHandler = (subscription: ICreateSubscription) => {
    const foundSubscription: ISubscriptionModel | undefined = subscriptionModels.value.find((item) => item.id === subscriptionToBeSelectedId.value);

    if (subscriptionToBeSelectedId.value && foundSubscription !== undefined) {

      foundSubscription.name = subscription.name;
      foundSubscription.price = subscription.price ?? 0;
      foundSubscription.dateStart = subscription.dateStart!.toDateString();
      foundSubscription.dateEnd = subscription.dateEnd!.toDateString();
    }
  }

  const openViewDialog = (id: number) => {
    subscriptionToBeSelectedId.value = id;
    isOpenViewDialog.value = true;
  }

  const closeViewDialog = () => {
    isOpenViewDialog.value = false;
    subscriptionToBeSelectedId.value = null;
  }

  const openCreateDialog = () => {
    isOpenCreateDialog.value = true;
  }

  const closeCreateDialog = () => {
    isOpenCreateDialog.value = false;
  }

  const createSubscriptionHandler = (subscription: ICreateSubscription) => {
    const min = Math.ceil(1005);
    const max = Math.floor(2000);
    const id = Math.floor(Math.random() * (max - min) + min);

    const newSubscription: ISubscriptionModel = {
      id,
      name: subscription.name,
      price: subscription.price ?? 0,
      dateStart: subscription.dateStart!.toDateString(),
      dateEnd: subscription.dateEnd!.toDateString(),
      deleted: false
    }

    subscriptionModels.value.push(newSubscription);
  }

  const openDeleteDialog = (id: number) => {
    subscriptionToBeSelectedId.value = id;
    isOpenDeleteDialog.value = true;
  }

  const closeDeleteDialog = () => {
    isOpenDeleteDialog.value = false;
    subscriptionToBeSelectedId.value = null;
  }

  const deleteSubscriptionHandler = async () => {
    if (subscriptionToBeSelectedId.value !== null) {
      const id = await deleteSubscription(subscriptionToBeSelectedId.value);

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
    openCreateDialog,
    closeCreateDialog,
    createSubscriptionHandler,
    openViewDialog,
    closeViewDialog,
    openEditDialog,
    closeEditDialog,
    editSubscriptionHandler,
    subscriptions,
    activeSubscriptions,
    isOpenDeleteDialog,
    isOpenCreateDialog,
    isOpenViewDialog,
    isOpenEditDialog,
    subscriptionToBeSelected,
  }
});