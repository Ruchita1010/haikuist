import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { getAvatarUrl, getHaikuHues } from '@/lib/supabase/api';
import { HaikuHue } from '@/types';
import { getCurrentMonthName } from '@/utils/dateFormatter';
import Loader from '@components/Loader';

export default function HaikuHues() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [haikus, setHaikus] = useState<HaikuHue[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getHaikuHues();
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      setHaikus(data);
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
      <h1 className="text-center text-lg mb-6">
        Haiku Hues of {getCurrentMonthName()}
      </h1>
      <div className="flex flex-col gap-4">
        {haikus.length === 0 ? (
          <p className="mt-10">Haiku hues seem quiet this month..</p>
        ) : (
          haikus.map(({ id, content, username, avatar_path }) => {
            const lines = content.split('\n');
            const avatarUrl = avatar_path
              ? getAvatarUrl(avatar_path).data.publicUrl
              : '/assets/default-pfp.svg';

            return (
              <div key={id} className="p-2">
                <div>
                  {lines.map((line, index) => (
                    <p key={index} className="break-words">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="flex justify-end items-center gap-2">
                  - <span className="font-bold">{username}</span>
                  <img
                    src={avatarUrl}
                    alt={`${username}'s avatar`}
                    className="flex-shrink-0 w-8 h-8 object-cover rounded-full"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
