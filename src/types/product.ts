/**
 * Product Domain Types
 * Core entities for e-commerce product management
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number; // percentage
  rating: number; // 0-5
  reviewCount: number;
  inStock: boolean;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  sku?: string;
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface ProductDetailResponse extends Product {
  reviews?: Review[];
  relatedProducts?: Product[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: Category[];
}
