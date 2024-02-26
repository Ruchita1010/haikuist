import { NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';

const navItems = ['home', 'notifications', 'create', 'profile'];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="flex md:flex-col justify-around lg:items-start">
      {navItems.map((navItem) => {
        const isActive = pathname === `/${navItem}`;
        return (
          <div className="group md:w-full">
            <NavLink
              to={`/${navItem}`}
              className="flex items-center md:max-lg:justify-center gap-2 px-2 py-4 rounded md:group-hover:bg-sky-100"
              key={navItem}>
              <Icon
                id={`icon-${navItem}`}
                className={`h-7 w-7 fill-none stroke-current group-hover:scale-110 ${
                  isActive && 'fill-sky-200'
                }`}
              />
              <span className="hidden lg:block first-letter:uppercase">
                {navItem}
              </span>
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}
