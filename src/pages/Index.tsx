import { useEffect, useState } from "react";
import { MessageSquare, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ChatInterface from "@/components/ChatInterface";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-image.jpg";
import productPhone from "@/assets/product-phone.jpg";
import productHeadphones from "@/assets/product-headphones.jpg";
import productOfficeChair from "/lovable-uploads/c14ed6f6-a0b8-4b1d-a0c8-6477a3e756eb.png";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);

  const handleGetStarted = () => {
    if (user) {
      // Scroll to chat section
      document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/auth');
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .limit(3);
        
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const featuredProducts = [
    {
      image: productPhone,
      title: "Premium Smartphone - Latest Model with Advanced Camera",
      price: "$899.99",
      originalPrice: "$1,199.99",
      rating: 4.8,
      reviewCount: 1247,
    },
    {
      image: productHeadphones,
      title: "Wireless Noise-Cancelling Headphones",
      price: "$299.99",
      originalPrice: "$399.99",
      rating: 4.6,
      reviewCount: 892,
    },
    {
      image: productOfficeChair,
      title: "Premium Ergonomic Office Chair - Professional Comfort",
      price: "$799.99",
      originalPrice: "$999.99",
      rating: 4.7,
      reviewCount: 324,
    },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Smart Conversations",
      description: "Chat naturally with our AI to find exactly what you need"
    },
    {
      icon: Sparkles,
      title: "Personalized Recommendations",
      description: "Get suggestions tailored to your style, budget, and preferences"
    },
    {
      icon: ShoppingBag,
      title: "Seamless Shopping",
      description: "From discovery to purchase, enjoy a smooth shopping experience"
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "Discover trends and get insights on the best deals and products"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Your AI Shopping
                <span className="text-primary block">Assistant</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Discover products that match your style and budget through intelligent conversations. 
                Let our AI help you shop smarter, not harder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="cart" onClick={handleGetStarted}>
                  Start Shopping Now
                </Button>
                <Button size="lg" variant="outline" onClick={handleLearnMore}>
                  See How It Works
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="AI Shopping Assistant Interface"
                className="rounded-lg shadow-card w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Our AI Assistant?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of online shopping with personalized recommendations and smart insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat & Products Section */}
      <section id="chat-section" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chat Interface */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Try Our AI Assistant
              </h2>
              <p className="text-muted-foreground mb-6">
                Start a conversation with our AI to get personalized product recommendations.
              </p>
              <ChatInterface />
            </div>
            
            {/* Featured Products */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Featured Products
              </h2>
              <p className="text-muted-foreground mb-6">
                Popular items recommended by our AI based on current trends.
              </p>
              <div className="space-y-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image_url}
                      title={product.name}
                      price={`$${product.price}`}
                      originalPrice={product.original_price ? `$${product.original_price}` : undefined}
                      rating={product.rating || 0}
                      reviewCount={product.review_count || 0}
                    />
                  ))
                ) : (
                  // Fallback to static products if none loaded
                  featuredProducts.map((product, index) => (
                    <ProductCard key={index} {...product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied customers who shop smarter with AI assistance.
          </p>
          <Button size="lg" variant="cart" className="text-lg px-8 py-3" onClick={handleGetStarted}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">ShopAssist</h3>
            <p className="text-muted-foreground">
              Your intelligent shopping companion powered by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;