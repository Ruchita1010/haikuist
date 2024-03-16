import { useEffect, useState } from 'react';
import {
  checkIsLiked,
  likeHaikuPost,
  unlikeHaikuPost,
} from '../../lib/supabase/api';
import Icon from './Icon';

type HaikuPostActionsProp = {
  haikuId: string;
  userId: string;
};

export default function HaikuPostActions({
  haikuId,
  userId,
}: HaikuPostActionsProp) {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await checkIsLiked(haikuId, userId);
      if (error) {
        alert(error.message);
        return;
      }
      if (data) {
        setHasLiked(true);
      }
    })();
  }, []);

  const handleLike = async (haikuId: string, userId: string) => {
    const { error } = await (hasLiked
      ? unlikeHaikuPost(haikuId, userId)
      : likeHaikuPost(haikuId, userId));
    if (error) {
      alert(error.message);
      return;
    }
    setHasLiked(!hasLiked);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <button onClick={() => handleLike(haikuId, userId)}>
          <Icon
            id="icon-like"
            className={`w-6 h-6 ${
              hasLiked ? 'fill-current text-red-600' : 'fill-none'
            } stroke-current cursor-pointer`}
          />
        </button>
        <button>
          <Icon
            id="icon-comment"
            className="w-6 h-6 fill-none stroke-current cursor-pointer"
          />
        </button>
      </div>
      <button>
        <Icon
          id="icon-save"
          className="w-6 h-6 fill-none stroke-current cursor-pointer"
        />
      </button>
    </div>
  );
}
