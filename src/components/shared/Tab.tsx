import { useEffect, useState } from 'react';
import { HaikuPostType } from '../../types';
import { getUserHaikuPosts } from '../../lib/supabase/api';
import { useAuth } from '../../context/AuthContext';
import HaikuPost from './HaikuPost';

type TabProps = {
  tabId: string;
  getData: (id: string) => ReturnType<typeof getUserHaikuPosts>;
};

export default function Tab({ tabId, getData }: TabProps) {
  const { session } = useAuth();
  const [haikuPosts, setHaikuPosts] = useState([] as Required<HaikuPostType>[]);

  useEffect(() => {
    if (!session) {
      alert('Please log in!');
      return;
    }

    const fetchHaikuPosts = async () => {
      const { data, error } = await getData(session.user.id);

      if (error) {
        alert(error.message);
        return;
      }
      setHaikuPosts(data);
    };

    fetchHaikuPosts();
  }, []);

  return (
    <div
      id={`tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      tabIndex={0}
      className="flex flex-col gap-4 min-h-screen">
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
    </div>
  );
}
