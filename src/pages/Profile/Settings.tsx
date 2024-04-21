import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '@lib/supabase/api';
import { useTheme } from '@context/ThemeContext';
import { useSnackbar } from '@context/SnackbarContext';
import Icon from '@components/Icon';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstElementRef = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      enqueueSnackbar('Error signing out');
      return;
    }
    navigate('/signin', { replace: true });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      firstElementRef.current?.focus();
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Node) {
        if (menuOpen && !menuRef.current?.contains(e.target)) {
          setMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className="relative flex justify-end"
      ref={menuRef}
      onKeyDown={handleKeyDown}>
      <button
        aria-haspopup="menu"
        aria-label="Settings"
        aria-controls="settings-menu"
        aria-expanded={menuOpen ? true : false}
        onClick={toggleMenu}>
        <Icon id="icon-settings" className="w-8 h-8 fill-none stroke-current" />
      </button>
      {menuOpen ? (
        <div
          id="settings-menu"
          className="w-48 absolute top-8 right-1 p-2 bg-bgColor border-2 border-fgColor/15 rounded-md">
          <Link
            to="/edit-profile"
            className="block px-4 py-3 rounded-md hover:bg-fgColor/10"
            ref={firstElementRef}>
            Edit Profile
          </Link>
          <button
            type="button"
            className="w-full px-4 py-3 text-left rounded-md hover:bg-fgColor/10"
            onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            type="button"
            className="w-full px-4 py-3 text-left rounded-md hover:bg-fgColor/10"
            onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
