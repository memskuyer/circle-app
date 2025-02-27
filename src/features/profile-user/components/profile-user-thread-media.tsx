import { ThreadEntity } from '@/entities/thread.entities';
import {
  Box,
  Grid,
  GridItem,
  Link as ChakraLink,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

type UserMedia = {
  data: ThreadEntity[] | undefined;
};

const ProfileUserThreadMedia = ({ data }: UserMedia) => {
  const filteredImage = data?.filter((data) => data.images);
  if (filteredImage?.length == 0) {
    return <Text>Thread image not found</Text>;
  }

  return (
    <Box mt={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap="3">
        {data
          ?.filter((fill) => fill.images)
          .map((field) => (
            <GridItem key={field.id} colSpan={1}>
              <ChakraLink>
                <Link to={`/detail-image/${field.id}`}>
                  <Image src={field.images} maxH={'200px'} />
                </Link>
              </ChakraLink>
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default ProfileUserThreadMedia;
