import { useAuthStore } from '@/stores/auth.store';
import { Button, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogoutComponents = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: ' You want logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Cookies.remove('token');
        navigate('/');
        Swal.fire({
          title: 'Logout!',
          text: 'You have logged out.',
          icon: 'success',
        });
      }
    });
  };
  return (
    <div>
      <Button
        variant={'ghost'}
        w={'full'}
        display={'flex'}
        justifyContent={'left'}
        gap={6}
        onClick={handleLogout}
      >
        <CiLogout />
        <Text textStyle={'xl'}>Logout</Text>
      </Button>
    </div>
  );
};

export default LogoutComponents;
