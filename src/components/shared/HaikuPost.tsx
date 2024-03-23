import { getAvatarUrl } from '../../lib/supabase/api';
import { HaikuPostType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import HaikuPostActions from './HaikuPostActions';

export default function HaikuPost({
  id,
  content,
  created_at,
  profiles,
}: HaikuPostType) {
  const { session } = useAuth();
  if (!session) {
    alert('Please log in!');
    return;
  }

  const { username, avatar_path } = profiles;

  const avatarUrl = avatar_path
    ? getAvatarUrl(avatar_path).data.publicUrl
    : '/assets/default-pfp.svg';

  const lines = content.split('\n');

  return (
    <div className="border-b-2 py-3">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-4">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-red-400">
            <img src={avatarUrl} className="w-full" />
          </div>
          <p>{username}</p>
        </div>
        <p>{created_at.toString()}</p>
      </div>
      <div className="text-lg pt-4 pb-6">
        {lines.map((line) => (
          <p className="break-words">{line}</p>
        ))}
      </div>
      <HaikuPostActions haikuId={id} userId={session.user.id} />
    </div>
  );
}
