import { useNavigate } from 'react-router-dom';
import { supabase } from '@lib/supabase/supabaseClient';
import { useSnackbar } from '@context/SnackbarContext';

export default function AnonymousSignIn() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const guestSignIn = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      enqueueSnackbar('Error signing in as guest');
      return;
    }

    if (data) {
      navigate('/home', { replace: true });
    }
  };

  return (
    <button
      type="button"
      className="w-full mt-8 px-4 py-2 border border-fgColor/50 font-medium rounded-md hover:bg-fgColor/5"
      onClick={guestSignIn}>
      Continue as Guest
    </button>
  );
}
