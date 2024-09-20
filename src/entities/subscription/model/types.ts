export interface ISubscriptionModel {
  id: number;
  name: string;
  price: number;
  dateStart: string;
  dateEnd: string;
}

export interface ISubscription extends ISubscriptionModel {
  diffDays: number;
}

export interface ICreateSubscription {
  name: string;
  price: number | null;
  dateStart: Date | null;
  dateEnd: Date | null;
}