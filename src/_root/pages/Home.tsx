import { useEffect, useState } from 'react';
import { haikuPostsQuery } from '../../lib/supabase/api';
import { HaikuPostType } from '../../types';
import HaikuPost from '../../components/shared/HaikuPost';

export default function Home() {
  const [haikuPosts, setHaikuPosts] = useState([] as Required<HaikuPostType>[]);

  useEffect(() => {
    const getHaikuPosts = async () => {
      const { data, error } = await haikuPostsQuery;

      if (error) {
        // set error and display error screen
        alert(error.message);
        return;
      }
      setHaikuPosts(data);
    };

    getHaikuPosts();
  }, []);

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      {haikuPosts.map(({ id, content, created_at, profiles }) => {
        return (
          <HaikuPost
            key={id}
            content={content}
            created_at={created_at}
            profiles={profiles}
          />
        );
      })}
    </div>
  );
}
