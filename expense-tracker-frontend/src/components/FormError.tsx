import React from 'react';
import { Text } from '@chakra-ui/react';

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <Text color="red.500" fontSize="sm" mt={1}>
      {message}
    </Text>
  );
};

export default FormError; 