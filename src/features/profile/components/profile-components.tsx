import { ThreadEntity } from '@/entities/thread.entities';
import { api } from '@/hooks/api';
import { useAuthStore } from '@/stores/auth.store';
import { SkeletonCard } from '@/utils/skeleton/card.skeleton';
import { Box, Button, Link as ChakraLink, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProfileCard from './profile-Card';
import ProfileMedia from './profile-media';
import ProfilePost from './profile-post';

const ProfileComponents = () => {
  const { user } = useAuthStore();
  const [buttonChose, setButtonChose] = useState<string>('AllPost');
  const { isLoading, data } = useQuery<ThreadEntity[]>({
    queryKey: ['user-thread'],
    queryFn: async () => {
      const response = await api.get('/threads/user-threads');
      return response.data.data;
    },
  });

  return (
    <Box>
      <ChakraLink mb={5}>
        <Link to={'/'}>
          <Flex align={'center'} gap={4}>
            <FaArrowLeft size={15} />
            <Text>{user.profile.fullName}</Text>
          </Flex>
        </Link>
      </ChakraLink>
      <ProfileCard />
      {['AllPost', 'Media'].map((button, i) => (
        <Button
          onClick={() => setButtonChose(button)}
          key={i}
          w={'50%'}
          bg={'none'}
          color={'white'}
          borderBottom={buttonChose === button ? '1px solid' : ''}
          borderBottomColor={buttonChose === button ? 'brand' : ''}
        >
          {button}
        </Button>
      ))}
      {isLoading && <SkeletonCard />}
      {buttonChose == 'AllPost' ? (
        <>{data?.map((field) => <ProfilePost key={field.id} data={field} />)}</>
      ) : (
        <>
          <ProfileMedia data={data} />
        </>
      )}
    </Box>
  );
};

export default ProfileComponents;
