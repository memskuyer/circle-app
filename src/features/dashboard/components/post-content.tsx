import { ThreadEntity } from '@/entities/thread.entities';
import { api } from '@/hooks/api';
import { SkeletonCard } from '@/utils/skeleton/card.skeleton';
import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CardPostContent from './card-post-content';

const PostContent = () => {
  const {
    data: threads,
    isLoading,
    isError,
    failureReason,
  } = useQuery<ThreadEntity[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      const response = await api.get<{ data: ThreadEntity[] }>('/threads');
      return response.data.data;
    },
  });

  return (
    <>
      {isError && <Text>{failureReason?.message}</Text>}
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <Box>
          {threads?.map((data) => (
            <CardPostContent key={data.id} postDatas={data} />
          ))}
        </Box>
      )}
    </>
  );
};

export default PostContent;
