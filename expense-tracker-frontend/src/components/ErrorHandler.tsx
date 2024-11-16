import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { isApiError } from '../utils/error';

interface ErrorHandlerProps {
  error: unknown;
  resetError?: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, resetError }) => {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      if (isApiError(error)) {
        toast({
          title: '错误',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (error instanceof Error) {
        toast({
          title: '错误',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: '错误',
          description: '发生未知错误',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }

      if (resetError) {
        resetError();
      }
    }
  }, [error, toast, resetError]);

  return null;
};

export default ErrorHandler; 