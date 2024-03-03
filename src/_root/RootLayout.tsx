import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/shared/Navbar';

export default function RootLayout() {
  const { session } = useAuth();

  return session === null ? (
    <Navigate to="/signin" replace />
  ) : (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      <header className="sticky bottom-0 lg:w-72 md:max-lg:w-24 md:px-4 border-t-2 md:border-t-0 md:border-r-2">
        <div className="hidden md:block text-center my-4 lg:mx-4">
          <Link to="/home">
            <h1>Haikuist</h1>
          </Link>
        </div>
        <Navbar />
      </header>
      <main className="w-full h-screen flex overflow-y-auto">
        <div className="w-full sm:max-lg:w-7/12 lg:w-4/6 sm:border-r-2">
          <Outlet />
        </div>
        <div className="hidden sm:block">Today's Pick</div>
      </main>
    </div>
  );
}
