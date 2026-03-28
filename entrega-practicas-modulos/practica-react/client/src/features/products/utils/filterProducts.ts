import type { PCComponent } from '../types/product';
import type { ProductFilters } from '../types/filters';

export const filterProducts = (
  products: PCComponent[],
  filters: ProductFilters
): PCComponent[] => {
  return products.filter(product => {
    // Filtro por nombre
    if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Filtro por precio
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    // Filtro por tags
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => product.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Filtro por ofertas
    if (filters.isOnSale !== null && product.isOnSale !== filters.isOnSale) {
      return false;
    }

    return true;
  });
};