import { supabase } from './supabaseClient';
import { HaikuPostType } from '../../types';

export const haikuPostsQuery = supabase
  .from('haikus')
  .select(`id, content, created_at, profiles (username)`)
  .order('created_at', { ascending: false })
  .returns<Required<HaikuPostType>[]>();

export const getUserById = async (userId: string) => {
  const res = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return res;
};

export const signOutUser = async () => {
  const res = await supabase.auth.signOut();
  return res;
};
