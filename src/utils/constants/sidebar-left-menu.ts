import Home from '@/assets/home.svg';
import HomeOutline from '@/assets/HomeOutline.svg';
import UserSearch from '@/assets/UserSearch.svg';
import UserSearchOutline from '@/assets/UserSearchOutline.svg';
import Follow from '@/assets/Follow.svg';
import FollowOutline from '@/assets/FollowOutline.svg';
import Profile from '@/assets/Profile.svg';
import ProfileOutline from '@/assets/ProfileOutline.svg';

interface SidebarMenu {
  label: string;
  path: string;
  icon: {
    fill: string;
    outline: string;
  };
}

export const Sidebar_Menu: SidebarMenu[] = [
  {
    label: 'Home',
    path: '/',
    icon: {
      fill: Home,
      outline: HomeOutline,
    },
  },
  {
    label: 'Search',
    path: '/search',
    icon: {
      fill: UserSearch,
      outline: UserSearchOutline,
    },
  },
  {
    label: 'Follows',
    path: '/follows',
    icon: {
      fill: Follow,
      outline: FollowOutline,
    },
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: {
      fill: Profile,
      outline: ProfileOutline,
    },
  },
];
