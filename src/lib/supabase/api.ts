import { supabase } from './supabaseClient';
import { HaikuPostType, UserProfile } from '../../types';

// using "await" in these won't do anything useful so directly returning the promise
// supabase never throws synchronously, so not even using "async"

export const signOutUser = () => {
  return supabase.auth.signOut();
};

export const getUserById = (userId: string) => {
  return supabase.from('profiles').select('*').eq('id', userId).single();
};

export const updateProfile = (updates: UserProfile, userId: string) => {
  return supabase.from('profiles').update(updates).eq('id', userId);
};

export const uploadAvatar = (filePath: string, file: File) => {
  return supabase.storage.from('avatars').upload(filePath, file);
};

export const getAvatarUrl = (filePath: string) => {
  return supabase.storage.from('avatars').getPublicUrl(filePath);
};

export const createHaikuPosts = (userId: string, haiku: string) => {
  return supabase.from('haikus').insert({ profile_id: userId, content: haiku });
};

export const getHaikuPosts = () => {
  return supabase
    .from('haikus')
    .select(`id, content, created_at, profiles (username, avatar_url)`)
    .order('created_at', { ascending: false })
    .returns<Required<HaikuPostType>[]>();
};
