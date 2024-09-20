import type { IUser } from '@/entities/auth/types';

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}