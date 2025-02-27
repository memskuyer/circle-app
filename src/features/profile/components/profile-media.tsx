import { ThreadEntity } from '@/entities/thread.entities';
import {
  Box,
  Link as ChakraLink,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type ThreadUserImage = {
  data: ThreadEntity[] | undefined;
};

const ProfileMedia = ({ data }: ThreadUserImage) => {
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

export default ProfileMedia;
