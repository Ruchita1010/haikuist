import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema, commentSchema } from '../../lib/validation';
import { addComment } from '../../lib/supabase/api';

type CommentInputProps = {
  haikuId: string;
  userId: string;
};

export default function CommentInput({ haikuId, userId }: CommentInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 mb-2">
      <div className="flex items-center gap-2">
        <textarea
          id="comment"
          rows={1}
          aria-label="Add a comment..."
          placeholder="Add a comment..."
          className="resize-none w-full px-1 bg-transparent focus:outline-dashed"
          onInput={handleInput}
          {...register('comment')}></textarea>
        {isValid && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-1 bg-sky-200 outline-4 outline-sky-500 rounded-md">
            <span>Post</span>
          </button>
        )}
      </div>
      {errors.comment && (
        <p className="text-sm text-red-700">{`${errors.comment.message}`}</p>
      )}
    </form>
  );
}
