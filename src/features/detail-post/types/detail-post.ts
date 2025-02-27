import { ProfileEntity } from '@/entities/profile.entities';

export type ThreadDetail = {
  id: string;
  content: string;
  userId: string;
  images?: string;
  isLiked: boolean;
  replies?: Reply[];
  likesCount: number;
  repliesCount?: number;
  user: UserPost;
  createdAt: Date;
  updatedAt: Date;
};

export type Reply = {
  id: string;
  user: UserPost;
  content: string;
  likesCount: number;
  repliesCount?: number;
  createdAt: Date;
};

export type UserPost = {
  fullName: string;
  username: string;
  avatarUrl: string;
  profile: ProfileEntity;
};
