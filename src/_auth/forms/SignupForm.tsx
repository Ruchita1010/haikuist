import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, signupSchema } from '../../lib/validation';
import Loader from '../../components/shared/Loader';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    // code to add it to the database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
  };

  return (
    <div className="grid justify-center">
      <div className="flex flex-col w-[330px] sm:w-[384px]">
        <h1 className="text-2xl mb-6 font-semibold">Join Today</h1>
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
            <label htmlFor="username" className="block mb-0.5">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-zinc-300 outline-1 outline-zinc-400 rounded-md"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-sm text-red-700">{`${errors.username.message}`}</p>
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
            <span>Sign Up</span>
          </button>
        </form>
        <div className="grid justify-center mt-4">
          <p className="text-sm">
            Already have an account?
            <Link to="/sign-in" className="ml-1 text-sky-300 font-semibold">
              Sign in
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
