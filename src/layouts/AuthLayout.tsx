import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Logo from '@components/Logo';
import sideImageDark from '@assets/images/side-img-dark.webp';
import sideImageLight from '@assets/images/side-img-light.webp';

export default function AuthLayout() {
  const { session } = useAuth();
  const { theme } = useTheme();
  return (
    <>
      {session === null ? (
        <div className="flex">
          <div className="flex-1 hidden xl:block">
            <img
              src={theme === 'dark' ? sideImageDark : sideImageLight}
              alt=""
              className="w-full min-h-screen object-cover aspect-square"
            />
          </div>
          <section className="min-h-screen flex-1 flex flex-col px-6 py-4">
            <Link to="/" aria-label="Haikuist">
              <Logo />
            </Link>
            <div className="h-full flex flex-col justify-center items-center">
              <div className="w-full sm:max-w-md">
                <Outlet />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <Navigate to="/home" replace />
      )}
    </>
  );
}
