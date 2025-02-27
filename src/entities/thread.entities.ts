import { LikeEntity } from './like.entities';
import { ReplyEntity } from './reply.entities';
import { UserEntity } from './user.entities';

export interface ThreadEntity {
  id: string;
  content: string;
  images: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: UserEntity;
  likesCount: number;
  isLiked: boolean;
  likes?: LikeEntity[];
  replies?: ReplyEntity[];
  repliesCount?: number;
}
