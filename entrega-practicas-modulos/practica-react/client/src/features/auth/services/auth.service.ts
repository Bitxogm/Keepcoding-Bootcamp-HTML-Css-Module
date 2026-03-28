import type { LoginCredentials, AuthResponse } from '../types/user';
import { HttpError } from '@core/utils/http-errors';

const API_URL = import.meta.env.VITE_BASE_URL;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.text().catch(() => null);
    throw new HttpError(
      response.status,
      `Error ${response.status}`,
      errorData
    );
  }
  return response.json();
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse<AuthResponse>(response);
  return data;
};

export const register = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse<AuthResponse>(response);
};