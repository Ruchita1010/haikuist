import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import {
  getAvatarUrl,
  getUserById,
  getUserHaikuPosts,
  getLikedHaikuPosts,
  getSavedHaikuPosts,
  signOutUser,
} from '../../lib/supabase/api';
import { useAuth } from '../../context/AuthContext';
import TabList from '../../components/shared/Tablist';
import Tab from '../../components/shared/Tab';

export default function Profile() {
  const initialUser = { username: '', bio: '', avatarUrl: '' };
  const [user, setUser] = useState(initialUser);

  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      alert('Please log in!');
      return;
    }

    const getProfile = async () => {
      const { data, error } = await getUserById(session.user.id);
      if (error) {
        alert(error.message);
        return;
      }

      const { username, bio, avatar_path } = data;
      const avatarUrl = avatar_path
        ? getAvatarUrl(avatar_path).data.publicUrl
        : '/assets/default-pfp.svg';

      setUser({ username, bio, avatarUrl });
    };

    getProfile();
  }, [session]);

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

  return (
    <>
      <div className="grid justify-items-end p-4 mb-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="min-w-28 px-4 py-2 bg-sky-300 outline-4 outline-sky-500 rounded-md">
          Sign out
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <div className="min-w-32 max-w-32 h-32 overflow-hidden border-2 rounded-full">
          <img
            src={user.avatarUrl}
            className="w-full h-full object-cover"
            aria-label="Avatar"
          />
        </div>
        <div className="flex flex-col justify-around">
          <div>
            <p className="text-xl font-bold">{user.username}</p>
            <p>Joined August 2022</p>
          </div>
          <p className="mt-2">{user.bio}</p>
        </div>
      </div>
      <div className="grid justify-items-end p-4">
        <Link
          to={'/edit-profile'}
          className="px-4 py-2 text-center border border-zinc-400 outline-4 outline-zinc-500 rounded-md">
          Edit Profile
        </Link>
      </div>
      <TabList tabs={tabs} />

      <Routes>
        <Route
          index
          element={<Tab key="haikus" getData={getUserHaikuPosts} />}
        />
        <Route
          path="/likes"
          element={<Tab key="likes" getData={getLikedHaikuPosts} />}
        />
        <Route
          path="/saves"
          element={<Tab key="saves" getData={getSavedHaikuPosts} />}
        />
      </Routes>
    </>
  );
}
