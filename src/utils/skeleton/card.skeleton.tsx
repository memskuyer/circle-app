import { HStack, Stack } from '@chakra-ui/react';
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@/components/ui/skeleton';

export const SkeletonCard = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Stack key={index} gap="6" maxW="xs" my={5}>
          <HStack width="full">
            <SkeletonCircle size="10" />
            <SkeletonText noOfLines={2} />
          </HStack>
          <Skeleton marginLeft={10} height="200px" />
        </Stack>
      ))}
    </>
  );
};
