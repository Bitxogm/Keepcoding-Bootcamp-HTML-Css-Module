
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@core/hooks/useAuth';
import { HttpError, getErrorMessage } from '@core/utils/http-errors';

export const useHandleAuthError = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleError = useCallback((error: unknown) => {
    if (error instanceof HttpError && error.status === 401) {
      logout();
      toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      navigate('/login');
      return;
    }

    toast.error(getErrorMessage(error));
  }, [logout, navigate]);

  return { handleError };
};