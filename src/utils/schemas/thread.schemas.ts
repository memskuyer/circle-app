import { z } from 'zod';

export const CreateThreadSchema = z.object({
  content: z.string().max(280, { message: 'Maksimal 280 karakter' }),
  images: z.instanceof(FileList),
});
export type CreateThreadSchemaDTO = z.infer<typeof CreateThreadSchema>;
