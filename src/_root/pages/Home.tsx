import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase/supabaseClient';

export default function Home() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
      return;
    }
    navigate('/signin', { replace: true });
  };

  return (
    <div>
      <p>HOME</p>
      <button onClick={signOut} className="bg-zinc-600 text-zinc-50">
        Log out
      </button>
    </div>
  );
}
