import { Avatar } from '@/components/ui/avatar';
import { FollowEntity } from '@/entities/follow.entities';
import { UserEntity } from '@/entities/user.entities';
import { api } from '@/hooks/api';
import { useAuthStore } from '@/stores/auth.store';
import { FollowUnfollowSchemaDTO } from '@/utils/schemas/folow.schemas';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProfileUser = UserEntity & {
  followers?: FollowEntity[];
};

type UserData = {
  field: ProfileUser | undefined;
};

const ProfileUserCard = ({ field }: UserData) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const isFollow = field?.followers?.find(
    (fill) => fill.followingId == user.id
  );

  const { mutateAsync } = useMutation<
    { message: string },
    Error,
    FollowUnfollowSchemaDTO
  >({
    mutationKey: ['follow'],
    mutationFn: async (data: FollowUnfollowSchemaDTO) => {
      const response = await api.post(`/follow/`, data);
      return response.data.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['search-user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['all-user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['follows'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-profile'],
      });
    },
  });

  const handleFollow = async (data: FollowUnfollowSchemaDTO) => {
    await mutateAsync(data);
  };

  return (
    <Box>
      <Box my={4} pos="relative">
        <Image
          h="150px"
          rounded="xl"
          w="100%"
          src={
            field?.profile?.bannerUrl ||
            `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${field?.profile?.fullName}`
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
            name={field?.profile?.bannerUrl || undefined}
            src={
              field?.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/avataaars/svg?seed=${field?.profile?.fullName}`
            }
          />
        </Box>
        <Box
          pos="absolute"
          rounded="50%"
          bottom="-50px"
          right={{ base: '15px', md: '25px', lg: '50px' }}
        >
          <Button
            variant="outline"
            rounded={'xl'}
            onClick={() => handleFollow({ followingId: field?.id || '' })}
          >
            {isFollow?.isFollow ? 'Unfollow' : 'Follow'}
          </Button>
        </Box>
      </Box>
      <Box mt={20}>
        <Text textStyle="2xl">{field?.profile?.fullName}</Text>
        <Text color="gray">@{field?.username}</Text>
        <Text>{'no bio'}</Text>
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

export default ProfileUserCard;
