<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import { ref, watch } from 'vue';
import { useMenuStore } from '../model';
import { useAuthStore } from '@/entities/auth';
import { useRouter } from 'vue-router';

const outsideClickListener = ref<null | ((event: any) => void)>(null);
const menuStore = useMenuStore();
const authStore = useAuthStore();
const router = useRouter();

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        menuStore.resetMenu();
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value);
    outsideClickListener.value = null;
  }
};

const isOutsideClicked = (event: any) => {
  const sidebarEl = document.querySelector('.app-layout__sidebar');
  const topbarEl = document.querySelector('.app-header-menu-toggle');

  return !(
    sidebarEl?.isSameNode(event.target) ||
    sidebarEl?.contains(event.target) ||
    topbarEl?.isSameNode(event.target) ||
    topbarEl?.contains(event.target)
  );
};

watch(
  () => menuStore.isMenuMobileActive,
  (value) => {
    if (value) {
      bindOutsideClickListener();
    } else {
      unbindOutsideClickListener();
    }
  }
);

const logoutHandler  = async () => {
  await authStore.logout();
  await router.push({ name: 'signin'});
}
</script>

<template>
  <div :class="['app-layout', menuStore.containerClass]">
    <div class="app-layout__header">
      <AppHeader />
    </div>
    <div class="app-layout__sidebar">
      <AppSidebar />
      <Button
        class="app-sidebar-logout w-full justify-content-start"
        severity="danger"
        text
        label="Выйти"
        icon="pi pi-sign-out"
        @click="logoutHandler"
      />
    </div>
    <div class="app-layout__container">
      <div class="app-layout__main">
        <RouterView />
      </div>
    </div>
    <div class="app-layout__mask animate-fadein"></div>
  </div>
  <Toast position="top-right" />
</template>

<style scoped lang="scss">
.app-sidebar-logout {
  margin-top: auto;
}

.app-layout {
  $root: #{&};
  min-height: 100vh;

  &__header {
    position: fixed;
    height: 4rem;
    z-index: 997;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 2rem;
    background-color: var(--surface-card);
    transition: left var(--layout-section-transition-duration);
    display: flex;
    align-items: center;
  }

  &__sidebar {
    position: fixed;
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 999;
    overflow-y: auto;
    user-select: none;
    left: 0;
    background-color: var(--surface-overlay);
    padding: 0.5rem 1.5rem;
    border-top: 1px solid var(--surface-ground);
    transform: translateX(-100%);
    top: 0;
    height: 100vh;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transition:
      transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99),
      left 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);

    @include use-media(desktop) {
      height: calc(100vh - 4rem);
      top: 4rem;
      transition:
        transform var(--layout-section-transition-duration),
        left var(--layout-section-transition-duration);
      transform: translateX(0);
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    padding: 6rem 2rem 0 2rem;
    transition: margin-left var(--layout-section-transition-duration);

    @include use-media(desktop) {
      margin-left: 20rem;
    }
  }

  &__main {
    flex: 1 1 auto;
    padding-bottom: 2rem;
  }

  &__mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background-color: var(--maskbg);
  }

  &#{$root}--inactive & {
    &__sidebar {
      transform: translateX(-100%);
      left: 0;
    }

    &__container {
      margin-left: 0;
      padding-left: 2rem;
    }
  }

  &#{$root}--mobile-active & {
    &__sidebar {
      transform: translateX(0);
    }

    &__mask {
      display: block;

      @include use-media(desktop) {
        display: none;
      }
    }
  }
}
</style>
