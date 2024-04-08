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
    <article className="grid grid-cols-[auto,minmax(0,1fr)] gap-3 py-3 border-b border-fgColor/15">
      <Icon
        id={`icon-${type}`}
        className={`h-8 w-8 ${
          type === 'like' ? 'fill-likeColor' : 'fill-commentColor'
        }`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <img
            src={
              avatar_path
                ? getAvatarUrl(avatar_path).data.publicUrl
                : '/assets/default-pfp.svg'
            }
            alt={`${username}'s avatar`}
            className="flex-shrink-0 w-11 h-11 object-cover rounded-full"
          />
          <span className="font-bold overflow-hidden">{username}</span>
          {type === 'comment' ? (
            <Link
              to={`/haiku/${id}`}
              aria-label="View comments on your post"
              className="underline">
              commented on your post
            </Link>
          ) : (
            <span className="sm:whitespace-nowrap">liked your post</span>
          )}
        </div>
        <div className="text-fgColor/60">
          {lines.map((line, index) => (
            <p key={index} className="break-words">
              {line}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
