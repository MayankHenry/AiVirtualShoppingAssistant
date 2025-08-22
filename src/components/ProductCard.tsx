import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useNavigate } from "react-router-dom";
import { Product } from "@/services/fakeStoreApi";

interface ProductCardProps {
  product?: Product;
  // Legacy props for backward compatibility
  id?: string | number;
  image?: string;
  title?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
}

const ProductCard = ({ 
  product,
  id,
  image, 
  title, 
  price, 
  originalPrice, 
  rating, 
  reviewCount 
}: ProductCardProps) => {
  const { user } = useAuth();
  const { addToCart } = useLocalCart();
  const navigate = useNavigate();

  // Use product data if available, otherwise use legacy props
  const productData = product || {
    id: Number(id) || 0,
    title: title || '',
    price: parseFloat(price?.replace('$', '') || '0'),
    image: image || '',
    rating: { rate: rating || 0, count: reviewCount || 0 },
    description: '',
    category: ''
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    } else {
      // For legacy compatibility, create a Product object
      const legacyProduct: Product = {
        id: Number(id) || 0,
        title: title || '',
        price: parseFloat(price?.replace('$', '') || '0'),
        image: image || '',
        rating: { rate: rating || 0, count: reviewCount || 0 },
        description: '',
        category: ''
      };
      addToCart(legacyProduct);
    }
  };

  return (
    <Card className="bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <CardContent className="p-6">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted group-hover:scale-105 transition-transform">
          <img
            src={productData.image}
            alt={productData.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {productData.title}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors ${
                    i < Math.floor(productData.rating?.rate || rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({(productData.rating?.count || reviewCount || 0).toLocaleString()})
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${productData.price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            className="w-full hover:scale-105 transition-transform" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;