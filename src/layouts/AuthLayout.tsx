import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export default function AuthLayout() {
  const { session } = useAuth();
  return (
    <>
      {session === null ? (
        <div className="flex">
          <div className="flex-1 hidden xl:block">
            <img
              src="/assets/images/side-img.jpg"
              alt=""
              className="w-full object-cover"
            />
          </div>
          <section className="min-h-screen flex-1 flex flex-col px-6 py-4">
            <div className="text-xl font-semibold">Haikuist</div>
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
