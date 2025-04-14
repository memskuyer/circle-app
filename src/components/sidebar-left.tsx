import { Sidebar_Menu } from '@/utils/constants/sidebar-left-menu';
import {
  Box,
  BoxProps,
  Link as ChakraLink,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FaHome, FaSearch, FaUser, FaUserFriends } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { ColorModeButton } from './ui/color-mode';

const iconMap = {
  Home: FaHome,
  Search: FaSearch,
  Follows: FaUserFriends,
  Profile: FaUser,
  Setting: FaGear,
};

const SidebarLeft = (props: BoxProps) => {
  const { pathname } = useLocation();

  return (
    <Box {...props}>
      <Text textStyle={'6xl'} color={'brand'} mb={4} ml={4}>
        Circle
        <ColorModeButton ml={5} />
      </Text>
      <Box>
        {Sidebar_Menu.map((field, index) => {
          const IconComponent =
            iconMap[field.label as keyof typeof iconMap] || FaHome;
          return (
            <ChakraLink w={'full'} key={index}>
              <Link to={field.path}>
                <Flex align={'center'} gap={4} p={4}>
                  <Box
                    color={{
                      _dark: pathname === field.path ? 'brand' : 'gray',
                      base: pathname === field.path ? 'black' : 'gray',
                    }}
                  >
                    <IconComponent size={24} />
                  </Box>
                  <Text textStyle={'2xl'}> {field.label}</Text>
                </Flex>
              </Link>
            </ChakraLink>
          );
        })}
      </Box>
    </Box>
  );
};

export default SidebarLeft;
