import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUpdatePassword } from '@/entities/auth';
import { useUserStore } from '@/entities/user';

export const useSettingsStore = defineStore('settingsStore', () => {
  const isLoadingPassword = ref<boolean>(false);
  const userStore = useUserStore();

  const updatePassword = async (settings: IUpdatePassword) => {
    try {
      isLoadingPassword.value = true;
      await userStore.updatePassword(settings);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      isLoadingPassword.value = false;
    }
  };

  return { updatePassword, isLoadingPassword };
});