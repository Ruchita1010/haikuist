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

export type Comment = {
  id: string;
  content: string;
  created_at: Date;
  profiles: {
    username: string;
    avatar_path: string;
  };
};

export type AppNotification = {
  id: string;
  type: 'like' | 'comment';
  haiku: {
    id: string;
    content: string;
  };
  sender_profile: {
    username: string;
    avatar_path: string;
  };
};
