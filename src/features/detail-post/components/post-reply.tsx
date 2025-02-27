import { Avatar } from '@/components/ui/avatar';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import { useAuthStore } from '@/stores/auth.store';
import {
  CreateReplySchema,
  CreateReplySchemaDTO,
} from '@/utils/schemas/reply.schemas';
import {
  Box,
  Button,
  DialogActionTrigger,
  Field,
  Flex,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
type postId = {
  threadId: string;
};
type ThreadResponse = {
  message: string;
};
const PostReply = ({ threadId }: postId) => {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateReplySchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(CreateReplySchema),
  });

  const queryClient = useQueryClient();
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  const { isPending, mutateAsync } = useMutation<
    ThreadResponse,
    Error,
    CreateReplySchemaDTO
  >({
    mutationKey: ['reply'],
    mutationFn: async (data: CreateReplySchemaDTO) => {
      const response = await api.post(`/reply/${threadId}`, data);

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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['reply'],
      });
      reset({
        content: '',
      });
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  const onSubmit = async (data: CreateReplySchemaDTO) => {
    await mutateAsync(data);
    cancelButtonRef.current?.click();
  };

  return (
    <Box my={4}>
      <DialogRoot>
        <Flex gap={4} align={'center'}>
          <Avatar
            name={user.username}
            src={user.profile.avatarUrl || undefined}
          />
          <DialogTrigger asChild>
            <Textarea
              defaultValue=""
              value={watch('content') || ''}
              onChange={(e) => setValue('content', e.target.value)}
              placeholder="What is happening?!"
            />
          </DialogTrigger>
          <Button rounded={'25px'} bg={'brand'} disabled>
            {isPending ? 'Loading...' : 'Post'}
          </Button>
        </Flex>

        <DialogContent p={'5px 0'}>
          <DialogBody pb="4">
            <Flex gap={2}>
              <Avatar
                name="Paste Prosmana"
                src={user.profile.avatarUrl || ''}
              />
              <Field.Root invalid={!!errors.content?.message}>
                <Textarea
                  {...register('content')}
                  placeholder="What is happening?!"
                  value={watch('content') || ''}
                  onChange={(e) => setValue('content', e.target.value)}
                />
                <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>
          </DialogBody>
          <hr />
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button ref={cancelButtonRef} hidden variant="outline">
                Cancel
              </Button>
            </DialogActionTrigger>
            <Flex w={'100%'} justify={'flex-end'}>
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                rounded={'25px'}
                bg={'brand'}
                disabled={isPending ? true : false}
              >
                {isPending ? 'Loading...' : 'Post'}
              </Button>
            </Flex>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default PostReply;
