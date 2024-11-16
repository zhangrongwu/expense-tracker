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
import { register as registerUser } from '../services/api';
import { ApiError } from '../utils/error';
import LoadingSpinner from '../components/LoadingSpinner';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await registerUser(data.email, data.password, data.username);
      toast({
        title: '注册成功',
        description: '请登录',
        status: 'success',
        duration: 3000,
      });
      navigate('/login');
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: '注册失败',
        description: apiError.message || '该邮箱已被注册',
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
        <Heading>注册</Heading>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel>用户名</FormLabel>
              <Input
                {...register('username', {
                  required: '请输入用户名',
                  minLength: {
                    value: 2,
                    message: '用户名至少需要2个字符',
                  },
                  maxLength: {
                    value: 20,
                    message: '用户名不能超过20个字符',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    message: '密码必须包含大小写字母和数字',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>确认密码</FormLabel>
              <Input
                type="password"
                {...register('confirmPassword', {
                  required: '请确认密码',
                  validate: value =>
                    value === password || '两次输入的密码不一致',
                })}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isSubmitting}
            >
              注册
            </Button>
          </VStack>
        </form>
        <Text>
          已有账号？
          <Text as={Link} to="/login" color="blue.500" ml={2}>
            立即登录
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register; 