import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../lib/supabase/supabaseClient';
import { HaikuSchema, haikuSchema } from '../../lib/validation';
import { useAuth } from '../../context/AuthContext';

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HaikuSchema>({
    resolver: zodResolver(haikuSchema),
  });
  const navigate = useNavigate();
  const { session } = useAuth();

  const onSubmit = async (newHaiku: HaikuSchema) => {
    const { error } = await supabase
      .from('haikus')
      .insert([{ profile_id: session?.user.id, content: newHaiku.haiku }])
      .select();

    if (error) {
      // set toast message
      alert(error.message);
      return;
    }

    navigate('/home');
    reset();
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-sky-100">
      <div className="grid gap-6 my-6">
        <h1 className="text-2xl justify-self-center">Create a haiku</h1>
        <p>What's your verse?</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid">
          <textarea
            id="haiku"
            rows={4}
            aria-label="write your haiku"
            placeholder="old pond&#10;frog leaps in&#10;water's sound"
            className="resize-none w-full p-4 mb-10 text-border border-zinc-300 outline-1 outline-zinc-400 rounded-md"
            {...register('haiku')}></textarea>
          {errors.haiku && (
            <p className="text-sm text-red-700">{`${errors.haiku.message}`}</p>
          )}
          <button
            type="submit"
            className="w-1/4 min-w-20 justify-self-end px-4 py-2 bg-sky-300 outline-4 outline-sky-500 rounded-md">
            <span>Post</span>
          </button>
        </div>
      </form>
    </div>
  );
}
