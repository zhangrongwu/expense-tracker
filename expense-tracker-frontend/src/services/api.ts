import axios, { AxiosError } from 'axios';
import { Transaction, User } from '../types';
import { ApiError, handleApiError } from '../utils/error';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.message || error.message;
    const statusCode = error.response?.status;
    const errors = error.response?.data?.errors;
    
    throw new ApiError(message, statusCode, errors);
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<{ token: string; user: User }>('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const register = async (email: string, password: string, username: string) => {
  try {
    const response = await api.post<User>('/auth/register', {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'user'>) => {
  try {
    const response = await api.post<Transaction>('/transactions', transaction);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    await api.delete(`/transactions/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

export default api; 