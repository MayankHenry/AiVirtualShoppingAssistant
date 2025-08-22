import { Search, ShoppingCart, Menu, User, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { user, signOut } = useAuth();
  const { itemCount } = useLocalCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleAccountClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="bg-background shadow-header border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer hover:scale-105 transition-transform" 
              onClick={() => navigate('/')}
            >
              ShopAssist
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for products with AI assistance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-border focus:ring-primary focus:border-primary transition-all focus:scale-[1.02]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </form>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="hover:scale-105 transition-transform"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAccountClick}
              className="hover:scale-105 transition-transform"
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:scale-105 transition-transform"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;