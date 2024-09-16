<script setup lang="ts">
import { useSubscriptionStore } from '@/entities/subscription/model'

interface IProps {
  id: number;
}

defineProps<IProps>();

const subscriptionStore = useSubscriptionStore();
</script>

<template>
  <Button icon="pi pi-eye" severity="success" @click="subscriptionStore.openViewDialog(id)" />
</template>

<style scoped lang="scss">

</style>