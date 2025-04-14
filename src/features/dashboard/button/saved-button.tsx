import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import { SavedSchemaDTO } from '@/utils/schemas/saved.schemas';
import { Button } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { CiBookmark } from 'react-icons/ci';

type ThreadProps = {
  threadId: string;
  isSaved: boolean;
};

const SavedButton = ({ threadId, isSaved }: ThreadProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<
    { message: string },
    Error,
    SavedSchemaDTO
  >({
    mutationKey: ['thread-saved'],
    mutationFn: async (data: SavedSchemaDTO) => {
      const response = await api.post('/saved', data);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  const buttonClick = async () => {
    await mutateAsync({ threadId });
  };

  return (
    <>
      <Button onClick={buttonClick} variant={'ghost'}>
        <CiBookmark color={isSaved ? 'cyan' : 'white'} />
      </Button>
    </>
  );
};

export default SavedButton;
