export type PCComponent = {
  id?: number;
  name: string;
  price: number;
  tags: string[];
  image?: string;
  isOnSale: boolean;
  description: string;
  userId?: number;
  createdAt?: string;
};