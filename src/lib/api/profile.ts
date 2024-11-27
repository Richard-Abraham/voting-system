import { supabase } from '../supabase';

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(profile: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id)
    .select()
    .single();

  if (error) throw error;
  return data;
} 