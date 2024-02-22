import { Route, Routes } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import './globals.css';

function App() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
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
        </Route>
      </Routes>
    </main>
  );
}

export default App;
