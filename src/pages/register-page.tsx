import RegisterForm from '@/features/auth/components/register-form';
import { Flex } from '@chakra-ui/react';
import React from 'react';

const RegisterPage = () => {
  return (
    <Flex justifyContent={'center'} marginTop={'128px'}>
      <RegisterForm w={'412px'} />
    </Flex>
  );
};

export default RegisterPage;
