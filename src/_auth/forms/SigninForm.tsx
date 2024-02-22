import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../lib/supabase/supabaseClient';
import { SigninSchema, signinSchema } from '../../lib/validation';
import Loader from '../../components/shared/Loader';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (user: SigninSchema) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      // set toast alert
      alert(error.message);
      return;
    }
    if (data) {
      navigate('/home', { replace: true });
      reset();
    }
  };

  return (
    <div className="grid justify-center">
      <div className="w-[300px] sm:w-[384px] flex flex-col">
        <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-2.5">
            <label htmlFor="email" className="block mb-0.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-zinc-300 outline-1 outline-zinc-400 rounded-md"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-700">{`${errors.email.message}`}</p>
            )}
          </div>
          <div className="mb-2.5">
            <label htmlFor="password" className="block mb-0.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-zinc-300 outline-1 outline-zinc-400 rounded-md"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-700">{`${errors.password.message}`}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center gap-2 mt-4 px-4 py-2 bg-sky-300 outline-4 outline-sky-500 rounded-md"
            disabled={isSubmitting}>
            {isSubmitting && <Loader />}
            <span>Sign In</span>
          </button>
        </form>
        <div className="grid justify-center mt-4">
          <p className="text-sm">
            Don't have an account?
            <Link to="/signup" className="ml-1 text-sky-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
        <div className="grid items-center gap-4 mt-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-full border-t border-zinc-300"></div>
            <span>or</span>
            <div className="w-full border-t border-zinc-300"></div>
          </div>
          <button className="px-4 py-2 bg-sky-200 outline-4 outline-sky-300 rounded-md">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
