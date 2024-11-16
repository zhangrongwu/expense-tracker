import React from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
  Container,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bg={bgColor} borderBottom="1px" borderColor={borderColor}>
      <Container maxW="1200px">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <RouterLink to="/">
            <Heading
              size="lg"
              cursor="pointer"
              color="brand.500"
            >
              记账助手
            </Heading>
          </RouterLink>

          <Flex alignItems="center" gap={4}>
            {isAuthenticated ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                >
                  <Flex alignItems="center">
                    <Avatar size="sm" name={user?.username} mr={2} />
                    {user?.username}
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>退出登录</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                >
                  登录
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                >
                  注册
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; 