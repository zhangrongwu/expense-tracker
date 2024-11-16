import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Container,
} from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxW="container.md" py={10}>
          <VStack spacing={6} align="center">
            <Heading>出错了！</Heading>
            <Text>抱歉，应用程序遇到了一些问题。</Text>
            <Button
              colorScheme="blue"
              onClick={() => window.location.reload()}
            >
              刷新页面
            </Button>
          </VStack>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 