import { z } from 'zod';

export const EditProfileSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'username minimal 6 karakter' })
    .max(12, { message: 'username maximal 12 karakter' }),
  fullName: z
    .string()
    .min(4, { message: 'full name min 4 karakter' })
    .max(100, { message: 'full name Max 100 karakter' }),
  bio: z.string().max(280, { message: 'bio max 280 karakter' }),
  avatarUrl: z.instanceof(FileList),
  bannerUrl: z.instanceof(FileList),
});
export type EditProfileSchemaDTO = z.infer<typeof EditProfileSchema>;
