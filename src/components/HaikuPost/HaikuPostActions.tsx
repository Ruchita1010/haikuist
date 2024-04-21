import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  checkIsLiked,
  checkIsSaved,
  likeHaikuPost,
  saveHaikuPost,
  unlikeHaikuPost,
  unsaveHaikuPost,
} from '@lib/supabase/api';
import Icon from '@components/Icon';
import CommentInput from './CommentInput';

type HaikuPostActionsProp = {
  haikuId: string;
  userId: string;
};

export default function HaikuPostActions({
  haikuId,
  userId,
}: HaikuPostActionsProp) {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [commentInputVisible, setCommentInputVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const likeResult = await checkIsLiked(haikuId, userId);
      if (!likeResult.error && likeResult.data) {
        setHasLiked(true);
      }

      const savedResult = await checkIsSaved(haikuId, userId);
      if (!savedResult.error && savedResult.data) {
        setHasSaved(true);
      }
    })();
  }, []);

  const handleLike = async (haikuId: string, userId: string) => {
    const { error } = await (hasLiked
      ? unlikeHaikuPost(haikuId, userId)
      : likeHaikuPost(haikuId, userId));
    if (!error) {
      setHasLiked(!hasLiked);
    }
  };

  const handleSave = async (haikuId: string, userId: string) => {
    const { error } = await (hasSaved
      ? unsaveHaikuPost(haikuId, userId)
      : saveHaikuPost(haikuId, userId));
    if (!error) {
      setHasSaved(!hasSaved);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <button
            type="button"
            aria-label="Like"
            className="hover:scale-110"
            onClick={() => handleLike(haikuId, userId)}>
            <Icon
              id="icon-like"
              className={`w-6 h-6 stroke-current ${
                hasLiked ? 'fill-current text-likeColor' : 'fill-none'
              }`}
            />
          </button>
          <button
            type="button"
            aria-label="Comment"
            aria-expanded={commentInputVisible}
            aria-controls={`commentInput_${haikuId}`}
            className="hover:scale-110"
            onClick={() => setCommentInputVisible(!commentInputVisible)}>
            <Icon
              id="icon-comment"
              className={`w-6 h-6 stroke-current ${
                commentInputVisible
                  ? 'fill-current text-commentColor'
                  : 'fill-none'
              }`}
            />
          </button>
          <Link
            to={`/haiku/${haikuId}`}
            className="text-sm text-fgColor/60 underline">
            View comments
          </Link>
        </div>
        <button
          type="button"
          aria-label="Save"
          className="hover:scale-110"
          onClick={() => handleSave(haikuId, userId)}>
          <Icon
            id="icon-save"
            className={`w-6 h-6 stroke-current ${
              hasSaved ? 'fill-current text-saveColor' : 'fill-none'
            }`}
          />
        </button>
      </div>
      {commentInputVisible && (
        <CommentInput
          haikuId={haikuId}
          userId={userId}
          setCommentInputVisible={setCommentInputVisible}
        />
      )}
    </>
  );
}
