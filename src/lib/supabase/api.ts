import { supabase } from './supabaseClient';
import { HaikuPostType, UserProfile } from '../../types';

export const signOutUser = async () => {
  const res = await supabase.auth.signOut();
  return res;
};

export const getUserById = async (userId: string) => {
  const res = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return res;
};

export const updateProfile = async (updates: UserProfile, userId: string) => {
  const res = await supabase.from('profiles').update(updates).eq('id', userId);
  return res;
};

export const uploadAvatar = async (filePath: string, file: File) => {
  const res = await supabase.storage.from('avatars').upload(filePath, file);
  return res;
};

export const getAvatarUrl = async (filePath: string) => {
  const res = await supabase.storage.from('avatars').getPublicUrl(filePath);
  return res;
};

export const haikuPostsQuery = supabase
  .from('haikus')
  .select(`id, content, created_at, profiles (username)`)
  .order('created_at', { ascending: false })
  .returns<Required<HaikuPostType>[]>();
