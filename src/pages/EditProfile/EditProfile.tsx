import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostgrestError } from '@supabase/supabase-js';
import {
  checkUsernameAvailability,
  getAvatarUrl,
  getUserById,
  updateProfile,
  uploadAvatar,
} from '@lib/supabase/api';
import { ProfileSchema, profileSchema } from '@lib/validation';
import { UserProfile } from '@/types';
import { useAuth } from '@context/AuthContext';
import { useSnackbar } from '@context/SnackbarContext';
import Icon from '@components/Icon';
import Loader from '@components/Loader';
import FormError from '@components/FormError';
import defaultAvatar from '@assets/images/default-avatar.svg';
import AvatarUpload from './AvatarUpload';

export default function EditProfile() {
  // Default values (async) are not set here to avoid setting undefined as a default value,
  // which can cause issues according to RHF documentation. Also, setting to null
  // may not be desirable as it would require changing the Zod schema. Instead
  // Ref: https://react-hook-form.com/docs/useform#defaultValues
  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors, isSubmitting },
    resetField,
    setValue,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });
  const { session } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { data, error } = await getUserById(session?.user.id || '');
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      const { username, bio, avatar_path } = data;
      setValue('username', username);
      setValue('bio', bio);
      if (avatar_path !== '') {
        const { publicUrl } = getAvatarUrl(avatar_path).data;
        setAvatarUrl(publicUrl);
      }
      setCurrentProfile({ username, bio, avatar_path });
      setLoading(false);
    })();
  }, []);

  const isProfileModified = ({ username, bio, avatar }: ProfileSchema) => {
    return (
      currentProfile &&
      (username !== currentProfile.username ||
        bio !== currentProfile.bio ||
        (avatar !== undefined && avatar.length > 0))
    );
  };

  const checkUsername = async (username: string) => {
    const { data, error } = await checkUsernameAvailability(username);
    if (error) {
      enqueueSnackbar(`Error saving username`);
      return;
    }
    return data;
  };

  const onSubmit = async (profileData: ProfileSchema) => {
    if (!isProfileModified(profileData) || !session?.user.id) {
      return;
    }

    const { username, bio, avatar } = profileData;

    const usernameAvailable = await checkUsername(username);
    if (!usernameAvailable) {
      setFormError('username', {
        type: 'custom',
        message: 'Username already taken. Please choose another',
      });
      return;
    }

    let updates: UserProfile = { username, bio };

    if (avatar && avatar.length > 0) {
      const avatarFile = avatar[0];
      const fileName = `avatar_${Date.now()}.${avatarFile.name
        .split('.')
        .pop()}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await uploadAvatar(filePath, avatarFile);
      if (uploadError) {
        enqueueSnackbar('Error uploading avatar');
        return;
      }
      updates.avatar_path = filePath;
    }

    const { error } = await updateProfile(updates, session?.user.id);
    if (error) {
      enqueueSnackbar('Error saving profile changes');
      return;
    }
    enqueueSnackbar('Profile changes saved');
    // Case: If the user changes the avatar and hits "Save". Right again, if the user doesn't change the avatar (or any other field)
    //  and again hits "Save", the check "avatar.length > 0" still results in true and calls are made to the DB for the same file.
    // To prevent that for now, resetField is used. However, using "resetField" results in the field being set to undefined.
    resetField('avatar');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Some error occured :/</p>;
  }

  return (
    <div>
      <h1 className="sr-only">Edit Profile</h1>
      <Link
        to="/profile"
        aria-label="Back to Profile"
        className="inline-block p-1 hover:bg-fgColor/10 rounded-full">
        <Icon
          id="icon-back"
          className="w-6 h-6 fill-none stroke-current cursor-pointer"
        />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AvatarUpload
          register={register}
          errors={errors}
          avatarUrl={avatarUrl}
        />
        <div className="mb-4">
          <label htmlFor="username" className="block mb-0.5">
            Username
          </label>
          <input
            type="text"
            id="username"
            aria-required={`${!profileSchema.shape.username.isOptional()}`}
            aria-invalid={errors.username ? 'true' : 'false'}
            className="w-full px-4 py-2 bg-transparent text-fgColor border border-fgColor/25 rounded-md"
            {...register('username')}
          />
          <FormError error={errors.username} />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block mb-0.5">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            aria-invalid={errors.bio ? 'true' : 'false'}
            className="resize-none w-full px-4 py-2 bg-transparent text-fgColor border border-fgColor/25 rounded-md"
            {...register('bio')}></textarea>
          <FormError error={errors.bio} />
        </div>
        <div className="grid justify-items-end">
          <button
            type="submit"
            className="flex justify-center gap-2 px-6 py-2 bg-fgColor text-bgColor font-medium rounded-md hover:bg-fgColor/80"
            disabled={isSubmitting}>
            {isSubmitting && <Loader />}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
