export interface ISubscriptionModel {
  id: number;
  name: string;
  price: number;
  dateStart: string;
  dateEnd: string;
  deleted: boolean;
}

export interface ISubscription extends ISubscriptionModel {
  diffDays: number | null;
}