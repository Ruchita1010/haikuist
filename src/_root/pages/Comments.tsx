import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostgrestError } from '@supabase/supabase-js';
import { getAvatarUrl, getComments } from '../../lib/supabase/api';
import { Comment } from '../../types';
import { formatRelativeTime } from '../../utils/dateFormatter';
import Icon from '../../components/shared/Icon';
import Loader from '../../components/shared/Loader';

export default function Comments() {
  const { id } = useParams();
  if (!id) {
    return;
  }

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getComments(id);
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      setComments(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Some error occured :/</p>;
  }

  return (
    <>
      <div className="flex items-center gap-6 mb-4">
        <button
          type="button"
          aria-label="Back"
          className="p-1 hover:bg-fgColor/10 rounded-full"
          onClick={() => navigate(-1)}>
          <Icon id="icon-back" className="w-6 h-6 fill-none stroke-current" />
        </button>
        <h2 className="text-xl">Comments</h2>
      </div>
      {comments.length === 0 ? (
        <p className="px-2 py-4">No comments yet</p>
      ) : (
        comments.map(
          ({ id, content, created_at, profile: { username, avatar_path } }) => {
            return (
              <article
                key={id}
                className="grid grid-cols-[auto,minmax(0,1fr)] items-start gap-3 py-4">
                <img
                  src={
                    avatar_path
                      ? getAvatarUrl(avatar_path).data.publicUrl
                      : '/assets/default-pfp.svg'
                  }
                  alt={`${username}'s avatar`}
                  className="flex-shrink-0 w-11 h-11 object-cover rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold overflow-hidden">
                      {username}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-sm text-fgColor/60">
                      •
                    </span>
                    <span className="text-sm text-fgColor/60 whitespace-nowrap">
                      <time dateTime={created_at}>
                        {formatRelativeTime(created_at)}
                      </time>
                    </span>
                  </div>
                  <p className="break-words">{content}</p>
                </div>
              </article>
            );
          }
        )
      )}
    </>
  );
}
