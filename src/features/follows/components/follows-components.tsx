import CardSkeleton from '@/features/search/skeleton/card-skeleton';
import { api } from '@/hooks/api';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { lazy, Suspense, useState } from 'react';
import { Follows } from '../types/follow-types';

const CardUser = lazy(() => import('@/components/card-user'));

const FollowsComponents = () => {
  const [activeFilter, setActiveFilter] = useState<string>('followers');

  const { data, isLoading } = useQuery<{ message: string }, Error, Follows>({
    queryKey: ['follows'],
    queryFn: async () => {
      const response = await api.get('/follow');
      return response.data.data;
    },
  });

  const filteredData =
    activeFilter === 'followers'
      ? (data?.follower ?? [])
      : (data?.following ?? []);

  return (
    <Box>
      <Flex gap={2}>
        {['followers', 'following'].map((filter, i) => (
          <Button
            onClick={() => setActiveFilter(filter)}
            key={i}
            w={'50%'}
            bg={'none'}
            color={{ base: 'black', _dark: 'white' }}
            borderBottom={activeFilter === filter ? '1px solid' : ''}
            borderBottomColor={activeFilter === filter ? 'brand' : ''}
          >
            {filter}
          </Button>
        ))}
      </Flex>

      {isLoading ? (
        <CardSkeleton />
      ) : filteredData.length == 0 ? (
        <Text textAlign="center" color="gray.400">
          No Data
        </Text>
      ) : (
        filteredData?.map((datas) => (
          <Suspense key={datas.id} fallback={<CardSkeleton />}>
            <CardUser data={datas} />
          </Suspense>
        ))
      )}
    </Box>
  );
};

export default FollowsComponents;
