import { Avatar } from '@/components/ui/avatar';
import { ReplyEntity } from '@/entities/reply.entities';
import { api } from '@/hooks/api';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const CardReplyContents = () => {
  const { id } = useParams();

  const { data } = useQuery<ReplyEntity[]>({
    queryKey: ['reply'],
    queryFn: async () => {
      const response = await api.get(`/reply/${id}`);
      return response.data.data;
    },
  });
  return (
    <>
      {data?.map((reply) => (
        <Box p={2} key={reply.id} borderY="1px solid" borderColor={'gray'}>
          <>
            <Flex gap={2}>
              <Avatar
                src={
                  reply.user?.profile?.avatarUrl ||
                  `https://api.dicebear.com/9.x/avataaars/svg?seed=${reply.user?.profile?.fullName}`
                }
              />
              <Flex direction={'column'}>
                <Flex gap={2}>
                  <Text>{reply.user?.profile?.fullName}</Text>
                  <Text color="gray">@{reply.user?.username}</Text>
                </Flex>
                <Text>{reply.content}</Text>
              </Flex>
            </Flex>
          </>
        </Box>
      ))}
    </>
  );
};

export default CardReplyContents;
