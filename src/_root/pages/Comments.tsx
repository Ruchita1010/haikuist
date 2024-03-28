import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAvatarUrl, getComments } from '../../lib/supabase/api';
import { Comment } from '../../types';
import { formatRelativeTime } from '../../utils/dateFormatter';
import Icon from '../../components/shared/Icon';

export default function Comments() {
  const { id } = useParams();
  const [comments, setComments] = useState([] as Comment[]);

  useEffect(() => {
    (async () => {
      if (!id) {
        alert('Invalid');
        return;
      }
      const { data, error } = await getComments(id);
      if (error) {
        alert(error.message);
        return;
      }
      setComments(data);
    })();
  }, []);

  return (
    <>
      <div className="flex items-center gap-6 mb-4">
        <Link to="/home" aria-label="Back">
          <Icon
            id="icon-back"
            className="w-6 h-6 fill-none stroke-current cursor-pointer"
          />
        </Link>
        <h2 className="text-xl">Comments</h2>
      </div>
      {comments.length === 0 ? (
        <p className="px-2 py-4">No comments yet</p>
      ) : (
        comments.map(
          ({
            id,
            content,
            created_at,
            profiles: { username, avatar_path },
          }) => {
            return (
              <div
                key={id}
                className="grid grid-cols-[auto,minmax(0,1fr)] items-start gap-3 py-4">
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
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{username}</span>
                    <span>•</span>
                    <span className="text-sm text-zinc-500">
                      <time dateTime={created_at}>
                        {formatRelativeTime(created_at)}
                      </time>
                    </span>
                  </div>
                  <p className="break-words">{content}</p>
                </div>
              </div>
            );
          }
        )
      )}
    </>
  );
}
