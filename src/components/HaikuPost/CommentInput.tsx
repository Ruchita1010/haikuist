import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addComment } from '@lib/supabase/api';
import { CommentSchema, commentSchema } from '@lib/validation';
import { useSnackbar } from '@context/SnackbarContext';
import FormError from '@components/FormError';

type CommentInputProps = {
  haikuId: string;
  userId: string;
  setIsCommentInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CommentInput({
  haikuId,
  userId,
  setIsCommentInputVisible,
}: CommentInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleInput = (e: React.InputEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 80)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      setIsCommentInputVisible(false);
    }
  };

  const onSubmit = async (formData: CommentSchema) => {
    const { error } = await addComment(haikuId, userId, formData.comment);
    if (error) {
      enqueueSnackbar('Error adding your comment');
      return;
    }
    enqueueSnackbar('Your comment is added');
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
          placeholder="Add a comment..."
          aria-label="Add a comment"
          aria-invalid={errors.comment ? 'true' : 'false'}
          className="resize-none w-full px-1 bg-transparent"
          onInput={handleInput}
          {...register('comment')}></textarea>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-1 bg-fgColor text-bgColor rounded-md hover:bg-fgColor/80">
          Add
        </button>
      </div>
      <FormError error={errors.comment} />
    </form>
  );
}
