import { CheckCircle, XCircle } from 'lucide-react';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge 
          variant={product.inStock ? "default" : "secondary"}
          className="absolute top-3 left-3"
        >
          {product.inStock ? (
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> В наличии
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <XCircle className="w-3 h-3" /> Под заказ
            </span>
          )}
        </Badge>
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {product.price.toLocaleString('ru-RU')} ₽/м²
        </Badge>
      </div>
      
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Класс {product.wearClass}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.thickness} мм
          </Badge>
          {product.waterResistant && (
            <Badge variant="outline" className="text-xs text-primary border-primary">
              Влагостойкий
            </Badge>
          )}
        </div>
        
        <button className="w-full btn-primary text-sm py-2">
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
