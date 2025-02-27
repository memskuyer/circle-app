import Layout from '@/components/layout';
import AuthLayout from '@/components/layout/auth-layout';
import LoadingSkeleton from '@/features/dashboard/skeleton/loading.skeleton';
import CardDetailImage from '@/features/detail-post/components/card-detail-image';
import DetailPosting from '@/pages/detail-posting';
import Follow from '@/pages/follow';
import ForgotpasswordPage from '@/pages/forgot-password-pages';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login-Page';
import Profile from '@/pages/profile';
import ProfileUser from '@/pages/profile-user';
import RegisterPage from '@/pages/register-page';
import ResetPasswordPage from '@/pages/reset-password-page';
import Search from '@/pages/search';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/search',
          element: <Search />,
        },
        {
          path: '/follows',
          element: <Follow />,
        },

        {
          path: '/detail-post/:id',
          element: <DetailPosting />,
        },
        {
          path: '/detail-image/:id',
          element: <CardDetailImage />,
        },
        {
          path: '/profile/user/:id',
          element: <ProfileUser />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/forgotpassword',
          element: <ForgotpasswordPage />,
        },
        {
          path: '/resetpassword',
          element: <ResetPasswordPage />,
        },
      ],
    },
    {
      path: '/test',
      element: <LoadingSkeleton />,
    },
  ],
  {
    future: {
      v7_startTransition: true, // Mengaktifkan transition handling di React Router v7
      v7_normalizeFormMethod: true, // Menyesuaikan form method agar lebih kompatibel
    },
  }
);

export default router;
