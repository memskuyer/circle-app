import { z } from 'zod';

export const CreateReplySchema = z.object({
  content: z.string().max(280, { message: 'Maksimal 280 karakter' }),
});
export type CreateReplySchemaDTO = z.infer<typeof CreateReplySchema>;
