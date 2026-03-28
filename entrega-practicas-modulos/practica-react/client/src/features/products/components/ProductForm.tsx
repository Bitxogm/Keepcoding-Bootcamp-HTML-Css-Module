import { useState } from 'react';
import type { PCComponent } from '../types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import * as productsService from '../services/products.service';
import { Upload, X } from 'lucide-react';

interface Props {
  onSubmit: (product: Omit<PCComponent, 'id'>) => void;
  initialData?: Partial<PCComponent>;
  submitButtonText?: string;
}

const AVAILABLE_TAGS = ["CPU", "GPU", "RAM", "SSD", "Motherboard", "PSU", "Case", "Cooler"];

export const ProductForm: React.FC<Props> = ({ 
  onSubmit, 
  initialData,
  submitButtonText = 'Crear Producto'
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price ?? '',
    tags: initialData?.tags || [] as string[],
    image: initialData?.image || '',
    isOnSale: initialData?.isOnSale || false,
    description: initialData?.description || '',
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image || null);

  // Validación: Todos los campos excepto image son requeridos
  const isFormValid = formData.name.trim() !== '' && 
                      formData.price > 0 && 
                      formData.tags.length > 0 && 
                      formData.description.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? checked 
        : type === 'number' 
          ? Number(value)
          : value,
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter((t) => t !== tag)
      : [...formData.tags, tag];
    setFormData({ ...formData, tags: newTags });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten archivos de imagen');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede superar los 5MB');
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await productsService.uploadImage(file);
      setFormData({ ...formData, image: imageUrl });
      setPreviewUrl(imageUrl);
      toast.success('Imagen subida correctamente');
    } catch (error) {
      toast.error('Error al subir la imagen'+ error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
    setPreviewUrl(null);
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Convertir price a número antes de enviar
  const dataToSubmit = {
    ...formData,
    price: Number(formData.price) || 0,
  };
  
  onSubmit(dataToSubmit);
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ej: AMD Ryzen 7 5800X"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Precio ($) *</Label>
        <Input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.10"
          placeholder="Ej: 299.99"
        />
      </div>

      <div className="space-y-3">
        <Label>Categorías *</Label>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_TAGS.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={formData.tags.includes(tag)}
                    onCheckedChange={() => handleTagToggle(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm font-normal cursor-pointer">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <Label>Imagen (Opcional)</Label>
        
        {previewUrl ? (
          <div className="space-y-3">
            <div className="relative w-full max-w-sm">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <div className="space-y-2">
              <Label 
                htmlFor="image-upload" 
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
              >
                Click para subir una imagen
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF hasta 5MB
              </p>
            </div>
            {uploading && <p className="text-sm mt-2">Subiendo...</p>}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe las características del producto..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isOnSale"
          checked={formData.isOnSale}
          onCheckedChange={(checked) => 
            setFormData({ ...formData, isOnSale: checked as boolean })
          }
        />
        <Label htmlFor="isOnSale" className="text-sm font-normal cursor-pointer">
          Este producto está en oferta
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={uploading || !isFormValid}>
        {submitButtonText}
      </Button>
    </form>
  );
};