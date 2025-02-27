import FormPost from '@/features/dashboard/components/form-post';
import PostContent from '@/features/dashboard/components/post-content';
import { Box, Text } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box>
      <Text textStyle={'2xl'}>Home</Text>
      <FormPost />
      <PostContent />
    </Box>
  );
};

export default HomePage;
