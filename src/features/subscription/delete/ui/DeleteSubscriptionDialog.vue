<script setup lang="ts">
import { useSubscriptionStore } from '@/entities/subscription/model';
import { useToast } from 'primevue/usetoast';

const subscriptionStore = useSubscriptionStore();
const toast = useToast();

const submitHandler = async () => {
  await subscriptionStore.deleteSubscriptionHandler()
    .then(() => {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Подписка успешно удалена', life: 3000 });
    });
}

</script>

<template>
  <Dialog header="Удаление подписки" v-model:visible="subscriptionStore.isOpenDeleteDialog" :style="{ width: '350px' }" :modal="true">
    <div class="flex items-center justify-center">
      <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
      <span>Вы уверены что хотите удалить подписку?</span>
    </div>
    <template #footer>
      <Button label="Отменить" icon="pi pi-times" @click="subscriptionStore.closeDeleteDialog" text severity="secondary" />
      <Button label="Подтвердить" icon="pi pi-check" @click="submitHandler" severity="danger" outlined autofocus />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>