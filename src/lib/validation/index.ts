import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email' }),
  username: z
    .string()
    .min(3, { message: 'Must be atleast 3 characters' })
    .max(30, { message: 'Must be atmost 30 characters' }),
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
