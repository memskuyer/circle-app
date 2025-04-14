interface SidebarMenu {
  label: string;
  path: string;
}

export const Sidebar_Menu: SidebarMenu[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Search',
    path: '/search',
  },
  {
    label: 'Follows',
    path: '/follows',
  },
  {
    label: 'Profile',
    path: '/profile',
  },
  {
    label: 'Setting',
    path: '/setting',
  },
];
