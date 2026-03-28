
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { filterProducts } from '../utils/filterProducts';
import type { ProductFilters as Filters } from '../types/filters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CustomPagination } from '@/core/components/CustomPagination';
import { Spinner } from '@/core/components/Spinner';

const AVAILABLE_TAGS = ["CPU", "GPU", "RAM", "SSD", "Motherboard", "PSU", "Case", "Cooler"];
const ITEMS_PER_PAGE = 6;

export const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    name: '',
    minPrice: 0,
    maxPrice: 10000,
    tags: [],
    isOnSale: null,
  });

  // Leer página de la URL (default: 1)
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const filteredProducts = filterProducts(products, filters);

  // Calcular paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Actualizar página en la URL
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  // Reset página cuando cambian los filtros
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setSearchParams({ page: '1' });
  };

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div className="text-center py-12 text-destructive">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Componentes PC</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tu inventario de componentes
          </p>
        </div>
        <Link to="/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <ProductFilters
        onFilterChange={handleFilterChange}
        availableTags={AVAILABLE_TAGS}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
          {filteredProducts.length !== products.length && ` (${products.length} totales)`}
        </p>
        <p className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground">
            {products.length === 0 
              ? "No hay productos disponibles." 
              : "No se encontraron productos con los filtros seleccionados."}
          </p>
          {products.length === 0 && (
            <Link to="/products/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear primer producto
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <CustomPagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;