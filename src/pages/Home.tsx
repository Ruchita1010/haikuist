import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { getHaikuPosts } from '@lib/supabase/api';
import { HaikuPostType } from '@/types';
import Loader from '@components/Loader';
import HaikuPost from '@components/HaikuPost/HaikuPost';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [haikuPosts, setHaikuPosts] = useState<HaikuPostType[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getHaikuPosts();
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      setHaikuPosts(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Some error occured :/</p>;
  }

  return (
    <section
      aria-labelledby="accessible-list-1"
      className="flex flex-col gap-2 min-h-screen">
      <h1 id="accessible-list-1" className="sr-only">
        Home
      </h1>
      {haikuPosts.length === 0 ? (
        <p className="mt-10 text-xl text-center">
          Looks like we don't have any haikus yet...
        </p>
      ) : (
        haikuPosts.map(({ id, content, created_at, profile }) => {
          return (
            <HaikuPost
              key={id}
              id={id}
              content={content}
              created_at={created_at}
              profile={profile}
            />
          );
        })
      )}
    </section>
  );
}
