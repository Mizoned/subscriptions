import type { IUpdatePassword, IUser } from '@/entities/auth';
import type { AxiosResponse } from 'axios';
import { API } from '@/shared/api';

const me = (): Promise<AxiosResponse<IUser>> => {
  return API.get('/user/profile/me');
}

const updatePassword = (passwordsData: IUpdatePassword): Promise<AxiosResponse<IUser>> => {
  return API.put('/user/profile/password', passwordsData);
}

export { me, updatePassword };
