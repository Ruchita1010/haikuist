import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RootLayout() {
  const { session } = useAuth();

  return session === null ? <Navigate to="/signin" replace /> : <Outlet />;
}
