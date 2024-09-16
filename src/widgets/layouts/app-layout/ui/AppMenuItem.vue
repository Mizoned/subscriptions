<script setup lang="ts">
import type { ISidebarItem } from '@/widgets/layouts/app-layout/interfaces';

interface IProps {
  root?: boolean;
  item: ISidebarItem;
}

withDefaults(defineProps<IProps>(), {
  root: true
});
</script>

<template>
  <li class="app-sidebar-item">
    <div v-if="root" class="app-sidebar-item-text">{{ item.label }}</div>
    <router-link
      v-if="item.to && !item.items"
      class="app-sidebar-item-router"
      tabindex="0"
      :to="item.to"
    >
      <i :class="item.icon" class="app-sidebar-item-icon"></i>
      <span class="app-sidebar-item-text">{{ item.label }}</span>
    </router-link>
    <ul v-if="item.items" class="app-sidebar-item-submenu">
      <AppMenuItem
        v-for="(child, i) in item.items"
        :key="i"
        :item="child"
        :root="false"
      ></AppMenuItem>
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.app-sidebar-item {
  > .app-sidebar-item-text {
    font-size: 0.857rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--text-color);
    margin: 0.75rem 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    a {
      display: flex;
      align-items: center;
      position: relative;
      outline: 0 none;
      color: var(--text-color);
      cursor: pointer;
      padding: 0.75rem 1rem;
      border-radius: var(--content-border-radius);
      transition:
        background-color var(--element-transition-duration),
        box-shadow var(--element-transition-duration);

      .app-sidebar-item-icon {
        margin-right: 0.5rem;
      }

      &:hover {
        background-color: var(--surface-hover);
      }

      &:focus {
        @include focused-inset();
      }
    }
  }
}

.app-sidebar-item-router.router-link-active.router-link-exact-active {
  font-weight: 700;
  color: var(--primary-color);
}
</style>
