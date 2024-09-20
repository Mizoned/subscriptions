import { API } from '@/shared/api';
import type { AxiosResponse } from 'axios';
import type { ICreateSubscription, ISubscriptionModel } from '@/entities/subscription/model/types';
import type { ResponseDelete } from '@/shared/api/types';

export const deleteSubscription = async (id: number): Promise<AxiosResponse<ResponseDelete>> => {
  return API.delete(`/subscriptions/${id}`);
}

export const getAllSubscriptions = async (): Promise<AxiosResponse<ISubscriptionModel[]>> => {
  return API.get('/subscriptions');
}

export const createSubscription = async (subscription: ICreateSubscription): Promise<AxiosResponse<ISubscriptionModel>> => {
  return API.post('/subscriptions', subscription);
}

export const updateSubscription = async (subscription: ISubscriptionModel): Promise<AxiosResponse<ISubscriptionModel>> => {
  return API.put(`/subscriptions/${subscription.id}`, subscription);
}