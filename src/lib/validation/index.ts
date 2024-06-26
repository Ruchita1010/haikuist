import { z } from 'zod';
import { syllable } from 'syllable';

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email must be valid' }),
  username: z
    .string()
    .min(3, { message: 'Username must be 3 characters or more' })
    .max(30, { message: 'Username must be 30 characters or less' })
    .regex(/^[\w]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 characters or more' }),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email must be valid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 characters or more' }),
});

export type SigninSchema = z.infer<typeof signinSchema>;

const isValidLineCount = (value: string) => {
  const lines = value.split('\n');
  return lines.length > 0 && lines.length < 5;
};

const isValidSyllableCount = (value: string) => {
  const syllableCount = syllable(value);
  return syllableCount > 3 && syllableCount < 18;
};

export const haikuSchema = z.object({
  haiku: z
    .string()
    .trim()
    .max(170, 'Haiku must be 170 characters or less')
    .refine(isValidSyllableCount, 'Haiku must be between 3 to 17 syllables')
    .refine(isValidLineCount, 'Haikus must be between 1 to 4 lines'),
});

export type HaikuSchema = z.infer<typeof haikuSchema>;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const isValidFileSize = (files: FileList) => {
  if (files.length === 0) return true;
  return files?.[0]?.size <= MAX_FILE_SIZE;
};

const isValidFileType = (files: FileList) => {
  if (files.length === 0) return true;
  return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
};

export const profileSchema = z.object({
  /* "resetField" sets "avatar" to undefined. Without this, if no file is submitted,
     it results in a FileList object with length: 0. Adding optional() for consistency,
     so that the type ProfileSchema gets inferred as "FileList | undefined". */
  avatar: z
    .instanceof(FileList)
    .refine(isValidFileSize, 'Avatar file size must be 5MB or less')
    .refine(
      isValidFileType,
      'Avatar file must be in .jpg, .jpeg, .png, or .webp format'
    )
    .optional(),
  username: z
    .string()
    .min(3, { message: 'Username must be 3 characters or more' })
    .max(30, { message: 'Username must be 30 characters or less' })
    .regex(/^[\w]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
  bio: z.string().max(150, { message: 'Bio must be 150 characters or less' }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const commentSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: 'Comment cannot be empty' })
    .max(272, { message: 'Comment must be 272 characters or less' }),
});

export type CommentSchema = z.infer<typeof commentSchema>;
