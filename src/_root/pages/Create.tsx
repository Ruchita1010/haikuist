import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HaikuSchema, haikuSchema } from '../../lib/validation';
import { createHaikuPosts } from '../../lib/supabase/api';
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
    const { error } = await createHaikuPosts(
      session?.user.id || '',
      newHaiku.haiku
    );
    if (error) {
      // set toast message
      alert(error.message);
      return;
    }

    navigate('/home');
    reset();
  };

  return (
    <section aria-labelledby="accessible-list-3">
      <h1 id="accessible-list-3" className="sr-only">
        Create
      </h1>
      <div className="min-h-screen py-8">
        <div className="grid gap-6 my-6">
          <h2 className="text-2xl justify-self-center">Create a haiku</h2>
          <p>What's your verse?</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid">
            <div className="mb-10">
              <textarea
                id="haiku"
                rows={4}
                aria-label="write your haiku"
                placeholder="old pond&#10;frog leaps in&#10;water's sound"
                className="resize-none w-full p-4 bg-transparent text-fgColor border border-fgColor/25 rounded-md"
                {...register('haiku')}></textarea>
              {errors.haiku && (
                <p className="text-errColor">{`${errors.haiku.message}`}</p>
              )}
            </div>
            <button
              type="submit"
              className="min-w-32 justify-self-end px-4 py-2 bg-fgColor text-bgColor font-medium rounded-md hover:bg-fgColor/80">
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
