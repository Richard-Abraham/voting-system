export type NotificationType = 'deadline' | 'result' | 'info';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  actionUrl?: string;
  actionText?: string;
  read: boolean;
  created_at: string;
} 