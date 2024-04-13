import { FieldError } from 'react-hook-form';

type FormErrorProps = {
  error: FieldError | undefined;
};

export default function FormError({ error }: FormErrorProps) {
  return error ? (
    <p role="alert" className="mt-1 text-sm text-errColor">
      {error.message}
    </p>
  ) : null;
}
