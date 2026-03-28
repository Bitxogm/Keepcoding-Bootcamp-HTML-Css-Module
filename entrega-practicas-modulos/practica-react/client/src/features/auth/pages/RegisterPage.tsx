import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import type { LoginCredentials } from '../types/user';
import * as authService from '../services/auth.service';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getErrorMessage } from '@core/utils/http-errors';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (credentials: LoginCredentials) => {
    try {
      await authService.register(credentials);
      toast.success('Usuario registrado correctamente');
      navigate('/login');
    } catch (error) {
       toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>
            Regístrate para empezar a gestionar tu inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm 
            onSubmit={handleRegister}
            submitButtonText="Crear Cuenta"
            showRememberMe={false}
          />
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium underline underline-offset-4 hover:text-primary">
              Inicia sesión aquí
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;