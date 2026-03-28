import type { PCComponent } from '../types/product';
import { HttpError } from '@core/utils/http-errors';

const API_URL = import.meta.env.VITE_API_URL + '/products';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

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

export const getAllProducts = async (): Promise<PCComponent[]> => {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  return handleResponse<PCComponent[]>(response);
};

export const getProductById = async (id: number): Promise<PCComponent> => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse<PCComponent>(response);
};

export const createProduct = async (
  product: Omit<PCComponent, 'id'>
): Promise<PCComponent> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  return handleResponse<PCComponent>(response);
};

export const updateProduct = async (
  id: number,
  product: Partial<PCComponent>
): Promise<PCComponent> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  return handleResponse<PCComponent>(response);
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.text().catch(() => null);
    throw new HttpError(response.status, `Error ${response.status}`, errorData);
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new HttpError(response.status, 'Error al subir la imagen');
  }

  // El backend devuelve JSON: { "path": "http://..." }
  const data = await response.json();
  const imageUrl = data.path;
  
  // Limpiar doble slash
  const cleanedUrl = imageUrl.replace(/\/\//g, '/').replace('http:/', 'http://');
  
  return cleanedUrl;
};