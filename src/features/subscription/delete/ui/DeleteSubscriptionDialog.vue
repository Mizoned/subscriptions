<script setup lang="ts">
import { useSubscriptionStore } from '@/entities/subscription/model';

const subscriptionStore = useSubscriptionStore();
</script>

<template>
  <Dialog header="Удаление подписки" v-model:visible="subscriptionStore.isOpenDeleteDialog" :style="{ width: '350px' }" :modal="true">
    <div class="flex items-center justify-center">
      <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
      <span>Вы уверены что хотите удалить подписку?</span>
    </div>
    <template #footer>
      <Button label="Отменить" icon="pi pi-times" @click="subscriptionStore.closeDeleteDialog" text severity="secondary" />
      <Button label="Подтвердить" icon="pi pi-check" @click="subscriptionStore.deleteSubscriptionHandler" severity="danger" outlined autofocus />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>