<script setup lang="ts">
import { useSubscriptionStore } from '@/entities/subscription/model'

const subscriptionStore = useSubscriptionStore();
</script>

<template>
  <Button icon="pi pi-plus" label="Создать" @click="subscriptionStore.openCreateDialog" />
</template>