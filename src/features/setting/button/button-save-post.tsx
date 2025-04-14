import { Button, Text } from '@chakra-ui/react';
import { CiBookmark } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const ButtonSavePost = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant={'ghost'}
        w={'full'}
        display={'flex'}
        justifyContent={'left'}
        gap={6}
        onClick={() => navigate('/save-post')}
      >
        <CiBookmark />
        <Text textStyle={'xl'}>Bookmark</Text>
      </Button>
    </>
  );
};

export default ButtonSavePost;
