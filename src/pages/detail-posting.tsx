import DetailComponents from '@/features/detail-post/components/detail-components';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const DetailPosting = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Flex gap={4} align={'center'}>
        <Button bg={'transparent'} onClick={() => navigate(-1)}>
          <FaArrowLeft color="white" size={25} />
        </Button>
        <Text textStyle={'2xl'}>Status</Text>
      </Flex>
      <DetailComponents />
    </Box>
  );
};

export default DetailPosting;
