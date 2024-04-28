import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@lib/supabase/supabaseClient';
import { SignupSchema, signupSchema } from '@lib/validation';
import { checkUsernameAvailability } from '@lib/supabase/api';
import { useSnackbar } from '@context/SnackbarContext';
import FormError from '@components/FormError';
import Loader from '@components/Loader';

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (user: SignupSchema) => {
    const { data: usernameAvailable, error: usernameError } =
      await checkUsernameAvailability(user.username);

    if (usernameError) {
      enqueueSnackbar(`Error signing up`);
      return;
    }
    if (!usernameAvailable) {
      setError('username', {
        type: 'custom',
        message: 'Username already taken. Please choose another',
      });
      return;
    }

    const { error, data } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          username: user.username,
        },
      },
    });

    if (error) {
      enqueueSnackbar(`Error signing up`);
      return;
    }
    if (data) {
      enqueueSnackbar('Please check your email for confirmation');
      navigate('/', { replace: true });
      reset();
    }
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-medium">Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
        <div>
          <label htmlFor="email" className="block mb-0.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            aria-required={`${!signupSchema.shape.email.isOptional()}`}
            aria-invalid={errors.email ? 'true' : 'false'}
            className="w-full px-4 py-2 bg-transparent text-fgColor border border-fgColor/25 rounded-md"
            {...register('email')}
          />
          <FormError error={errors.email} />
        </div>
        <div>
          <label htmlFor="username" className="block mb-0.5">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="haikuist123"
            aria-required={`${!signupSchema.shape.username.isOptional()}`}
            aria-invalid={errors.username ? 'true' : 'false'}
            className="w-full px-4 py-2 bg-transparent text-fgColor border border-fgColor/25 rounded-md"
            {...register('username')}
          />
          <FormError error={errors.username} />
        </div>
        <div>
          <label htmlFor="password" className="block mb-0.5">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            aria-required={`${!signupSchema.shape.password.isOptional()}`}
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
          Sign Up
          {isSubmitting && <Loader />}
        </button>
      </form>

      <div className="text-center mt-4">
        <p>
          Already have an account?
          <Link to="/signin" className="ml-1 font-medium underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
