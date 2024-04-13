import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@context/ThemeContext';
import AuthLayout from '@/layouts/AuthLayout';
import Signin from '@pages/Signin';
import Signup from '@pages/Signup';
import RootLayout from '@/layouts/RootLayout';
import Home from '@pages/Home';
import Create from '@pages/Create';
import Profile from '@pages/Profile/Profile';
import EditProfile from '@pages/EditProfile/EditProfile';
import Notifications from '@pages/Notifications/Notifications';
import Comments from '@pages/Comments';
import './globals.css';

function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen bg-bgColor text-fgColor ${
        theme === 'dark' ? 'dark' : 'light'
      }`}>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          {/* Can't pass an array of routes to 'path'. And it's only two routes, so separating them seems a good choice. It feels unnessary to create a helper function that uses 'map' to loop over the routes.*/}
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/haiku/:id" element={<Comments />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
