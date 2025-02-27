import { UserEntity } from '@/entities/user.entities';
import CardSkeleton from '@/features/search/skeleton/card-skeleton';
import { api } from '@/hooks/api';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { lazy, Suspense, useState } from 'react';

const CardUser = lazy(() => import('@/components/card-user'));

type Follows = UserEntity & {
  isFollow: boolean;
};

const FollowsComponents = () => {
  const [activeFilter, setActiveFilter] = useState<string>('followers');

  const { data } = useQuery<{ message: string }, Error, Follows[]>({
    queryKey: ['follows'],
    queryFn: async () => {
      const response = await api.get('/users/all');
      return response.data.data;
    },
  });

  const filteredData =
    activeFilter === 'followers' ? data : data?.filter((fill) => fill.isFollow);

  return (
    <Box>
      <Flex gap={2}>
        {['followers', 'following'].map((filter, i) => (
          <Button
            onClick={() => setActiveFilter(filter)}
            key={i}
            w={'50%'}
            bg={'none'}
            color={'white'}
            borderBottom={activeFilter === filter ? '1px solid' : ''}
            borderBottomColor={activeFilter === filter ? 'brand' : ''}
          >
            {filter}
          </Button>
        ))}
      </Flex>

      {filteredData?.map((datas) => (
        <Suspense key={datas.id} fallback={<CardSkeleton />}>
          <CardUser data={datas} />
        </Suspense>
      ))}
    </Box>
  );
};

export default FollowsComponents;
