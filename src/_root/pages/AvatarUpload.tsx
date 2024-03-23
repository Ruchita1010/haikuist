import { useEffect, useRef, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProfileSchema } from '../../lib/validation';

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
    : avatarUrl || '/assets/default-pfp.svg';

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
      <div className="w-36 h-36 rounded-full overflow-hidden border-2">
        <img
          src={avatarSrc}
          aria-label="Your current avatar"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
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
        className="text-center p-2 border border-zinc-400 outline-4 outline-zinc-500 rounded-md">
        Update Avatar
      </button>
      {errors.avatar && (
        <p className="text-sm text-red-700">{`${errors.avatar.message}`}</p>
      )}
    </div>
  );
}
