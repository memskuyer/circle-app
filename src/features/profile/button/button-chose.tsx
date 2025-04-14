import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import ButtonEdit from './button-edit';
import ButtonDelete from './button-delete';
import { ThreadEntity } from '@/entities/thread.entities';

type ThreadProps = {
  data: ThreadEntity;
};
const ButtonChose = ({ data }: ThreadProps) => {
  const [showOption, setShowOption] = useState<boolean>(false);
  const handleClick = () => {
    setShowOption(!showOption);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        bg={'transparent'}
        color={{ base: 'black', _dark: 'white' }}
      >
        :
      </Button>

      <Box pos={'absolute'} hidden={showOption ? false : true}>
        <Box>
          <ButtonEdit datas={data} />
        </Box>
        <Box>
          <ButtonDelete id={data.id} />
        </Box>
      </Box>
    </div>
  );
};

export default ButtonChose;
