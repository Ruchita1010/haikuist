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
