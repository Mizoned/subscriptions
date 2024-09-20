export interface IUser {
  id: number;
  email: string;
}

export interface IUpdatePassword {
  newPassword: string;
  oldPassword: string;
}