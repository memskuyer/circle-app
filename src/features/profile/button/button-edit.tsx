import LogoImage from '@/assets/image.svg';
import { Avatar } from '@/components/ui/avatar';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toaster } from '@/components/ui/toaster';
import { ThreadEntity } from '@/entities/thread.entities';
import { api } from '@/hooks/api';
import {
  EditThreadSchema,
  EditThreadSchemaDTO,
} from '@/utils/schemas/thread.schemas';
import { Button, Field, Flex, Image, Input, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type ThreadProps = {
  datas: ThreadEntity;
};

const ButtonEdit = ({ datas }: ThreadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(EditThreadSchema),
  });

  const imgPreview = watch('images');

  useEffect(() => {
    if (imgPreview && imgPreview.length > 0) {
      const file = imgPreview[0];
      const bloob = URL.createObjectURL(file);
      setPreview(bloob);
      return () => URL.revokeObjectURL(bloob);
    } else {
      setPreview(datas.images);
    }
  }, [imgPreview]);

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<
    { message: string },
    Error,
    EditThreadSchemaDTO
  >({
    mutationKey: ['user-thread'],
    mutationFn: async (data: EditThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);

      if (data.images && data.images.length > 0) {
        formData.append('images', data.images[0]);
      }

      const response = await api.patch(`/threads/${datas.id}`, formData);
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
        queryKey: ['user-thread'],
      });
      queryClient.invalidateQueries({
        queryKey: ['thread-detail'],
      });
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  const onSubmit = async (data: EditThreadSchemaDTO) => {
    await mutateAsync(data);
    cancelButtonRef.current?.click();
  };
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button bg={'transparent'} color={{ base: 'black', _dark: 'white' }}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody>
          <Flex gap={2}>
            <Avatar
              src={
                datas.user?.profile?.avatarUrl ||
                `https://api.dicebear.com/9.x/avataaars/svg?seed=${datas.user?.profile?.fullName}`
              }
            />
            <Field.Root invalid={!!errors.content?.message}>
              <Textarea
                {...register('content')}
                defaultValue={datas.content}
                placeholder="What is happening?!"
              />
              <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
            </Field.Root>
          </Flex>
        </DialogBody>
        <hr />
        <Image
          src={preview || undefined}
          width="100%"
          maxH="200px"
          objectFit="contain"
        />
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button ref={cancelButtonRef} hidden variant="outline">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Flex w={'100%'} justify={'space-between'}>
            <label htmlFor="input-image" style={{ cursor: 'pointer' }}>
              <Image src={LogoImage} w={10} ml={10} />
            </label>
            <Input
              {...register('images')}
              id="input-image"
              type="file"
              hidden
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              rounded={'25px'}
              bg={'brand'}
              color={'black'}
              disabled={isPending ? true : false}
            >
              {isPending ? 'Loading...' : 'Edit'}
            </Button>
          </Flex>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ButtonEdit;
