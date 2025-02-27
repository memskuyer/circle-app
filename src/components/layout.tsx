import LoadingSkeleton from '@/features/dashboard/skeleton/loading.skeleton';
import { api } from '@/hooks/api';
import { useAuthStore } from '@/stores/auth.store';
import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SidebarLeft from './sidebar-left';
import SidebarRight from './sidebar-right';
import { toaster } from './ui/toaster';
const Layout = () => {
  const { user, setUser, logout } = useAuthStore();

  // const token = Cookies.get('token');
  const token = useMemo(() => Cookies.get('token'), []);

  const { isPending, isFetched } = useQuery({
    queryKey: ['check-auth'],
    queryFn: async () => {
      try {
        const response = await api.post(
          '/auth/check',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.data.username !== user.username) {
          setUser(response.data.data);
        }

        return response.data;
      } catch (error) {
        Cookies.remove('token');
        logout();
        if (isAxiosError(error))
          return toaster.create({
            title: error.message,
            type: 'error',
          });
      }
    },
  });
  const { pathname } = useLocation();

  if (isPending) return <LoadingSkeleton />;
  if (isFetched) {
    if (!user.username) return <Navigate to={'/login'} />;
    return (
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem
          hidden={pathname.includes('detail-image') ? true : false}
          colSpan={1}
          p={'40px'}
        >
          <SidebarLeft />
        </GridItem>
        <GridItem
          colSpan={pathname.includes('detail-image') ? 5 : 3}
          minH={'100vh'}
          borderX={'1px solid'}
          borderColor={'gray'}
          p={'40px 20px'}
        >
          <Outlet />
        </GridItem>
        <GridItem
          hidden={pathname.includes('detail-image') ? true : false}
          colSpan={1}
        >
          <SidebarRight />
        </GridItem>
      </Grid>
    );
  }
};

export default Layout;
