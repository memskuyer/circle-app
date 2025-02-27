// export type SearchUser = {
//   id: string;
//   avatarUrl: string;
//   fullName: string;
//   username: string;
//   bio: string;
//   isFollowed: boolean;
// };

import { ProfileEntity } from '@/entities/profile.entities';
import { UserEntity } from '@/entities/user.entities';

export type SearchUser = UserEntity & {
  profile: ProfileEntity;
};
