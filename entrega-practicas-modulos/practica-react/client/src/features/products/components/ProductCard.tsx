import { Link } from 'react-router-dom';
import type { PCComponent } from '../types/product';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Tag, ImageOff } from 'lucide-react';

interface Props {
  product: PCComponent;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      {product.image ? (
        <div className="w-full h-48 overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center">
          <ImageOff className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription className="mt-2">
              {product.description}
            </CardDescription>
          </div>
          {product.isOnSale && (
            <Badge variant="destructive">Oferta</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">${product.price}</p>
          
          <div className="flex flex-wrap gap-1 items-center">
            <Tag className="h-3 w-3 text-muted-foreground" />
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/products/${product.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver detalle
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};