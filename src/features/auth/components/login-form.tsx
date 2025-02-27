import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import { useAuthStore } from '@/stores/auth.store';
import { LoginSchema, LoginSchemaDTO } from '@/utils/schemas/auth.schemas';
import {
  Box,
  BoxProps,
  Button,
  Link as ChakraLink,
  Field,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = (props: BoxProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });
  const { setUser } = useAuthStore();

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<
    { message: string },
    AxiosError,
    LoginSchemaDTO
  >({
    mutationKey: ['login'],
    mutationFn: async (data: LoginSchemaDTO) => {
      const response = await api.post('/auth/login', data);
      setUser(response.data.data.user);
      Cookies.set('token', response.data.data.token, {
        expires: 1,
      });
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error))
        return toaster.create({
          title: (error.response?.data as { message: string }).message,
          type: 'error',
        });
    },
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: 'success',
      });
      navigate({ pathname: '/' });
    },
  });

  const onSubmit = async (data: LoginSchemaDTO) => {
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
      <Text fontSize="28px">Login To Circle</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root my={2} invalid={!!errors.email?.message}>
          <Input
            placeholder="Email/username"
            {...register('email')}
            name="email"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root my={2} invalid={!!errors.password?.message}>
          <Input
            placeholder="Password"
            {...register('password')}
            type="password"
            name="password"
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
        <Flex justifyContent={'flex-end'}>
          <ChakraLink>
            <Link to="/forgotpassword">Forgot Password</Link>
          </ChakraLink>
        </Flex>
        <Button w={'100%'} type="submit" bg={'#04A51E'} color={'white'}>
          {isPending ? 'Loading...' : 'Login'}
        </Button>
      </form>
      <Text as={'span'}>
        Don't have an account yet?{' '}
        <ChakraLink>
          <Link to="/register"> Create Account</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
};
export default LoginForm;
