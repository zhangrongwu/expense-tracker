import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../utils/error';
import LoadingSpinner from '../components/LoadingSpinner';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const toast = useToast();
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      const response = await login(data.email, data.password);
      authLogin(response.token, response.user);
      toast({
        title: '登录成功',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: '登录失败',
        description: apiError.message || '邮箱或密码错误',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box maxW="400px" mx="auto" mt={8}>
      <VStack spacing={8}>
        <Heading>登录</Heading>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>邮箱</FormLabel>
              <Input
                type="email"
                {...register('email', {
                  required: '请输入邮箱',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '请输入有效的邮箱地址',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>密码</FormLabel>
              <Input
                type="password"
                {...register('password', {
                  required: '请输入密码',
                  minLength: {
                    value: 6,
                    message: '密码长度至少为6位',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isSubmitting}
            >
              登录
            </Button>
          </VStack>
        </form>
        <Text>
          还没有账号？
          <Text as={Link} to="/register" color="blue.500" ml={2}>
            立即注册
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login; 