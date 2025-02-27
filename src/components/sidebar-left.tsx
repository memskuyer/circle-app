import { useAuthStore } from '@/stores/auth.store';
import { Sidebar_Menu } from '@/utils/constants/sidebar-left-menu';
import {
  Box,
  BoxProps,
  Button,
  Link as ChakraLink,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { CiLogout } from 'react-icons/ci';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SidebarLeft = (props: BoxProps) => {
  const { pathname } = useLocation();
  const { logout } = useAuthStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <Box {...props}>
      <Text textStyle={'6xl'} color={'brand'} mb={4} ml={4}>
        Circle
      </Text>
      <Box>
        {Sidebar_Menu.map((field, index) => (
          <ChakraLink w={'full'} key={index}>
            <Link to={field.path}>
              <Flex align={'center'} gap={4} p={4}>
                <Image
                  src={
                    pathname == field.path
                      ? field.icon.fill
                      : field.icon.outline
                  }
                />
                <Text textStyle={'2xl'}> {field.label}</Text>
              </Flex>
            </Link>
          </ChakraLink>
        ))}

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
      </Box>
    </Box>
  );
};

export default SidebarLeft;
