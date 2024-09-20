import axios, { type AxiosResponse } from 'axios';
import { API_URL, API } from '@/shared/api';
import type { IAuthResponse } from '@/entities/user/types';

const signIn = async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  return API.post('/auth/sign-in', { email, password });
}

const signUp = async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  return API.post('/auth/sign-up', { email, password });
}

const logout = async () => {
  return API.post('/auth/logout');
}

const refresh = async (): Promise<AxiosResponse<IAuthResponse>> => {
  return axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
}

export { signIn, signUp, logout, refresh }