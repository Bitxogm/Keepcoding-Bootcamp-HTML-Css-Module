import { useState } from 'react';
import type { ProductFilters as ProductFiltersType } from '../types/filters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Filter } from 'lucide-react';

interface Props {
  onFilterChange: (filters: ProductFiltersType) => void;
  availableTags: string[];
}

export const ProductFilters: React.FC<Props> = ({ onFilterChange, availableTags }) => {
  const [filters, setFilters] = useState<ProductFiltersType>({
    name: '',
    minPrice: 0,
    maxPrice: 10000,
    tags: [],
    isOnSale: null,
  });

  const handleChange = (field: keyof ProductFiltersType, value: ProductFiltersType[keyof ProductFiltersType]) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    handleChange('tags', newTags);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
        <CardDescription>
          Filtra los productos por diferentes criterios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Buscar por nombre</Label>
          <Input
            id="name"
            type="text"
            value={filters.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Nombre del producto..."
          />
        </div>

        <div className="space-y-2">
          <Label>Rango de precio</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', Number(e.target.value))}
              placeholder="Min"
              className="w-24"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
              placeholder="Max"
              className="w-24"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Tags</Label>
          <div className="grid grid-cols-2 gap-3">
            {availableTags.map(tag => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={filters.tags.includes(tag)}
                  onCheckedChange={() => handleTagToggle(tag)}
                />
                <Label htmlFor={tag} className="text-sm font-normal cursor-pointer">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Estado</Label>
          <RadioGroup
            value={filters.isOnSale === null ? 'all' : filters.isOnSale ? 'sale' : 'regular'}
            onValueChange={(value) => {
              const newValue = value === 'all' ? null : value === 'sale' ? true : false;
              handleChange('isOnSale', newValue);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="font-normal cursor-pointer">Todos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="sale" />
              <Label htmlFor="sale" className="font-normal cursor-pointer">Solo ofertas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="regular" />
              <Label htmlFor="regular" className="font-normal cursor-pointer">Sin ofertas</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};