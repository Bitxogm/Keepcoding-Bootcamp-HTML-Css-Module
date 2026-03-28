/**
 * Configuración global de la aplicación
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  API_URL: import.meta.env.VITE_API_URL,
  TIMEOUT: 10000, // 10 segundos
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PRODUCTS: '/products',
  UPLOAD: '/upload',
} as const;
