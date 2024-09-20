<script setup lang="ts">
import { useUserStore } from '@/entities/user';
import { router } from '@/app/providers';

const userStore = useUserStore();

let accessToken = localStorage.getItem('accessToken');

if (accessToken) {
  userStore.me().catch(() => {
    router.push({ name: 'signin' });
  });
}
</script>

<template>
  <RouterView />
</template>

<style src="./styles/index.scss" lang="scss"></style>
