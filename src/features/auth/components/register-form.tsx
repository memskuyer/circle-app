import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import {
  RegisterSchema,
  RegisterSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import {
  Box,
  BoxProps,
  Button,
  Link as ChakraLink,
  Field,
  Input,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = (props: BoxProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    RegisterSchemaDTO
  >({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterSchemaDTO) => {
      const response = await api.post('/auth/register', data);
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
      navigate('/login');
    },
  });

  const onSubmit = async (data: RegisterSchemaDTO) => {
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
      <Text fontSize="28px">Regitster To Circle</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root my={2} invalid={!!errors.fullName?.message}>
          <Input placeholder="full name" {...register('fullName')} />
          <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root my={2} invalid={!!errors.username?.message}>
          <Input placeholder="username" {...register('username')} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root my={2} invalid={!!errors.email?.message}>
          <Input placeholder="Email" {...register('email')} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root my={2} invalid={!!errors.password?.message}>
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
        <Button type="submit" w={'100%'} bg={'#04A51E'} color={'white'}>
          {isPending ? 'Loading...' : 'Register'}
        </Button>
      </form>
      <Text as={'span'}>
        Already have account?{' '}
        <ChakraLink color={'#04A51E'}>
          <Link to="/login"> Login</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
};
export default RegisterForm;
