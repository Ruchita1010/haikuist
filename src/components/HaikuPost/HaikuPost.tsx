import { getAvatarUrl } from '@lib/supabase/api';
import { HaikuPostType } from '@/types';
import { useAuth } from '@context/AuthContext';
import { formatRelativeTime } from '@utils/dateFormatter';
import defaultAvatar from '@assets/images/default-avatar.svg';
import HaikuPostActions from './HaikuPostActions';

export default function HaikuPost({
  id,
  content,
  created_at,
  profile,
}: HaikuPostType) {
  const { session } = useAuth();
  const { username, avatar_path } = profile;
  const avatarUrl = avatar_path
    ? getAvatarUrl(avatar_path).data.publicUrl
    : defaultAvatar;
  const lines = content.split('\n');

  return (
    <article className="py-3 border-b border-fgColor/15">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 overflow-hidden">
          <img
            src={avatarUrl}
            alt={`${username}'s avatar`}
            className="flex-shrink-0 w-10 h-10 object-cover rounded-full"
          />
          <span>{username}</span>
        </div>
        <span className="text-sm text-fgColor/70">
          <time dateTime={created_at}>{formatRelativeTime(created_at)}</time>
        </span>
      </div>
      <div className="pt-4 pb-6">
        {lines.map((line, index) => (
          <p key={index} className="break-words">
            {line}
          </p>
        ))}
      </div>
      <HaikuPostActions haikuId={id} userId={session?.user.id || ''} />
    </article>
  );
}
