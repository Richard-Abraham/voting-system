import { supabase } from '../supabase';

export async function submitSupportTicket(ticket: {
  title: string;
  description: string;
  type: string;
}) {
  const { data, error } = await supabase
    .from('support_tickets')
    .insert([{
      ...ticket,
      status: 'open',
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
} 