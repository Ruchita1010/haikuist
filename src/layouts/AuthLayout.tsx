import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export default function AuthLayout() {
  const { session } = useAuth();
  return (
    <>
      {session === null ? (
        <div className="flex">
          <img
            src="/assets/images/side-img.jpg"
            alt=""
            className="h-screen w-1/2 hidden xl:block flex-1 basis-1/6 object-cover bg-no-repeat"
          />
          <section className="flex flex-col flex-1 px-6 py-4">
            <div className="text-xl font-semibold mt-1 mb-6">Haikuist</div>
            <Outlet />
          </section>
        </div>
      ) : (
        <Navigate to="/home" replace />
      )}
    </>
  );
}
