import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ProductForm } from '../components/ProductForm';
import * as productsService from '../services/products.service';
import type { PCComponent } from '../types/product';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHandleAuthError } from '@core/hooks/useHandleAuthError';
import { Spinner } from '@/core/components/Spinner';

export const EditProductPage: React.FC = () => {
  const { handleError } = useHandleAuthError();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Validar que el ID sea un número válido
  const productId = Number(id);
  if (!id || isNaN(productId) || productId <= 0) {
    return <Navigate to="/404" replace />;
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { product, loading, error } = useProduct(productId);

  const handleSubmit = async (updatedProduct: Omit<PCComponent, 'id'>) => {
    try {
      await productsService.updateProduct(productId, updatedProduct);
      toast.success('Producto actualizado correctamente');
      navigate(`/products/${productId}`);
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return < Spinner />
  }

  if (error) {
    return <div className="text-center py-12 text-destructive">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to={`/products/${id}`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al detalle
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Editar Producto</CardTitle>
          <CardDescription>
            Modifica los datos de: {product.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            onSubmit={handleSubmit}
            initialData={product}
            submitButtonText="Guardar Cambios"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductPage;