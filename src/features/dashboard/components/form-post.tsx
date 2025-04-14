import LogoImage from '@/assets/image.svg';
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
  CreateThreadSchema,
  CreateThreadSchemaDTO,
} from '@/utils/schemas/thread.schemas';
import {
  Box,
  Button,
  DialogActionTrigger,
  Field,
  Flex,
  Image,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type ThreadResponse = {
  message: string;
};

const FormPost = () => {
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(CreateThreadSchema),
  });

  const [preview, setPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  const { isPending, mutateAsync } = useMutation<
    ThreadResponse,
    Error,
    CreateThreadSchemaDTO
  >({
    mutationKey: ['threads'],
    mutationFn: async (data: CreateThreadSchemaDTO) => {
      const formData = new FormData();

      formData.append('content', data.content);
      formData.append('images', data.images[0]);

      const response = await api.post('/threads', formData);

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
      reset({
        content: '',
        images: new DataTransfer().files,
      });
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  const imgPrv = watch('images');
  useEffect(() => {
    if (imgPrv && imgPrv.length > 0) {
      const file = imgPrv[0]; // Ambil file pertama
      const blob = URL.createObjectURL(file);
      setPreview(blob);

      return () => URL.revokeObjectURL(blob);
    } else {
      setPreview(null); // Reset preview jika tidak ada gambar
    }
  }, [imgPrv]); // Dependensi: hanya dijalankan saat images berubah

  const onSubmit = async (data: CreateThreadSchemaDTO) => {
    await mutateAsync(data);
    cancelButtonRef.current?.click();
  };

  return (
    <Box my={4}>
      <DialogRoot>
        <Flex gap={4} align={'center'}>
          <Avatar
            src={
              user.profile.avatarUrl ||
              `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.profile.fullName}`
            }
          />
          <DialogTrigger asChild>
            <Textarea
              defaultValue=""
              value={watch('content') || ''}
              onChange={(e) => setValue('content', e.target.value)}
              placeholder="What is happening?!"
            />
          </DialogTrigger>

          <Button bg={'transparent'} disabled>
            <Image src={LogoImage} w={10} />
          </Button>
          <Button rounded={'25px'} bg={'brand'} color={'black'} disabled>
            {isPending ? 'Loading...' : 'Post'}
          </Button>
        </Flex>

        <DialogContent p={'5px 0'}>
          <DialogBody pb="4">
            <Flex gap={2}>
              <Avatar
                src={
                  user.profile.avatarUrl ||
                  `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.profile.fullName}`
                }
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
                {isPending ? 'Loading...' : 'Post'}
              </Button>
            </Flex>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default FormPost;
