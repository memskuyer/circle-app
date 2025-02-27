import { Avatar } from '@/components/ui/avatar';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field as ChakraField } from '@/components/ui/field';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import { useAuthStore } from '@/stores/auth.store';
import {
  EditProfileSchema,
  EditProfileSchemaDTO,
} from '@/utils/schemas/profile.schemas';
import {
  Box,
  Button,
  DialogActionTrigger,
  Field,
  Image,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const ProfileEditProfile = () => {
  const profile = useAuthStore((state) => state.user);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditProfileSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(EditProfileSchema),
  });

  const { isPending, mutateAsync } = useMutation<
    { message: string },
    Error,
    EditProfileSchemaDTO
  >({
    mutationKey: ['update-profile'],
    mutationFn: async (data: EditProfileSchemaDTO) => {
      const formData = new FormData();

      formData.append('username', data.username);
      formData.append('fullName', data.fullName);
      formData.append('bio', data.bio);
      formData.append('avatarUrl', data.avatarUrl[0]);
      formData.append('bannerUrl', data.bannerUrl[0]);

      const response = await api.put('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.message,
          type: 'error',
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['check-auth'],
      });
      reset();
      cancelButtonRef.current?.click();
      window.location.reload();
      return toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  const bannerPreview = watch('bannerUrl');
  const [banner, setBanner] = useState<string | undefined>('');
  const avararUrl = watch('avatarUrl');
  const [avatar, setAvatar] = useState<string | undefined>('');

  useEffect(() => {
    if (bannerPreview && bannerPreview.length > 0) {
      const file = bannerPreview[0];
      const bloob = URL.createObjectURL(file);
      setBanner(bloob);
      return () => URL.revokeObjectURL(bloob);
    }

    if (avararUrl && avararUrl.length > 0) {
      const file = avararUrl[0];
      const bloob = URL.createObjectURL(file);
      setAvatar(bloob);
      return () => URL.revokeObjectURL(bloob);
    }
  }, [bannerPreview, avararUrl]);

  const handleClickEdit = async (data: EditProfileSchemaDTO) => {
    await mutateAsync(data);
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" rounded={'xl'}>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Box mb={10} pos="relative">
              <label htmlFor="banner-url">
                <Image
                  cursor={'pointer'}
                  _hover={{ border: '1px solid', borderColor: 'white.500' }}
                  h="150px"
                  rounded="xl"
                  w="100%"
                  src={
                    banner ||
                    profile.profile.bannerUrl ||
                    `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${profile.profile.fullName}`
                  }
                />
              </label>
              <Input
                {...register('bannerUrl')}
                type="file"
                hidden
                id="banner-url"
              />
              <Box
                pos="absolute"
                rounded="50%"
                bottom={{ base: '-25px', lg: '-50px' }}
                left={{ base: '15px', md: '25px', lg: '50px' }}
                _hover={{ border: '5px solid', borderColor: 'white.500' }}
                border="5px solid black"
              >
                <label htmlFor="avatar-url">
                  <Avatar
                    cursor={'pointer'}
                    w={{ base: '75px', lg: '100px' }}
                    h={{ base: '75px', lg: '100px' }}
                    name="Paste Prosmana"
                    src={
                      avatar ||
                      profile.profile.avatarUrl ||
                      `https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.profile.fullName}`
                    }
                  />
                </label>
                <Input
                  {...register('avatarUrl')}
                  type="file"
                  hidden
                  id="avatar-url"
                />
              </Box>
            </Box>
            <Field.Root invalid={!!errors.fullName?.message}>
              <ChakraField label="Full Name">
                <Input
                  {...register('fullName')}
                  defaultValue={profile.profile.fullName || ''}
                />
              </ChakraField>
              <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.username?.message}>
              <ChakraField label="Username">
                <Input
                  {...register('username')}
                  defaultValue={profile.username}
                />
              </ChakraField>
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.bio?.message}>
              <ChakraField label="Bio">
                <Textarea
                  {...register('bio')}
                  defaultValue={profile.profile.bio || ''}
                />
              </ChakraField>
              <Field.ErrorText>{errors.bio?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button ref={cancelButtonRef} hidden variant="outline">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={handleSubmit(handleClickEdit)}
            bg={'brand'}
            rounded={'full'}
            disabled={isPending ? true : false}
          >
            {isPending ? 'Loading...' : 'Edit Profile'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ProfileEditProfile;
