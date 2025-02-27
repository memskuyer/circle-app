import { ProfileEntity } from '@/entities/profile.entities';

export type UserPost = {
  fullName: string;
  username: string;
  avatarUrl: string;
  profile: ProfileEntity;
};

export type Reply = {
  id: string;
  content: string;
  threadId: string;
  userId: string;
  likesCount?: number;
  createdAt: Date;
  user: UserPost;
};

export type Post = {
  id: string;
  user: UserPost;
  content: string;
  images?: string;
  isLiked?: boolean;
  likesCount?: number;
  repliesCount?: number;
  replies?: Reply[];
  createdAt: Date;
};
