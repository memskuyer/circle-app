import { FollowUnfollowSchemaDTO } from '@/utils/schemas/folow.schemas';
import { Button } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { FollowEntity } from '@/entities/follow.entities';

const ButtonFollow = ({ followData }: { followData: FollowEntity }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation<
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
    <>
      <Button
        onClick={() => handleFollow({ followingId: followData?.id })}
        _hover={{ bg: 'black' }}
        bg="transparent"
        border="1px solid"
        h="50%"
        color={{ base: 'black', _dark: 'white' }}
      >
        {isPending
          ? 'Loading...'
          : followData.isFollow && followData?.isFollower
            ? 'Unfollow'
            : followData?.isFollower
              ? 'Follback'
              : 'Follow'}
      </Button>
    </>
  );
};

export default ButtonFollow;
