import { toaster } from '@/components/ui/toaster';
import { ThreadEntity } from '@/entities/thread.entities';
import { LikeUnLikeSchemaDTO } from '@/utils/schemas/like.schemas';
import { Button, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { FaHeart } from 'react-icons/fa';
import { api } from '../api';

interface CardPostProps {
  postDatas: ThreadEntity;
}

const ButtonLike = ({ postDatas }: CardPostProps) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    LikeUnLikeSchemaDTO
  >({
    mutationKey: ['like'],
    mutationFn: async (data: LikeUnLikeSchemaDTO) => {
      const response = await api.post('/likes', data);
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-thread'],
      });
      queryClient.invalidateQueries({
        queryKey: ['thread-detail'],
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.message,
          type: 'error',
        });
      }
    },
  });
  const handlelikeUnlike = async (data: LikeUnLikeSchemaDTO) => {
    await mutateAsync(data);
  };

  return (
    <>
      <Button
        variant={'ghost'}
        display={'flex'}
        gap={'4px'}
        disabled={isPending ? true : false}
        onClick={() => handlelikeUnlike({ threadId: postDatas.id })}
      >
        {postDatas.isLiked ? <FaHeart color="red" /> : <FaHeart />}
        <Text>{postDatas.likesCount}</Text>
      </Button>
    </>
  );
};

export default ButtonLike;
