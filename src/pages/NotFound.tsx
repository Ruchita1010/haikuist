import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 px-6">
      <p className="text-6xl md:text-9xl font-bold">404</p>
      <div className="mt-3">
        <p className="text-center md:text-xl font-semibold">Not Found</p>
        <p className="md:text-lg">
          We couldn't find the page you were looking for!
        </p>
      </div>
      <span className="md:text-lg underline">
        <Link to="/">Go back Home</Link>
      </span>
    </div>
  );
}
