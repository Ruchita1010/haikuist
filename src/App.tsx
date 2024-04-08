import { Route, Routes } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import {
  Comments,
  Create,
  EditProfile,
  Home,
  Notifications,
  Profile,
} from './_root/pages';
import './globals.css';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          {/* Can't pass an array of routes to 'path'. And it's only two routes, so separating them seems a good choice. It feels unnessary to create a helper function that uses 'map' to loop over the routes.*/}
          <Route path="/" element={<SigninForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
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
