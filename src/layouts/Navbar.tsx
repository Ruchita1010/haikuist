import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { supabase } from '@lib/supabase/supabaseClient';
import { getNotificationCount } from '@lib/supabase/api';
import { useAuth } from '@context/AuthContext';
import Icon from '@components/Icon';

const navItems = ['home', 'notifications', 'create', 'profile'];

export default function Navbar() {
  const { pathname } = useLocation();
  const { session } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);

  const userId = session?.user.id || '';
  useEffect(() => {
    const channel = supabase
      .channel(`notification_count_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `recipient_profile_id=eq.${userId}`,
        },
        () => {
          setNotificationCount((prevCount) => prevCount + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { count, error } = await getNotificationCount(userId);
      if (!error && count) {
        setNotificationCount(count);
      }
    })();
  }, [userId]);

  const resetNotificationCount = () => {
    setNotificationCount(0);
  };

  return (
    <nav className="flex md:flex-col justify-around lg:items-start bg-bgColor">
      {navItems.map((navItem) => {
        const isActive = pathname === `/${navItem}`;
        const isItemNotifications = navItem === 'notifications';
        const displayBadge = isItemNotifications && notificationCount > 0;

        return (
          <div key={navItem} className="group md:w-full">
            <NavLink
              to={`/${navItem}`}
              className="flex items-center md:max-lg:justify-center gap-2 px-2 py-4 rounded md:group-hover:bg-fgColor/10"
              {...(isItemNotifications && { onClick: resetNotificationCount })}>
              <div className={isItemNotifications ? 'relative' : ''}>
                <Icon
                  id={`icon-${navItem}`}
                  className={`h-7 w-7 fill-none stroke-current group-hover:scale-110 ${
                    isActive ? 'fill-fgColor/55' : ''
                  }`}
                />
                {displayBadge && (
                  <span
                    role="status"
                    className="absolute -top-1 right-0 min-w-4 h-4 flex justify-center items-center px-0.5 bg-fgColor text-bgColor text-xs rounded-full">
                    {notificationCount}
                    <span className="sr-only">unread notifications</span>
                  </span>
                )}
              </div>
              <span className="sr-only lg:not-sr-only lg:block first-letter:uppercase">
                {navItem}
              </span>
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}
