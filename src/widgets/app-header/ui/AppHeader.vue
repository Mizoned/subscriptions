<script setup lang="ts">
import { AppLogo } from '@/shared/ui/logo'
</script>

<template>
  <div class="app-header">
    <div class="app-header-logo-container">
      <button class="app-header-action">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="app-header-logo">
        <AppLogo />
        <span>PRIME</span>
      </router-link>
    </div>

    <div class="app-header-actions">
      <div class="app-header-menu hidden lg:block">
        <div class="app-header-menu-content">
          <button type="button" class="app-header-action">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header {
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

  .app-header-logo-container {
    width: 20rem;
    display: flex;
    align-items: center;
  }

  .app-header-logo {
    display: inline-flex;
    align-items: center;
    font-size: 1.5rem;
    border-radius: var(--content-border-radius);
    color: var(--text-color);
    font-weight: 500;
    gap: 0.5rem;

    svg {
      width: 3rem;
    }

    &:focus-visible {
      @include focused();
    }
  }

  .app-header-action {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    background-color: transparent;
    color: var(--text-color);
    margin-right: 0.5rem;
    transition: background-color var(--element-transition-duration);
    cursor: pointer;

    &:hover {
      background-color: var(--surface-hover);
    }

    &:focus-visible {
      @include focused()
    }

    i {
      font-size: 1.25rem;
    }

    span {
      font-size: 1rem;
      display: none;
    }
  }

  .app-header-menu-button {
    display: none;
    margin-right: 0.5rem;
  }

  .app-header-actions {
    margin-left: auto;
    display: flex;
    gap: 1rem;
  }

  .app-header-menu-content {
    display: flex;
    gap: 1rem;
  }
}

@media (max-width: 991px) {
  .app-header {
    padding: 0 2rem;

    .app-header-logo-container {
      width: auto;
    }

    .app-header-menu-button {
      display: inline-flex;
      margin-left: 0;
      margin-right: 0.5rem;
    }

    .app-header-menu {
      position: absolute;
      background-color: var(--surface-overlay);
      transform-origin: top;
      box-shadow:
        0px 3px 5px rgba(0, 0, 0, 0.02),
        0px 0px 2px rgba(0, 0, 0, 0.05),
        0px 1px 4px rgba(0, 0, 0, 0.08);
      border-radius: var(--content-border-radius);
      padding: 1rem;
      right: 2rem;
      top: 4rem;
      min-width: 15rem;
      border: 1px solid var(--surface-border);

      .app-header-menu-content {
        gap: 0.5rem;
      }

      .app-header-action {
        display: flex;
        width: 100%;
        height: auto;
        justify-content: flex-start;
        border-radius: var(--content-border-radius);
        padding: 0.5rem 1rem;

        i {
          font-size: 1rem;
          margin-right: 0.5rem;
        }

        span {
          font-weight: medium;
          display: block;
        }
      }
    }

    .app-header-menu-content {
      flex-direction: column;
    }
  }
}
</style>