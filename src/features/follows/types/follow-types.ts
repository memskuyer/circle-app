import { ProfileEntity } from '@/entities/profile.entities';
import { UserEntity } from '@/entities/user.entities';

export type Data = UserEntity & {
  profile: ProfileEntity;
  isFollow: boolean;
};

export type Follows = {
  follower: Data[];
  following: Data[];
};
