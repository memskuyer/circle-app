import { ThreadEntity } from '@/entities/thread.entities';
import CardSkeleton from '@/features/search/skeleton/card-skeleton';
import { api } from '@/hooks/api';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import CardPostContent from './card-post-content';

const DetailComponents = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<ThreadEntity>({
    queryKey: ['thread-detail'],
    queryFn: async () => {
      const response = await api.get(`/threads/${id}`);
      return response.data.data;
    },
  });

  return (
    <Box>
      {isLoading ? (
        <CardSkeleton />
      ) : data ? (
        <CardPostContent postData={data} />
      ) : (
        <Navigate to={'/'} />
      )}
    </Box>
  );
};
export default DetailComponents;
