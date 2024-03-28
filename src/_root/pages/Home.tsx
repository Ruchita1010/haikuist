import { useEffect, useState } from 'react';
import { getHaikuPosts } from '../../lib/supabase/api';
import { HaikuPostType } from '../../types';
import HaikuPost from '../../components/shared/HaikuPost';

export default function Home() {
  const [haikuPosts, setHaikuPosts] = useState([] as HaikuPostType[]);

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
    <section
      aria-labelledby="accessible-list-1"
      className="flex flex-col gap-2 min-h-screen">
      <h1 id="accessible-list-1" className="sr-only">
        Home
      </h1>
      {haikuPosts.map(({ id, content, created_at, profiles }) => {
        return (
          <HaikuPost
            key={id}
            id={id}
            content={content}
            created_at={created_at}
            profiles={profiles}
          />
        );
      })}
    </section>
  );
}
