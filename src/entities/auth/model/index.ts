import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from '@/entities/user';
import { signIn as AuthSignIn, signUp as AuthSignUp } from '../api/index';

export const useAuthStore = defineStore('AuthStore', () => {
  const userStore = useUserStore();
  const accessToken = ref<string | null>(localStorage.getItem('accessToken') || null);
  const isLoading = ref<boolean>(false);

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    accessToken.value = token;
  };

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
    accessToken.value = null;
  };

  const signIn = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      const response = await AuthSignIn(email, password);
      setAccessToken(response.data.accessToken);
      userStore.setUser(response.data.user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await AuthSignUp(email, password);
      setAccessToken(response.data.accessToken);
      userStore.setUser(response.data.user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      removeAccessToken();
      userStore.removeUser();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { signIn, signUp, logout, accessToken, isLoading, removeAccessToken };
});
