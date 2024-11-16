import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const LoadingSpinner: React.FC = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      alignItems="center"
      justifyContent="center"
      bg="blackAlpha.300"
      zIndex={9999}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default LoadingSpinner; 