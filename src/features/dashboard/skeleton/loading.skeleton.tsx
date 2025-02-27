import { Box, Flex } from '@chakra-ui/react';
import { Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingSkeleton = () => {
  return (
    <Box h={'100vh'}>
      <Flex h={'100vh'} justifyContent={'center'} align={'center'}>
        <VStack colorPalette="teal">
          <Spinner size={'xl'} color="cyan" />
          <Text textStyle={'5xl'} color="cyan">
            Loading to Circle App
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default LoadingSkeleton;
