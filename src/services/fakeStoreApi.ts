// FakeStore API service for fetching products
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const FAKESTORE_API_URL = import.meta.env.VITE_FAKESTORE_API_URL || 'https://fakestoreapi.com';

export const fakeStoreApi = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${FAKESTORE_API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get single product
  getProduct: async (id: number): Promise<Product | null> => {
    try {
      const response = await fetch(`${FAKESTORE_API_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch(`${FAKESTORE_API_URL}/products/category/${category}`);
      if (!response.ok) throw new Error('Failed to fetch products by category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${FAKESTORE_API_URL}/products/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const allProducts = await fakeStoreApi.getAllProducts();
      return allProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};