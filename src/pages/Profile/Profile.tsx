import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PostgrestError } from '@supabase/supabase-js';
import {
  getAvatarUrl,
  getUserById,
  getUserHaikuPosts,
  getLikedHaikuPosts,
  getSavedHaikuPosts,
} from '@lib/supabase/api';
import { useAuth } from '@context/AuthContext';
import { formatMonthYear } from '@utils/dateFormatter';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabList from '@components/Tablist';
import Settings from './Settings';

export default function Profile() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [user, setUser] = useState({
    username: '',
    bio: '',
    avatarUrl: '',
    created_at: '',
  });

  useEffect(() => {
    (async () => {
      const { data, error } = await getUserById(session?.user.id || '');
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      const { avatar_path, ...userData } = data;
      const avatarUrl = avatar_path
        ? getAvatarUrl(avatar_path).data.publicUrl
        : '/assets/default-pfp.svg';
      setUser({ ...userData, avatarUrl });
      setLoading(false);
    })();
  }, []);

  const tabs = [
    { id: 'haikus', path: '/profile', label: 'Haikus' },
    { id: 'likes', path: '/profile/likes', label: 'Likes' },
    { id: 'saves', path: '/profile/saves', label: 'Saves' },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Some error occured :/</p>;
  }

  return (
    <section aria-labelledby="accessible-list-4">
      <h1 id="accessible-list-4" className="sr-only">
        Profile
      </h1>
      <Settings />
      <div className="flex flex-col md:flex-row gap-4 py-8 mb-8">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="flex-shrink-0 w-32 h-32 object-cover rounded-full"
        />
        <div className="flex flex-col justify-around overflow-hidden">
          <div>
            <p className="text-xl font-bold break-words">{user.username}</p>
            <p className="text-fgColor/70">
              Joined {formatMonthYear(user.created_at)}
            </p>
          </div>
          <p className="mt-2">{user.bio}</p>
        </div>
      </div>
      <TabList tabs={tabs} />

      <Routes>
        <Route
          index
          element={
            <Tab key="haikus" tabId="haikus" getData={getUserHaikuPosts} />
          }
        />
        <Route
          path="likes"
          element={
            <Tab key="likes" tabId="likes" getData={getLikedHaikuPosts} />
          }
        />
        <Route
          path="saves"
          element={
            <Tab key="saves" tabId="saves" getData={getSavedHaikuPosts} />
          }
        />
      </Routes>
    </section>
  );
}
