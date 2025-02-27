import { ThreadEntity } from '@/entities/thread.entities';
import { UserEntity } from '@/entities/user.entities';
import { api } from '@/hooks/api';
import { SkeletonCard } from '@/utils/skeleton/card.skeleton';
import { Box, Button, Link as ChakraLink, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import ProfileUserCard from './profile-user-card';
import ProfileUserThread from './profile-user-thread';
import ProfileUserThreadMedia from './profile-user-thread-media';

const ProfileUserComponents = () => {
  const [buttonChose, setButtonChose] = useState<string>('AllPost');

  const { id } = useParams();

  const { data } = useQuery<UserEntity>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await api.get(`/users/${id}`);
      return response.data.data;
    },
  });

  const { data: thread, isLoading: loadingThread } = useQuery<ThreadEntity[]>({
    queryKey: ['user-thread'],
    queryFn: async () => {
      const response = await api.get(`/threads/user-threads/${id}`);
      return response.data.data;
    },
  });

  return (
    <Box>
      <ChakraLink mb={5}>
        <Link to={'/'}>
          <Flex align={'center'} gap={4}>
            <FaArrowLeft size={15} />
            <Text>{data?.profile?.fullName}</Text>
          </Flex>
        </Link>
      </ChakraLink>
      <ProfileUserCard field={data} />
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
      {loadingThread && <SkeletonCard />}
      {buttonChose == 'AllPost' ? (
        thread?.map((field) => (
          <ProfileUserThread key={field.id} data={field} />
        ))
      ) : (
        <ProfileUserThreadMedia data={thread} />
      )}
    </Box>
  );
};

export default ProfileUserComponents;
