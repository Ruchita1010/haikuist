import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import Navbar from './Navbar';

export default function RootLayout() {
  const { session } = useAuth();

  return session === null ? (
    <Navigate to="/signin" replace />
  ) : (
    <div className="max-w-[90rem] mx-auto flex flex-col-reverse md:flex-row transition-colors duration-300 ease-in-out">
      <header className="sticky bottom-0 md:top-0 md:h-screen lg:min-w-56 md:px-4 border-t md:border-t-0 md:border-r border-fgColor/15">
        <div className="hidden md:block text-center my-4">
          <Link to="/home">
            <h1>Haikuist</h1>
          </Link>
        </div>
        <Navbar />
      </header>
      <main className="min-h-screen min-w-0 px-6 pt-3 border-fgColor/15 sm:border-r">
        <Outlet />
      </main>
      <aside className="hidden md:block min-w-72 max-w-72 h-screen sticky top-0">
        <h1>Today's Pick</h1>
      </aside>
    </div>
  );
}
