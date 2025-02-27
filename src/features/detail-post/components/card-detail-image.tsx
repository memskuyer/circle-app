import LoadingSkeleton from '@/features/dashboard/skeleton/loading.skeleton';
import { api } from '@/hooks/api';
import { Box, Button, Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ThreadDetail } from '../types/detail-post';
import DetailComponents from './detail-components';

const CardDetailImage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useQuery<ThreadDetail>({
    queryKey: ['thread-detail'],
    queryFn: async () => {
      const response = await api.get(`/threads/${id}`);
      return response.data.data;
    },
  });
  if (isPending) {
    return <LoadingSkeleton />;
  }

  return (
    <Box h={'100vh'}>
      <Grid templateColumns="repeat(6, 1fr)" gap="2">
        <GridItem minH={'100vh'} colSpan={4}>
          <Button
            onClick={() => navigate(-1)}
            pos={'absolute'}
            top={5}
            left={10}
            border={'1px solid'}
            px={3}
            py={'5px'}
            rounded={'full'}
          >
            X
          </Button>
          {data?.images != undefined ? (
            <Flex align={'center'} justify={'center'} h={'100vh'}>
              <Image maxHeight={'100vh'} maxWidth={'100%'} src={data.images} />
            </Flex>
          ) : (
            <Navigate to={'/'} />
          )}
        </GridItem>
        <GridItem
          colSpan={2}
          maxH={'100vh'}
          p={2}
          borderX={'1px solid'}
          borderColor={'gray'}
          overflowY={'auto'}
        >
          <DetailComponents />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CardDetailImage;
