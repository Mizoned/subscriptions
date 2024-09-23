type NotificationType = 'info' | 'time' | 'warning' | 'error';

export interface CreateNotification {
  type: NotificationType;
  text: string;
}

export interface Notification {
  id: number;
  type: NotificationType;
  text: string;
  isRead: boolean;
  createdAt: string;
}
