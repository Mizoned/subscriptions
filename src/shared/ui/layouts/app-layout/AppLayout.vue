<template>
  <div class="app-layout">
    <div class="app-layout__header">
      <slot name="header" />
    </div>
    <div class="app-layout__sidebar">
      <slot name="sidebar" />
    </div>
    <div class="app-layout__container">
      <div class="app-layout__main">
        <slot />
      </div>
    </div>
  </div>
  <Toast position="top-right" />
</template>

<style scoped lang="scss">
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
    height: calc(100vh - 4rem);
    z-index: 999;
    overflow-y: auto;
    user-select: none;
    top: 4rem;
    left: 0;
    transition:
      transform var(--layout-section-transition-duration),
      left var(--layout-section-transition-duration);
    background-color: var(--surface-overlay);
    padding: 0.5rem 1.5rem;
    border-top: 1px solid var(--surface-ground);
  }

  &__container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin-left: 20rem;
    justify-content: space-between;
    padding: 6rem 2rem 0 2rem;
    transition: margin-left var(--layout-section-transition-duration);
  }

  &__main {
    flex: 1 1 auto;
    padding-bottom: 2rem;
  }
}
</style>