import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { getNotifications, setNotificationsAsRead } from '@lib/supabase/api';
import { AppNotification } from '@/types';
import { useAuth } from '@context/AuthContext';
import Loader from '@components/Loader';
import Notification from './Notification';

export default function Notifications() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getNotifications(session?.user.id || '');
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      setNotifications(data);
      setLoading(false);

      const { error: updateError } = await setNotificationsAsRead(
        session?.user.id || ''
      );
      if (updateError) {
        return;
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Some error occured :/</p>;
  }

  return (
    <section aria-labelledby="accessible-list-2">
      <h1 id="accessible-list-2" className="sr-only">
        Notifications
      </h1>
      {notifications.length === 0 ? (
        <p className="text-lg">No notifications yet</p>
      ) : (
        notifications.map(({ id, type, haiku, sender_profile }) => {
          return (
            <Notification
              key={id}
              type={type}
              haiku={haiku}
              sender_profile={sender_profile}
            />
          );
        })
      )}
    </section>
  );
}
