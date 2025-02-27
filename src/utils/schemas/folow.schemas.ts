import { z } from 'zod';

export const followUnfollowSchema = z.object({
  followingId: z.string().uuid(),
});

export type FollowUnfollowSchemaDTO = z.infer<typeof followUnfollowSchema>;
