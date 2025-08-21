# ShopAssist - AI Shopping Assistant

A modern, intelligent shopping platform powered by AI that helps users discover and purchase products through natural conversation and smart recommendations.

## 🚀 Features

- **AI-Powered Chat Assistant**: Natural language product search and recommendations using OpenRouter API
- **User Authentication**: Secure signup/signin with Supabase Auth
- **Product Management**: Dynamic product catalog with real-time inventory
- **Shopping Cart**: Full cart functionality with persistent state
- **Responsive Design**: Beautiful, modern UI with light blue theme
- **Real-time Updates**: Live product data and cart synchronization

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **AI Integration**: OpenRouter API with Claude 3.5 Sonnet
- **State Management**: React Context API
- **Routing**: React Router DOM

## 📋 Prerequisites

Before setting up the project, ensure you have:

- Node.js 18+ installed
- A Supabase account and project
- OpenRouter API account and key

## ⚙️ API Configuration

### 1. Supabase Setup

This project is already connected to Supabase. The database includes:

- **profiles**: User profile information with auto-creation on signup
- **products**: Product catalog with pricing, ratings, and inventory
- **cart_items**: Shopping cart functionality with user isolation

**Database Features**:
- Row Level Security (RLS) enabled on all tables
- Automatic profile creation on user registration
- Real-time cart synchronization
- Secure user data isolation

### 2. OpenRouter API Integration

The AI chat functionality uses OpenRouter API to provide intelligent shopping assistance.

**Required Secret**: `OPENROUTER_API_KEY` (Already configured)

**Setup Steps**:
1. Sign up at [OpenRouter](https://openrouter.ai)
2. Generate an API key from your dashboard
3. The API key is stored securely in Supabase Edge Function secrets
4. The chat uses Claude 3.5 Sonnet model for high-quality responses

**AI Features**:
- Natural language product search
- Personalized recommendations
- Context-aware conversations
- Product comparison and advice

### 3. Storefront API (Ready for Integration)

The project architecture supports external storefront APIs:

**Supported Integrations**:
- Shopify Storefront API
- WooCommerce REST API
- Stripe Products API
- Custom REST APIs

**Integration Points**:
- Product synchronization hooks
- Inventory management
- Price updates
- Order processing workflows

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── Header.tsx      # Navigation with auth & cart
│   ├── ProductCard.tsx # Product display with cart integration
│   └── ChatInterface.tsx # AI chat with OpenRouter
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx     # Authentication & user management
│   └── useCart.tsx     # Cart state & operations
├── pages/              # Route components
│   ├── Index.tsx       # Homepage with products & chat
│   ├── Auth.tsx        # Login/Signup with form validation
│   └── NotFound.tsx    # 404 error page
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client & type definitions
└── assets/             # Static assets & images
```

### Backend Architecture (Supabase)
```
Database Tables:
├── profiles (RLS)      # Extended user information
├── products (RLS)      # Product catalog & inventory
└── cart_items (RLS)    # User shopping carts

Edge Functions:
└── chat-ai            # AI conversation processing

Authentication:
├── Email/Password      # Primary authentication method
├── Profile Auto-Creation # Automatic user profiles
└── Session Management  # Persistent login state
```

## 🔐 Security Features

- **Row Level Security**: All tables protected with RLS policies
- **User Data Isolation**: Users access only their own data
- **Secure Functions**: Edge functions use security definer patterns
- **Authentication Gates**: Shopping requires user login
- **API Key Protection**: Secrets stored securely in Supabase
- **SQL Injection Prevention**: Parameterized queries throughout

## 🎨 Design System

**Color Scheme**: Modern light blue theme
- Primary: `hsl(200, 90%, 60%)` - Light blue
- Secondary: Neutral grays and whites
- Accents: Complementary blues and teals

**Components**:
- shadcn/ui component library
- Consistent button variants
- Responsive card layouts
- Smooth animations and transitions

**Typography**:
- Clear hierarchy with semantic HTML
- Readable fonts optimized for web
- Proper contrast ratios for accessibility

## 🚀 Getting Started

### Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd shopassist
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Application**
   ```
   http://localhost:5173
   ```

### User Journey

1. **Browse**: Explore featured products on homepage
2. **Chat**: Ask AI assistant for recommendations
3. **Sign Up**: Create account for cart access
4. **Shop**: Add products to cart and manage quantities
5. **Personalize**: Get tailored recommendations

## 📱 Usage Guide

### For Shoppers

- **Product Discovery**: Browse categories or use AI chat
- **Natural Search**: "Find me wireless headphones under $300"
- **Cart Management**: Add, remove, and update quantities
- **Account Features**: Secure login with persistent cart

### For Store Owners

- **Product Management**: Add products via Supabase dashboard
- **Analytics**: Monitor user engagement and cart metrics
- **AI Customization**: Adjust chat behavior and responses
- **Inventory Tracking**: Real-time stock management

## 🧪 Testing Checklist

### Core Functionality
- [ ] User registration with email verification
- [ ] Login/logout with session persistence
- [ ] AI chat with contextual responses
- [ ] Product browsing and search
- [ ] Cart operations (add/remove/update)
- [ ] Mobile responsive design
- [ ] Error handling and user feedback

### Security Verification
- [ ] RLS policies prevent data leaks
- [ ] Unauthenticated users can't access cart
- [ ] API keys are not exposed in client code
- [ ] User sessions expire appropriately

## 📊 Performance Features

- **Optimized Loading**: Code splitting and lazy loading
- **Image Optimization**: WebP formats and proper sizing
- **Database Efficiency**: Indexed queries and RLS optimization  
- **Caching Strategy**: Supabase query caching
- **Bundle Size**: Tree-shaking for minimal JavaScript

## 🔧 Configuration Options

### Theme Customization
Modify `src/index.css` for color scheme changes:
```css
--primary: 200 90% 60%; /* Light blue theme */
```

### AI Behavior
Update system prompts in `supabase/functions/chat-ai/index.ts`:
```typescript
const systemPrompt = `Your custom AI assistant behavior...`;
```

### Product Categories
Extend database schema for new product types:
```sql
ALTER TABLE products ADD COLUMN new_category TEXT;
```

## 🚀 Deployment

### Recommended Platforms
- **Vercel**: Automatic deployments with Git integration
- **Netlify**: JAMstack hosting with form handling
- **Railway**: Full-stack deployment with databases

### Deployment Steps
1. **Build**: `npm run build`
2. **Deploy**: Upload `dist` folder to hosting platform
3. **Configure**: Set up custom domain and SSL
4. **Monitor**: Set up analytics and error tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Follow coding standards and add tests
4. Commit with descriptive messages
5. Open Pull Request with detailed description

## 📞 Support & Resources

- **Documentation**: Comprehensive inline code comments
- **Supabase Dashboard**: Database management and monitoring
- **OpenRouter Console**: AI usage analytics and billing
- **GitHub Issues**: Bug reports and feature requests

## 📄 Project Links

- **Lovable Project**: https://lovable.dev/projects/d681cf5e-e5c6-42a2-a6f3-e96a7a765680
- **Supabase Dashboard**: Connected project with full backend
- **Live Preview**: Available through Lovable platform

## 🙏 Acknowledgments

- **Supabase**: Backend infrastructure and authentication
- **OpenRouter**: AI API access and Claude integration
- **shadcn/ui**: Beautiful, accessible component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lovable**: Development platform and deployment tools

---

**Built with ❤️ using modern web technologies and AI**
