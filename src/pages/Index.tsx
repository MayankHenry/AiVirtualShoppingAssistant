import { useEffect, useState } from "react";
import { MessageSquare, ShoppingBag, Sparkles, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ChatInterface from "@/components/ChatInterface";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fakeStoreApi, Product } from "@/services/fakeStoreApi";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      try {
        const [allProducts, allCategories] = await Promise.all([
          fakeStoreApi.getAllProducts(),
          fakeStoreApi.getCategories()
        ]);
        
        setProducts(allProducts);
        setCategories(allCategories);
        setFilteredProducts(allProducts);

        // Handle search from URL params
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
          const searchResults = await fakeStoreApi.searchProducts(searchQuery);
          setFilteredProducts(searchResults);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  useEffect(() => {
    // Filter products based on selected category
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);
  const searchQuery = searchParams.get('search');
  const isSearchResults = Boolean(searchQuery);
  const displayProducts = filteredProducts.slice(0, isSearchResults ? 12 : 8);

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

      {/* Search Results or Products Section */}
      <section id="products-section" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSearchResults ? (
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-muted-foreground mb-8">
                Found {filteredProducts.length} products matching your search
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
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
              
              {/* Quick Stats */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Discover Products
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{products.length}</div>
                      <div className="text-sm text-muted-foreground">Products Available</div>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{categories.length}</div>
                      <div className="text-sm text-muted-foreground">Categories</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex items-center gap-4 mb-8">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-6 bg-muted rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
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