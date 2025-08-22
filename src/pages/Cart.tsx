import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocalCart } from '@/hooks/useLocalCart';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Cart = () => {
  const { items, totalPrice, updateQuantity, removeFromCart } = useLocalCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Button onClick={() => navigate('/')} className="hover:scale-105 transition-transform">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {item.product.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {item.product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">
                      {totalPrice > 50 ? 'Free' : '$9.99'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (estimated)</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>
                        ${(totalPrice + (totalPrice > 50 ? 0 : 9.99) + totalPrice * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {totalPrice <= 50 && (
                  <div className="bg-muted/50 p-3 rounded-lg mb-4 text-sm">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                  </div>
                )}

                <Button 
                  size="lg" 
                  className="w-full hover:scale-[1.02] transition-transform" 
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full mt-3 hover:bg-muted transition-colors" 
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;