import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/auth.store';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import ProfileEditProfile from './profile-edit-profile';

const ProfileCard = () => {
  const profile = useAuthStore((state) => state.user);

  return (
    <Box>
      <Box my={4} pos="relative">
        <Image
          h="150px"
          rounded="xl"
          w="100%"
          src={
            profile.profile.bannerUrl ||
            `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${profile.profile.fullName}`
          }
        />
        <Box
          pos="absolute"
          rounded="50%"
          bottom={{ base: '-25px', lg: '-50px' }}
          left={{ base: '15px', md: '25px', lg: '50px' }}
          border="5px solid black"
        >
          <Avatar
            w={{ base: '75px', lg: '100px' }}
            h={{ base: '75px', lg: '100px' }}
            name="Paste Prosmana"
            src={
              profile.profile.avatarUrl ||
              `https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.profile.fullName}`
            }
          />
        </Box>
        <Box
          pos="absolute"
          rounded="50%"
          bottom="-50px"
          right={{ base: '15px', md: '25px', lg: '50px' }}
        >
          <ProfileEditProfile />
        </Box>
      </Box>
      <Box mt={20}>
        <Text textStyle="2xl">{profile.profile.fullName}</Text>
        <Text color="gray">@{profile.username}</Text>
        <Text>{profile.profile.bio || 'no bio'}</Text>
        <Flex my={2} gap={4}>
          <Flex gap={2} alignItems="center">
            <Text>321</Text>
            <Text color="gray">Following</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Text>321</Text>
            <Text color="gray">Followers</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileCard;
