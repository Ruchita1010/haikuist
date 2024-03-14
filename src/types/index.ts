export type UserProfile = {
  username: string;
  bio: string;
  avatar_path?: string;
};

export type HaikuPostType = {
  id?: string;
  content: string;
  created_at: Date;
  profiles: {
    username: string;
    avatar_path: string;
  };
};
