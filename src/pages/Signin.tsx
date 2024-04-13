import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@lib/supabase/supabaseClient';
import { SigninSchema, signinSchema } from '@lib/validation';
import FormError from '@/components/FormError';
import Loader from '@components/Loader';

export default function Signin() {
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
    <>
      <h1 className="mb-6 text-2xl font-medium">Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
        <div>
          <label htmlFor="email" className="block mb-0.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            aria-required={`${!signinSchema.shape.email.isOptional()}`}
            aria-invalid={errors.email ? 'true' : 'false'}
            className="w-full px-4 py-2 bg-transparent text-fgColor border border-fgColor/25 rounded-md"
            {...register('email')}
          />
          <FormError error={errors.email} />
        </div>
        <div>
          <label htmlFor="password" className="block mb-0.5">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            aria-required={`${!signinSchema.shape.password.isOptional()}`}
            aria-invalid={errors.password ? 'true' : 'false'}
            className="w-full px-4 py-2 bg-transparent text-fgColor border border-fgColor/25 rounded-md"
            {...register('password')}
          />
          <FormError error={errors.password} />
        </div>
        <button
          type="submit"
          className="flex justify-center gap-2 mt-4 py-2 bg-fgColor text-bgColor font-medium rounded-md hover:bg-fgColor/80"
          disabled={isSubmitting}>
          Sign In
          {isSubmitting && <Loader />}
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          Don't have an account?
          <Link to="/signup" className="ml-1 font-medium underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="grid gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-full border-t-2 border-fgColor/15"></div>
          or
          <div className="w-full border-t-2 border-fgColor/15"></div>
        </div>
        <button
          type="button"
          className="py-2 bg-fgColor/10 border border-fgColor/15 rounded-md hover:bg-fgColor/15">
          Continue with Google
        </button>
      </div>
    </>
  );
}
