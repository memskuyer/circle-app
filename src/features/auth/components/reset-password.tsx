import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import {
  ResetPasswordSchema,
  ResetPasswordSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import { Box, BoxProps, Button, Field, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = (props: BoxProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(ResetPasswordSchema),
  });

  const navigate = useNavigate();

  const [getParams] = useSearchParams();
  const token = getParams.get('token');

  const { mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    ResetPasswordSchemaDTO
  >({
    mutationKey: ['reset-password'],
    mutationFn: async ({
      oldPassword,
      newPassword,
    }: ResetPasswordSchemaDTO) => {
      const response = await api.post(
        '/auth/reset-password',
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: (error.response?.data as { message: string }).message,
          type: 'error',
        });
      }
    },
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: 'success',
      });
      navigate({ pathname: '/login' });
    },
  });

  const onSubmit = async (data: ResetPasswordSchemaDTO) => {
    await mutateAsync(data);
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={'12px'}
      {...props}
    >
      <Text>Circle</Text>
      <Text fontSize="28px">Reset Password</Text>
      <Field.Root invalid={!!errors.oldPassword?.message}>
        <Input
          placeholder="New Password"
          {...register('oldPassword')}
          type="password"
          name="oldPassword"
        />
        <Field.ErrorText>{errors.oldPassword?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={!!errors.newPassword?.message}>
        <Input
          placeholder="Confirm Password"
          {...register('newPassword')}
          type="password"
          name="newPassword"
        />
        <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
      </Field.Root>
      <Button
        onClick={handleSubmit(onSubmit)}
        w={'100%'}
        type="submit"
        bg={'#04A51E'}
        color={'white'}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPassword;
