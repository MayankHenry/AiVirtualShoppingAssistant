import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
}

const ProductCard = ({ id, image, title, price, originalPrice, rating, reviewCount }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (id) {
      addToCart(id);
    }
  };
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 bg-gradient-card border-border">
      <CardContent className="p-4">
        <div className="aspect-square overflow-hidden rounded-md bg-muted mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        <h3 className="font-medium text-foreground line-clamp-2 mb-2">{title}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating)
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">
            ({reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-semibold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;