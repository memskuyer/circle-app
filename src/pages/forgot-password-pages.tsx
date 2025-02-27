import ForgotPassword from '@/features/auth/components/forgot-password';
import { Flex } from '@chakra-ui/react';
import React from 'react';

const ForgotpasswordPage = () => {
  return (
    <Flex justifyContent={'center'} marginTop={'128px'}>
      <ForgotPassword w={'412px'} />
    </Flex>
  );
};

export default ForgotpasswordPage;
