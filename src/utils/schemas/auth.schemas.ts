import { User } from '@/types/user.types';
import { z, ZodType } from 'zod';

export const LoginSchema: ZodType<User> = z.object({
  email: z.string().email({ message: 'example: test@gmail.com' }),
  password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
});
export type LoginSchemaDTO = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'example: test@gmail.com' }),
  username: z
    .string()
    .min(8, { message: 'username minimal 8 karakter' })
    .max(12, { message: 'username maximal 12 karakter' }),
  password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
  fullName: z
    .string()
    .min(4, { message: 'full name min 4 karakter' })
    .max(100, { message: 'full name Max 100 karakter' }),
});

export type RegisterSchemaDTO = z.infer<typeof RegisterSchema>;

export const ResetPasswordSchema = z.object({
  oldPassword: z.string().min(8, { message: 'Password minimal 8 karakter' }),
  newPassword: z.string().min(8, { message: 'Password minimal 8 karakter' }),
});

export type ResetPasswordSchemaDTO = z.infer<typeof ResetPasswordSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email('contoh email: test@gmail.com'),
});

export type ForgotPasswordSchemaDTO = z.infer<typeof ForgotPasswordSchema>;
