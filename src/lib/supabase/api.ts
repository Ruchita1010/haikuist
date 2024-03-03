import { supabase } from './supabaseClient';
import { HaikuPostType } from '../../types';

export const haikuPostsQuery = supabase
  .from('haikus')
  .select(`id, content, created_at, profiles (username)`)
  .order('created_at', { ascending: false })
  .returns<Required<HaikuPostType>[]>();
