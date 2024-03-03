export type HaikuPostType = {
  id?: string;
  content: string;
  created_at: Date;
  profiles: {
    username: string;
  };
};
