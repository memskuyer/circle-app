import { ThreadEntity } from './thread.entities';
import { UserEntity } from './user.entities';

export interface LikeEntity {
  id: string;
  content?: string;
  thread?: ThreadEntity;
  user?: UserEntity;
  createdAt: string;
  updatedAt: string;
}
