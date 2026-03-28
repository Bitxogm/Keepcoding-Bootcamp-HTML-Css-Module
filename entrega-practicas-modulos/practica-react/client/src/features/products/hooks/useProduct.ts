import { useEffect, useState } from 'react';
import type { PCComponent } from '../types/product';
import * as productsService from '../services/products.service';
import { getErrorMessage } from '@core/utils/http-errors';
import { useHandleAuthError } from '@core/hooks/useHandleAuthError';

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<PCComponent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useHandleAuthError();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productsService.getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        const errorMsg = getErrorMessage(err);
        setError(errorMsg);
        setProduct(null);
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, handleError]);

  return {
    product,
    loading,
    error,
  };
};