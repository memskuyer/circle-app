import { z } from 'zod';

export const SavedSchema = z.object({
  threadId: z.string().uuid(),
});
export type SavedSchemaDTO = z.infer<typeof SavedSchema>;
