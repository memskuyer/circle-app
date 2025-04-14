import { Box } from '@chakra-ui/react';
import ButtonSavePost from '../button/button-save-post';
import ChangePasswordComponents from './change-password-components';
import LogoutComponents from './logout-components';

const SettingComponents = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={5}>
      <ButtonSavePost />
      <ChangePasswordComponents />
      <LogoutComponents />
    </Box>
  );
};

export default SettingComponents;
