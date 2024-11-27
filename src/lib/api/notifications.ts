import { supabase } from '../supabase';
import type { Notification } from '../../types/notification';

export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('userId', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data as Notification[];
}

export async function markNotificationAsRead(id: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id);

  if (error) throw error;
}

export async function createNotification(notification: Omit<Notification, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notification])
    .select()
    .single();

  if (error) throw error;
  return data as Notification;
} 