export type ProductFilters = {
  name: string;
  minPrice: number;
  maxPrice: number;
  tags: string[];
  isOnSale: boolean | null; // null = todos, true = solo ofertas, false = sin ofertas
};
