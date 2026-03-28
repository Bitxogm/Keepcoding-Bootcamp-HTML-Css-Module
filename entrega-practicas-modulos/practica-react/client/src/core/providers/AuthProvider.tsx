import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { User, LoginCredentials } from '@features/auth/types/user';
import * as authService from '@features/auth/services/auth.service';
import { STORAGE_KEYS } from '@core/config/constants';
import { AuthContext } from './AuthContext';

type JwtPayload = {
  userId: number;
  username: string;
  iat: number;
  exp: number;
};

const getInitialToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN);
};

const getInitialUser = (): User | null => {
  const savedUser = localStorage.getItem(STORAGE_KEYS.USER) || sessionStorage.getItem(STORAGE_KEYS.USER);
  if (!savedUser || savedUser === 'undefined') {
    return null;
  }
  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [token, setToken] = useState<string | null>(getInitialToken);

  const login = async (credentials: LoginCredentials, rememberMe: boolean = false) => {
    const data = await authService.login(credentials);

    // Decodificar el JWT para extraer el user
    const decoded = jwtDecode<JwtPayload>(data.accessToken);
    const user: User = {
      id: decoded.userId,
      username: decoded.username,
    };

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.TOKEN, data.accessToken);
    storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    setToken(data.accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
