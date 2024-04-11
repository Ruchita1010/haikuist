import { useEffect, useRef, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProfileSchema } from '@/lib/validation';

type AvatarUploadProps = {
  register: UseFormRegister<ProfileSchema>;
  errors: FieldErrors<ProfileSchema>;
  avatarUrl: string;
};

export default function AvatarUpload({
  register,
  errors,
  avatarUrl,
}: AvatarUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...inputProps } = register('avatar', {
    onChange: handleFileChange,
  });

  const avatarSrc = selectedImage
    ? URL.createObjectURL(selectedImage)
    : avatarUrl;

  useEffect(() => {
    return () => {
      // if the user never selects a new file, the "selectedImage" will be null so putting a check before revoking
      if (selectedImage) {
        URL.revokeObjectURL(avatarSrc);
      }
    };
  }, [selectedImage]);

  return (
    <div className="flex flex-col gap-3 mb-8 justify-center items-center">
      <img
        src={avatarSrc}
        aria-label="Your current avatar"
        alt="Avatar"
        className="flex-shrink-0 w-36 h-36 object-cover rounded-full"
      />
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        id="avatar"
        className="hidden"
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        {...inputProps}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="text-center p-2 border border-fgColor/50 rounded-md hover:bg-fgColor/10">
        Update Avatar
      </button>
      {errors.avatar && (
        <p className="text-sm text-errColor">{`${errors.avatar.message}`}</p>
      )}
    </div>
  );
}
