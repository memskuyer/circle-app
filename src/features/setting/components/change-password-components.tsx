import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import {
  ChangePasswordSchema,
  ChangePasswordSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import { Box, Button, Field, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdPassword } from 'react-icons/md';
import Swal from 'sweetalert2';

const ChangePasswordComponents = () => {
  const [hidden, setHidden] = useState<boolean>(true);
  const toggleHidden = () => setHidden(!hidden);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { mutateAsync, isPending } = useMutation<
    { message: string },
    Error,
    ChangePasswordSchemaDTO
  >({
    mutationKey: ['change-password'],
    mutationFn: async (data: ChangePasswordSchemaDTO) => {
      const response = await api.post('/auth/change-password', data);
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
      Cookies.remove('token');
      toaster.create({
        title: data.message,
        type: 'success',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });

  const onsubmit = async (data: ChangePasswordSchemaDTO) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'do you want to change password',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(data);
      }
    });
  };
  return (
    <Box>
      <Button
        variant={'ghost'}
        w={'full'}
        display={'flex'}
        justifyContent={'left'}
        gap={6}
        onClick={toggleHidden}
      >
        <MdPassword />
        <Text textStyle={'xl'}>Change Password</Text>
      </Button>

      <Box hidden={hidden ? true : false}>
        <Flex gap={2}>
          <Field.Root invalid={!!errors.oldPassword}>
            <Field.Label>Old Password</Field.Label>
            <PasswordInput {...register('oldPassword')} />
            <Field.ErrorText>{errors.oldPassword?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.newPassword}>
            <Field.Label>New Password</Field.Label>
            <PasswordInput {...register('newPassword')} />
            <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirm Password</Field.Label>
            <PasswordInput {...register('confirmPassword')} />
            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>
        </Flex>
        <Button
          mt={5}
          variant={'ghost'}
          bg={'white/30'}
          disabled={isPending ? true : false}
          onClick={handleSubmit(onsubmit)}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordComponents;
