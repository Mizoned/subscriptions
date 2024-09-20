import { defineStore } from 'pinia';
import { ref } from 'vue';
import { me as UserMe, updatePassword as UserUpdatePassword } from '../api';
import { useAuthStore } from '@/entities/auth/model';
import type { Ref } from 'vue';
import type { IUpdatePassword, IUser } from '@/entities/auth/types';

export const useUserStore = defineStore('User', () => {
  const userData = localStorage.getItem('user');
  const userJSON = userData ? JSON.parse(userData) : null;
  const user: Ref<IUser | null> = ref(userJSON);
  const isLoadingMe = ref<boolean>(false);
  const isLoadingPassword = ref<boolean>(false);
  const authStore = useAuthStore();

  const setUser = (data: IUser) => {
    user.value = {
      id: data.id,
      email: data.email
    };

    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const removeUser = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  const me = async () => {
    try {
      isLoadingMe.value = true;
      const { data: user } = await UserMe();
      setUser(user);
    } catch (error) {
      removeUser();
      authStore.removeAccessToken();
      console.log(error);
      throw error;
    } finally {
      setTimeout(() => {
        isLoadingMe.value = false;
      }, 1000);
    }
  };

  const updatePassword = async (settings: IUpdatePassword) => {
    try {
      isLoadingPassword.value = true;
      const { data: user } = await UserUpdatePassword(settings);
      setUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      isLoadingPassword.value = false;
    }
  };

  return {
    me,
    setUser,
    removeUser,
    updatePassword,
    user,
    isLoadingMe,
    isLoadingPassword,
  };
});
