import { UserEntity } from './user.entities';

export interface FollowEntity {
  id: string;
  content?: string;
  followed?: UserEntity;
  following?: UserEntity;
  followingId?: string;
  isFollower?: boolean;
  isFollow?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
