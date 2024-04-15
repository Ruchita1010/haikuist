import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email' }),
  username: z
    .string()
    .min(3, { message: 'Must be atleast 3 characters' })
    .max(30, { message: 'Must be atmost 30 characters' })
    .regex(/^[\w]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
  password: z.string().min(8, { message: 'Must be atleast 8 characters' }),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email' }),
  password: z.string().min(8, { message: 'Must be atleast 8 characters' }),
});

export type SigninSchema = z.infer<typeof signinSchema>;

const isValidLineCount = (value: string) => {
  const lines = value.split('\n');
  return lines.length > 0 && lines.length < 5;
};

const isValidSyllableCount = (value: string) => {
  const syllableCount = Math.floor(Math.random() * 20 + 3);
  console.log(`todo: count syllables of ${value}`);
  return syllableCount > 3 && syllableCount < 18;
};

export const haikuSchema = z.object({
  haiku: z
    .string()
    .trim()
    .max(170, 'Must not exceed 170 characters')
    .refine(isValidSyllableCount, 'Must be between 3 to 17 syllables')
    .refine(isValidLineCount, 'Must be between 1 to 4 lines'),
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
    .refine(isValidFileSize, `Must be 5MB or less`)
    .refine(isValidFileType, 'Must be in .jpg, .jpeg, .png, .webp format')
    .optional(),
  username: z
    .string()
    .min(3, { message: 'Must be atleast 3 characters' })
    .max(30, { message: 'Must be atmost 30 characters' })
    .regex(/^[\w]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
  bio: z.string().max(150, { message: 'Must be atmost 150 characters' }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const commentSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: 'Must be non empty' })
    .max(272, { message: 'Must not exceed 272 characters' }),
});

export type CommentSchema = z.infer<typeof commentSchema>;
