import { useState } from 'react';
import type { LoginCredentials } from '../types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  onSubmit: (credentials: LoginCredentials, rememberMe: boolean) => void;
  submitButtonText?: string;
  showRememberMe?: boolean;
}

export const LoginForm: React.FC<Props> = ({ 
  onSubmit, 
  submitButtonText = 'Iniciar Sesión',
  showRememberMe = true 
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, rememberMe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Ingresa tu usuario"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Ingresa tu contraseña"
        />
      </div>

      {showRememberMe && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
            Recordar contraseña
          </Label>
        </div>
      )}

      <Button type="submit" className="w-full">
        {submitButtonText}
      </Button>
    </form>
  );
};