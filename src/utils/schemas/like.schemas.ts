import { z } from 'zod';

export const likeUnlikeSchema = z.object({
  threadId: z.string().uuid(),
});
export type LikeUnLikeSchemaDTO = z.infer<typeof likeUnlikeSchema>;
