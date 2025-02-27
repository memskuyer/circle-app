import LoginForm from '@/features/auth/components/login-form';
import { Flex } from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <Flex justifyContent={'center'} marginTop={'128px'}>
      <LoginForm w={'412px'} />
    </Flex>
  );
};

export default LoginPage;
