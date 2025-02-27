import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Box, Button, DrawerContext } from '@chakra-ui/react';
import SidebarLeft from './sidebar-left';
import SidebarRight from './sidebar-right';

const SidebarResponsive = () => {
  return (
    <Box
      display="flex"
      py={2}
      px={4}
      borderRadius={10}
      justifyContent="space-between"
      visibility={{ base: 'block', md: 'hidden' }}
      position="sticky"
      left="30%"
      right="30%"
      bottom="5"
      w={{ base: '40%' }}
    >
      <Box>
        <ButtonLeft />
      </Box>
      <Box>
        <ButtonRight />
      </Box>
    </Box>
  );
};

export default SidebarResponsive;

const ButtonLeft = () => {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          _light={{ bg: 'black/20' }}
          color={'white'}
          size="sm"
        >
          L
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerContext>
          {() => (
            <DrawerBody>
              <SidebarLeft />
            </DrawerBody>
          )}
        </DrawerContext>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

const ButtonRight = () => {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          _light={{ bg: 'black/20' }}
          color={'white'}
          size="sm"
        >
          R
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerContext>
          {() => (
            <DrawerBody>
              <SidebarRight />
            </DrawerBody>
          )}
        </DrawerContext>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
