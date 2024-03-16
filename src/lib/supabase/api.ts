import { supabase } from './supabaseClient';
import { HaikuPostType, UserProfile } from '../../types';

export const getAvatarUrl = (filePath: string) => {
  // getPublicUrl() doesn't make a DB call, simply does string concatenation
  return supabase.storage.from('avatars').getPublicUrl(filePath);
};

// using "await" in these funcs won't do anything useful so directly returning the promise
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

export const createHaikuPosts = (userId: string, haiku: string) => {
  return supabase.from('haikus').insert({ profile_id: userId, content: haiku });
};

export const getHaikuPosts = () => {
  return supabase
    .from('haikus')
    .select(`id, content, created_at, profiles (id, username, avatar_path)`)
    .order('created_at', { ascending: false })
    .returns<Required<HaikuPostType>[]>();
};

export const likeHaikuPost = (haikuId: string, userId: string) => {
  return supabase
    .from('likes')
    .insert({ haiku_id: haikuId, profile_id: userId });
};

export const unlikeHaikuPost = (haikuId: string, userId: string) => {
  return supabase
    .from('likes')
    .delete()
    .eq('haiku_id', haikuId)
    .eq('profile_id', userId);
};

export const checkIsLiked = (haikuId: string, userId: string) => {
  return supabase
    .from('likes')
    .select('id')
    .eq('haiku_id', haikuId)
    .eq('profile_id', userId)
    .maybeSingle();
};
