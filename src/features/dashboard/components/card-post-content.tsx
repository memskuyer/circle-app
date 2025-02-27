import ReplyOutline from '@/assets/ReplyOutline.svg';
import { Avatar } from '@/components/ui/avatar';
import { ThreadEntity } from '@/entities/thread.entities';
import ButtonLike from '@/hooks/button/button-like';
import { useAuthStore } from '@/stores/auth.store';
import {
  Box,
  BoxProps,
  Button,
  Link as ChakraLink,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

interface CardPostProps extends BoxProps {
  postDatas: ThreadEntity;
}

const CardPostContent = ({ postDatas }: CardPostProps) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const buttonReplies = () => {
    if (postDatas?.images) {
      navigate(`/detail-image/${postDatas.id}`);
    } else {
      navigate(`/detail-post/${postDatas.id}`);
    }
  };

  const handleProfile = (id: string | undefined) => {
    if (user.username == postDatas.user?.username) {
      navigate('profile');
    } else {
      navigate(`/profile/user/${id}`);
    }
  };

  return (
    <Box borderY="1px solid" borderColor={'gray'}>
      <Flex gap={4} p={4}>
        <Avatar
          name={postDatas.user?.profile?.fullName}
          src={
            postDatas.user?.profile?.avatarUrl ||
            `'https://api.dicebear.com/9.x/glass/svg?seed=${postDatas.user?.profile?.fullName}`
          }
        />
        <Box>
          <Flex
            gap={2}
            cursor={'pointer'}
            onClick={() => handleProfile(postDatas.user?.id)}
          >
            <Text>{postDatas.user?.profile?.fullName}</Text>
            <Text color={'gray'}>@{postDatas.user?.username}</Text>
            <Text color={'gray'}>•</Text>
            <Text color={'gray'}>
              {new Date(postDatas.createdAt).getHours()}h
            </Text>
          </Flex>
          {postDatas.images ? (
            <ChakraLink>
              <Link to={`/detail-image/${postDatas.id}`}>
                <Text>{postDatas.content}</Text>
                <Image src={postDatas.images} maxH={'200px'} />
              </Link>
            </ChakraLink>
          ) : (
            <Link to={`/detail-post/${postDatas.id}`}>
              <Text>{postDatas.content}</Text>
            </Link>
          )}
        </Box>
      </Flex>
      <Flex ml={10}>
        <ButtonLike postDatas={postDatas} />
        <Button
          onClick={buttonReplies}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
        >
          <Image src={ReplyOutline} width={'20px'} />
          <Text>{postDatas.repliesCount}</Text>
          <Text>Replies</Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default CardPostContent;
