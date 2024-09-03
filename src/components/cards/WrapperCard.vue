<!--TODO Тестовый компонент - потом удалить-->
<template>
  <div class="wrapper-card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.wrapper-card {
  background: var(--p-content-background);
  border: 1px solid var(--p-slate-200);
  padding: 2rem;
  box-shadow: var(--p-focus-ring-shadow);
  border-radius: var(--p-border-radius-xl);
}
</style>