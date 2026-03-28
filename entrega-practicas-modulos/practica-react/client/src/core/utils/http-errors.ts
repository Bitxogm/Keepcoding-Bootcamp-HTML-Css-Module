export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    switch (error.status) {
      case 401:
        return 'No estás autenticado. Por favor inicia sesión.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 500:
        return 'Error del servidor. Por favor intenta más tarde.';
      default:
        return error.message || 'Error desconocido';
    }
  }
  
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Error desconocido';
};