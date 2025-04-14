import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import { Button, Dialog, Portal } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const ButtonDelete = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationKey: ['user-thread'],
    mutationFn: async () => {
      const response = await api.delete(`/threads/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user-thread'],
      });
      toaster.create({
        title: 'Delete Success',
        type: 'success',
      });
    },
  });

  const navigate = useNavigate();
  const handleDelete = async () => {
    await mutateAsync();
    navigate(-1);
  };

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button bg={'transparent'} color={'red'}>
          Delete
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete your
                thread and remove your thread from our systems.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleDelete} colorPalette="red">
                Delete
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ButtonDelete;
