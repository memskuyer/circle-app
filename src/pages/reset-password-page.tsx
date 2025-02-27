import ResetPassword from '@/features/auth/components/reset-password';
import { Flex } from '@chakra-ui/react';

const ResetPasswordPage = () => {
  return (
    <Flex justifyContent={'center'} marginTop={'128px'}>
      <ResetPassword w={'412px'} />
    </Flex>
  );
};

export default ResetPasswordPage;
