export type UserProfile = {
  username: string;
  bio: string;
  avatar_path?: string;
};

export type HaikuPostType = {
  id: string;
  content: string;
  created_at: Date;
  profiles: {
    id: string;
    username: string;
    avatar_path: string;
  };
};
