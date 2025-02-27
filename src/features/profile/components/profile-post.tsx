import ReplyOutline from '@/assets/ReplyOutline.svg';
import { Avatar } from '@/components/ui/avatar';
import { ThreadEntity } from '@/entities/thread.entities';
import ButtonLike from '@/hooks/button/button-like';
import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type ThreadUser = {
  data: ThreadEntity;
};

const ProfilePost = ({ data }: ThreadUser) => {
  return (
    <>
      <Box borderY="1px solid" borderColor={'gray'}>
        <Flex gap={4} p={4}>
          <Avatar
            name={data.user?.profile?.fullName}
            src={data.user?.profile?.avatarUrl || ``}
          />
          <Box>
            <Flex gap={2}>
              <Text>{data.user?.profile?.fullName}</Text>
              <Text color={'gray'}>@{data.user?.username}</Text>
              <Text color={'gray'}>•</Text>
              <Text color={'gray'}>4h</Text>
            </Flex>
            {data.images ? (
              <ChakraLink>
                <Link to={`/detail-image/${data.id}`}>
                  <Text>{data.content}</Text>
                  <Image src={data.images} maxH={'200px'} />
                </Link>
              </ChakraLink>
            ) : (
              <Link to={`/detail-post/${data.id}`}>
                <Text>{data.content}</Text>
              </Link>
            )}
          </Box>
        </Flex>
        <Flex ml={10}>
          <ButtonLike postDatas={data} />
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={ReplyOutline} width={'20px'} />
            <Text>3</Text>
            <Text>Replies</Text>
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default ProfilePost;
