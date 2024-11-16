import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box maxW="1200px" mx="auto" p={4}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default AppRoutes; 