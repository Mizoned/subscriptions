import axios from 'axios';
import { getEnvVariable } from '../../utils';

export const API_URL = getEnvVariable('VITE_APP_API_URL');

export const API = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

API.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
        localStorage.setItem('accessToken', response.data.accessToken);
        return API.request(originalRequest);
      } catch (error) {
        localStorage.removeItem('accessToken');
      }
    }

    return Promise.reject(error);
  }
);