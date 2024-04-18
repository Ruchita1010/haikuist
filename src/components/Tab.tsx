import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { HaikuPostType } from '@/types';
import { getUserHaikuPosts } from '@lib/supabase/api';
import { useAuth } from '@context/AuthContext';
import Loader from './Loader';
import HaikuPost from './HaikuPost/HaikuPost';

type TabProps = {
  tabId: string;
  getData: (id: string) => ReturnType<typeof getUserHaikuPosts>;
};

export default function Tab({ tabId, getData }: TabProps) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [haikuPosts, setHaikuPosts] = useState<HaikuPostType[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getData(session?.user.id || '');
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
    return (
      <div className="mt-6">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Some error occured :/</p>;
  }

  return (
    <div
      id={`tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      tabIndex={0}
      className="flex flex-col gap-4 min-h-screen">
      {haikuPosts.map(({ id, content, created_at, profile }) => {
        return (
          <HaikuPost
            key={id}
            id={id}
            content={content}
            created_at={created_at}
            profile={profile}
          />
        );
      })}
    </div>
  );
}
