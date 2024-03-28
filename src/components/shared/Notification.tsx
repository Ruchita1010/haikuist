import { Link } from 'react-router-dom';
import { getAvatarUrl } from '../../lib/supabase/api';
import { AppNotification } from '../../types';
import Icon from './Icon';

type NotificationProps = Omit<AppNotification, 'id'>;

export default function Notification({
  type,
  haiku: { id, content },
  sender_profile: { username, avatar_path },
}: NotificationProps) {
  const lines = content.split('\n');

  return (
    <article className="grid grid-cols-[auto,minmax(0,1fr)] gap-3 py-3 border-b-2">
      <Icon
        id={`icon-${type}`}
        className={`h-8 w-8 ${
          type === 'like' ? 'fill-red-500' : 'fill-sky-500'
        }`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-11 h-11 overflow-hidden rounded-full">
            <img
              src={
                avatar_path
                  ? getAvatarUrl(avatar_path).data.publicUrl
                  : '/assets/default-pfp.svg'
              }
              alt={`${username}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{username}</span>
            {type === 'comment' ? (
              <Link
                to={`/haiku/${id}`}
                aria-label="View comments on your post"
                className="underline">
                commented on your post
              </Link>
            ) : (
              'liked your post'
            )}
          </div>
        </div>
        <div className="text-zinc-400">
          {lines.map((line) => (
            <p className="break-words">{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
