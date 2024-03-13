import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById, signOutUser } from '../../lib/supabase/api';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const initialUser = { username: '', bio: '', avatar_url: '' };
  const [user, setUser] = useState(initialUser);

  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      alert('Please log in!');
      return;
    }

    const getProfile = async () => {
      const { data, error } = await getUserById(session?.user.id);
      if (error) {
        alert(error.message);
        return;
      }
      const { username, bio, avatar_url } = data;
      setUser({ username, bio, avatar_url });
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

  return (
    <div className="border-b-2">
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
            src={user.avatar_url || '/assets/default-pfp.svg'}
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
    </div>
  );
}
