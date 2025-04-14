import { ThreadEntity } from '@/entities/thread.entities';
import { api } from '@/hooks/api';
import { Box, Grid, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const SavePost = () => {
  const { data: datas } = useQuery<ThreadEntity[]>({
    queryKey: ['saved-thread'],
    queryFn: async () => {
      const response = await api.get('/saved');
      return response.data.data;
    },
  });
  console.log(datas);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
      {datas?.length === 0 ? (
        <Text>you don't have data thread saved</Text>
      ) : (
        datas?.map((fieldData) => (
          <Link to={`/detail-image/${fieldData.id}`}>
            <Box p={2} border={'1px solid'} rounded={'2xl'} width={'80%'}>
              <Image
                w={'100%'}
                minH={'180px'}
                maxH={'180px'}
                src={fieldData.images}
              />
            </Box>
          </Link>
        ))
      )}
    </Grid>
  );
};

export default SavePost;
