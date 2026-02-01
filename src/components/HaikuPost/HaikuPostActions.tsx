import { startTransition, useEffect, useOptimistic, useState } from 'react';
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
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);

  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(isLiked);
  const [optimisticIsSaved, setOptimisticIsSaved] = useOptimistic(isSaved);

  useEffect(() => {
    (async () => {
      const likeResult = await checkIsLiked(haikuId, userId);
      if (!likeResult.error && likeResult.data) {
        setIsLiked(true);
      }

      const savedResult = await checkIsSaved(haikuId, userId);
      if (!savedResult.error && savedResult.data) {
        setIsSaved(true);
      }
    })();
  }, [haikuId, userId]);

  const handleLike = (haikuId: string, userId: string) => {
    startTransition(async () => {
      setOptimisticIsLiked(!optimisticIsLiked);

      const { error } = await (isLiked
        ? unlikeHaikuPost(haikuId, userId)
        : likeHaikuPost(haikuId, userId));

      if (!error) {
        startTransition(() => {
          setIsLiked(!isLiked);
        });
      }
    });
  };

  const handleSave = (haikuId: string, userId: string) => {
    startTransition(async () => {
      setOptimisticIsSaved(!optimisticIsSaved);

      const { error } = await (isSaved
        ? unsaveHaikuPost(haikuId, userId)
        : saveHaikuPost(haikuId, userId));

      if (!error) {
        startTransition(() => {
          setIsSaved(!isSaved);
        });
      }
    });
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
                optimisticIsLiked ? 'fill-current text-likeColor' : 'fill-none'
              }`}
            />
          </button>
          <button
            type="button"
            aria-label="Comment"
            aria-expanded={isCommentInputVisible}
            aria-controls={`commentInput_${haikuId}`}
            className="hover:scale-110"
            onClick={() => setIsCommentInputVisible(!isCommentInputVisible)}>
            <Icon
              id="icon-comment"
              className={`w-6 h-6 stroke-current ${
                isCommentInputVisible
                  ? 'fill-current text-commentColor'
                  : 'fill-none'
              }`}
            />
          </button>
          <Link
            to={`/haiku/${haikuId}`}
            className="text-sm text-fgColor/70 underline">
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
              optimisticIsSaved ? 'fill-current text-saveColor' : 'fill-none'
            }`}
          />
        </button>
      </div>
      {isCommentInputVisible && (
        <CommentInput
          haikuId={haikuId}
          userId={userId}
          setIsCommentInputVisible={setIsCommentInputVisible}
        />
      )}
    </>
  );
}
