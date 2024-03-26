import { useEffect, useState } from 'react';
import {
  getNotifications,
  setNotificationsAsRead,
} from '../../lib/supabase/api';
import { AppNotification } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Notification from '../../components/shared/Notification';

export default function Notifications() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    (async () => {
      if (!session) {
        alert('Please login');
        return;
      }

      const { data, error } = await getNotifications(session.user.id);
      if (error) {
        alert(error.message);
        return;
      }
      setNotifications(data);

      const { error: updateError } = await setNotificationsAsRead(
        session.user.id
      );
      if (updateError) {
        alert(updateError.message);
        return;
      }
    })();
  }, [session]);

  return (
    <div className="grid">
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
    </div>
  );
}
