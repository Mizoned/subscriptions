<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppLayout } from '@/shared/ui/layouts'
import { AppHeader } from '@/widgets/app-header';
import { AppMenu } from '@/widgets/app-menu';

const route = useRoute();
const layout = computed(() => route.meta.layout || AppLayout);
</script>
<template>
  <component :is="layout">
    <template v-slot:header>
      <AppHeader />
    </template>
    <template v-slot:sidebar>
      <AppMenu />
    </template>
    <template v-slot:default>
      <RouterView />
    </template>
  </component>
</template>

<style lang="scss">
@import './index.scss';
</style>