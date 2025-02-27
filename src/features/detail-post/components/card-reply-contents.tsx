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
                name={reply.user?.username}
                src={reply.user?.profile?.avatarUrl || ''}
              />
              <Flex direction={'column'}>
                <Flex gap={2}>
                  <Text>{reply.user?.profile?.fullName}</Text>
                  <Text color="gray">@{reply.user?.username}</Text>
                  {/* <Text color="gray">{replyData.createdAt.getHours()}h</Text> */}
                </Flex>
                <Text>{reply.content}</Text>
                {/* <Flex my={2} gap={4}>
                  <Text display="flex" alignItems="center" gap={2}>
                    <FaHeart /> {reply.thread?.likesCount}
                  </Text>
                </Flex> */}
              </Flex>
            </Flex>
          </>
        </Box>
      ))}
    </>
  );
};

export default CardReplyContents;
