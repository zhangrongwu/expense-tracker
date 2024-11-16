import axios, { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const message = axiosError.response?.data?.message || axiosError.message;
    const statusCode = axiosError.response?.status;
    const errors = axiosError.response?.data?.errors;
    
    return new ApiError(message, statusCode, errors);
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError('发生未知错误');
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
}; 