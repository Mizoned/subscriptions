<script setup lang="ts">
import { useSubscriptionStore } from '@/entities/subscription'

interface IProps {
  id: number;
}

defineProps<IProps>();

const subscriptionStore = useSubscriptionStore();
</script>

<template>
  <Button icon="pi pi-pencil" @click="subscriptionStore.openEditDialog(id)"/>
</template>