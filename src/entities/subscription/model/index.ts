import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { deleteSubscription, createSubscription, updateSubscription, getAllSubscriptions } from '@/entities/subscription/api'
import type { ICreateSubscription, ISubscription, ISubscriptionModel } from '@/entities/subscription/model/types'
import { calculateDayDifferenceBetweenDates } from '@/shared/utils'

export const useSubscriptionStore = defineStore('subscriptionStore', () => {
  const subscriptionModels = ref<ISubscriptionModel[]>([]);
  const isOpenDeleteDialog = ref<boolean>(false);
  const isOpenCreateDialog = ref<boolean>(false);
  const isOpenViewDialog = ref<boolean>(false);
  const isOpenEditDialog = ref<boolean>(false);
  const isCreateLoading = ref<boolean>(false);
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

  const getAllSubscriptionHandler = async () => {
    const response = getAllSubscriptions();
    const data = (await response).data;
    subscriptionModels.value = data;
  }

  const editSubscriptionHandler = async (subscription: ICreateSubscription) => {
    const foundSubscription: ISubscriptionModel | undefined = subscriptionModels.value.find((item) => item.id === subscriptionToBeSelectedId.value);

    if (subscriptionToBeSelectedId.value && foundSubscription !== undefined) {
      foundSubscription.name = subscription.name;
      foundSubscription.price = subscription.price ?? 0;
      foundSubscription.dateStart = subscription.dateStart!.toDateString();
      foundSubscription.dateEnd = subscription.dateEnd!.toDateString();

      try {
        const response = await updateSubscription(foundSubscription);
      } catch (e) {
        console.error(e);
        throw e;
      }
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

  const createSubscriptionHandler = async (subscription: ICreateSubscription) => {
    const newSubscription: ICreateSubscription = {
      name: subscription.name,
      price: subscription.price ?? 0,
      dateStart: subscription?.dateStart?.toDateString() ?? null,
      dateEnd: subscription?.dateEnd?.toDateString() ?? null,
    }

    try {
      isCreateLoading.value = true;
      const response = await createSubscription(newSubscription);
      const data = response.data;
      subscriptionModels.value.push(data);
    } catch (e) {
      console.error(e);
      throw e;
    }
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
      const response = await deleteSubscription(subscriptionToBeSelectedId.value);
      if (response.data.deletedCount) {
        subscriptionModels.value = [...subscriptionModels.value].filter(item => item.id !== subscriptionToBeSelectedId.value);
        closeDeleteDialog();
      }

      return null;
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
    getAllSubscriptionHandler,
    subscriptions,
    activeSubscriptions,
    isOpenDeleteDialog,
    isOpenCreateDialog,
    isOpenViewDialog,
    isOpenEditDialog,
    subscriptionToBeSelected,
  }
});