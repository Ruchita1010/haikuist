import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { PostgrestError } from '@supabase/supabase-js';
import {
  getAvatarUrl,
  getUserById,
  getUserHaikuPosts,
  getLikedHaikuPosts,
  getSavedHaikuPosts,
  signOutUser,
} from '../../lib/supabase/api';
import { useAuth } from '../../context/AuthContext';
import { formatMonthYear } from '../../utils/dateFormatter';
import Loader from '../../components/shared/Loader';
import TabList from '../../components/shared/Tablist';
import Tab from '../../components/shared/Tab';

export default function Profile() {
  const { session } = useAuth();
  const navigate = useNavigate();
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

  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      alert(error.message);
      return;
    }
    navigate('/signin', { replace: true });
  };

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
      <div className="grid justify-items-end p-4 mb-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="min-w-28 px-4 py-2 bg-sky-300 outline-4 outline-sky-500 rounded-md">
          Sign out
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="flex-shrink-0 w-32 h-32 object-cover rounded-full"
        />
        <div className="flex flex-col justify-around overflow-hidden">
          <div>
            <p className="text-xl font-bold break-words">{user.username}</p>
            <p className="text-zinc-500">
              Joined {formatMonthYear(user.created_at)}
            </p>
          </div>
          <p className="mt-2">{user.bio}</p>
        </div>
      </div>
      <div className="grid justify-items-end p-4">
        <Link
          to="/edit-profile"
          className="px-4 py-2 text-center border border-zinc-400 outline-4 outline-zinc-500 rounded-md">
          Edit Profile
        </Link>
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
          path="/likes"
          element={
            <Tab key="likes" tabId="likes" getData={getLikedHaikuPosts} />
          }
        />
        <Route
          path="/saves"
          element={
            <Tab key="saves" tabId="saves" getData={getSavedHaikuPosts} />
          }
        />
      </Routes>
    </section>
  );
}
