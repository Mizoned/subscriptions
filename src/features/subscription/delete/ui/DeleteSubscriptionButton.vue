<script setup lang="ts">
import { useSubscriptionStore } from '@/entities/subscription/model';

const subscriptionStore = useSubscriptionStore();

interface IProps {
  id: number;
}

defineProps<IProps>();
</script>

<template>
  <Button
    icon="pi pi-trash"
    severity="danger"
    @click="subscriptionStore.openDeleteDialog(id)"
  />
</template>

<style scoped lang="scss"></style>