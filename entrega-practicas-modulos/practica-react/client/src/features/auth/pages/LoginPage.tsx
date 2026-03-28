import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@core/hooks/useAuth';
import { LoginForm } from '../components/LoginForm';
import type { LoginCredentials } from '../types/user';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getErrorMessage } from '@core/utils/http-errors';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials: LoginCredentials, rememberMe: boolean) => {
    try {
      await login(credentials, rememberMe);
      toast.success('¡Bienvenido!');
      navigate('/products');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };;

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} />

          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-medium underline underline-offset-4 hover:text-primary">
              Regístrate aquí
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;