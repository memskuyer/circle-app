import { toaster } from '@/components/ui/toaster';
import { api } from '@/hooks/api';
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaDTO,
} from '@/utils/schemas/auth.schemas';
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
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = (props: BoxProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const navigate = useNavigate();
  const { mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    ForgotPasswordSchemaDTO
  >({
    mutationKey: ['forgot-password'],
    mutationFn: async ({ email }: ForgotPasswordSchemaDTO) => {
      const response = await api.post('/auth/forgot-password', { email });
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
      reset();
      toaster.create({
        title: data.message,
        type: 'success',
      });
      navigate('/login');
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaDTO) => {
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
        <Flex justifyContent={'flex-end'}>
          <ChakraLink>
            <Link to="/forgotpassword">Forgot Password</Link>
          </ChakraLink>
        </Flex>
        <Button w={'100%'} type="submit" bg={'#04A51E'} color={'white'}>
          Login
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

export default ForgotPassword;
