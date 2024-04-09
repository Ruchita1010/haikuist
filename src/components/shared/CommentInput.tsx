import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema, commentSchema } from '../../lib/validation';
import { addComment } from '../../lib/supabase/api';

type CommentInputProps = {
  haikuId: string;
  userId: string;
  setCommentInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CommentInput({
  haikuId,
  userId,
  setCommentInputVisible,
}: CommentInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      setCommentInputVisible(false);
    }
  };

  const onSubmit = async (formData: CommentSchema) => {
    const { error } = await addComment(haikuId, userId, formData.comment);
    if (error) {
      alert(error.message);
      return;
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      onKeyDown={handleKeyDown}
      id={`commentInput_${haikuId}`}
      className="mt-4 mb-2">
      <div className="flex items-center gap-2">
        <textarea
          id="comment"
          rows={1}
          autoFocus
          aria-label="Add a comment..."
          placeholder="Add a comment..."
          className="resize-none w-full px-1 bg-transparent outline-none focus:ring-1 ring-fgColor/50"
          onInput={handleInput}
          {...register('comment')}></textarea>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-1 bg-fgColor text-bgColor rounded-md hover:bg-fgColor/80">
          Add
        </button>
      </div>
      {errors.comment && (
        <p className="text-sm text-errColor">{`${errors.comment.message}`}</p>
      )}
    </form>
  );
}
