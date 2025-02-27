import ReplyOutline from '@/assets/ReplyOutline.svg';
import { Avatar } from '@/components/ui/avatar';
import { ThreadEntity } from '@/entities/thread.entities';
import ButtonLike from '@/hooks/button/button-like';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import CardReplyContents from './card-reply-contents';
import PostReply from './post-reply';

interface CardDetailPost {
  postData: ThreadEntity;
}

const CardPostContent = ({ postData }: CardDetailPost) => {
  return (
    <Box mt={4} borderBottom={'1px solid'} borderColor={'gray'}>
      <Flex gap={4} mb={2}>
        <Avatar
          name={postData.user?.profile?.fullName}
          src={postData.user?.profile?.avatarUrl || ''}
        />
        <Flex direction={'column'}>
          <Text>{postData.user?.profile?.fullName}</Text>
          <Text>@{postData.user?.username}</Text>
        </Flex>
      </Flex>
      <Text>{postData.content}</Text>
      <Flex gap="4">
        <Text color="gray">11:32 PM</Text>
        <Text color="gray">Jul 26, 2024</Text>
      </Flex>
      <Flex my={2} gap={4}>
        <ButtonLike postDatas={postData} />
        <Button variant={'ghost'} display={'flex'} gap={'4px'}>
          <Image src={ReplyOutline} width={'20px'} />
          <Text>{postData.repliesCount}</Text>
          <Text>Replies</Text>
        </Button>
      </Flex>
      <PostReply threadId={postData.id} />
      <CardReplyContents />
    </Box>
  );
};

export default CardPostContent;
