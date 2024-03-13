import { useEffect, useState } from 'react';
import { getHaikuPosts } from '../../lib/supabase/api';
import { HaikuPostType } from '../../types';
import HaikuPost from '../../components/shared/HaikuPost';

export default function Home() {
  const [haikuPosts, setHaikuPosts] = useState([] as Required<HaikuPostType>[]);

  useEffect(() => {
    const fetchHaikuPosts = async () => {
      const { data, error } = await getHaikuPosts();

      if (error) {
        // set error and display error screen
        alert(error.message);
        return;
      }
      setHaikuPosts(data);
    };

    fetchHaikuPosts();
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
