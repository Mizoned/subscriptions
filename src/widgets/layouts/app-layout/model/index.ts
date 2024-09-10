import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useMenuStore = defineStore('MenuStore', () => {
  const isMenuDesktopInactive = ref<boolean>(false);
  const isMenuMobileActive = ref<boolean>(false);

  const containerClass = computed(() => {
    return {
      'app-layout--inactive': isMenuDesktopInactive.value,
      'app-layout--mobile-active': isMenuMobileActive.value,
    }
  });

  const onMenuToggle = () => {
    if (window.innerWidth > 991) {
      isMenuDesktopInactive.value = !isMenuDesktopInactive.value;
    } else {
      isMenuMobileActive.value = !isMenuMobileActive.value;
    }
  }

  const resetMenu = () => {
    isMenuMobileActive.value = false;
  };

  return {
    onMenuToggle,
    resetMenu,
    isMenuMobileActive,
    containerClass
  }
});