import { ProfileEntity } from './profile.entities';

export type UserEntity = {
  id: string;
  email?: string;
  username: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profile?: ProfileEntity;
};
