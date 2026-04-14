import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { CategoriesGrid } from './components/CategoriesGrid';
import { ProductCarousel } from './components/ProductCarousel';
import { BestDealsSection } from './components/BestDealsSection';
import { BestSellerSection } from './components/BestSellerSection';
import { PopularBrandsSection } from './components/PopularBrandsSection';
import { SuggestTodaySection } from './components/SuggestTodaySection';
import { BlogSection } from './components/BlogSection';
import { Testimonial, TestimonialData } from './components/Testimonial';
import { NewsletterSignup, TrustSignals } from '@features/shared/components';

// Mock data - replace with API calls
const mockHeroBanners = [
  {
    id: '1',
    image: 'https://via.placeholder.com/1200x400?text=Hero+Banner+1',
    title: 'Special Get 10% Discount',
    description: 'For your first order',
    ctaText: 'Shop Now',
    ctaLink: '/products',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/1200x400?text=Hero+Banner+2',
    title: 'Latest Electronics',
    description: 'Explore our new collection',
    ctaText: 'Discover Now',
    ctaLink: '/products',
  },
];

const mockCategories = [
  { id: '1', name: 'Gaming', icon: '🎮' },
  { id: '2', name: 'Sport', icon: '⚽' },
  { id: '3', name: 'Kitchen', icon: '🍳' },
  { id: '4', name: 'Robot', icon: '🤖' },
  { id: '5', name: 'Mobiles', icon: '📱' },
  { id: '6', name: 'Office', icon: '💼' },
  { id: '7', name: 'Cameras', icon: '📷' },
  { id: '8', name: 'Computers', icon: '💻' },
  { id: '9', name: 'TV', icon: '📺' },
  { id: '10', name: 'Audios', icon: '🎵' },
  { id: '11', name: 'Fashion', icon: '👔' },
  { id: '12', name: 'Books', icon: '📚' },
];

const mockProducts = [
  {
    id: '1',
    image: 'https://via.placeholder.com/300x300?text=Product+1',
    name: 'Smart TV 55 inch',
    price: 499.99,
    originalPrice: 699.99,
    discount: 28,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    onAddToCart: () => console.log('Add to cart'),
    onViewDetails: () => console.log('View details'),
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/300x300?text=Product+2',
    name: 'Wireless Headphones',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    onAddToCart: () => console.log('Add to cart'),
    onViewDetails: () => console.log('View details'),
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/300x300?text=Product+3',
    name: 'Smartphone Pro',
    price: 899.99,
    originalPrice: 1199.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    onAddToCart: () => console.log('Add to cart'),
    onViewDetails: () => console.log('View details'),
  },
  {
    id: '4',
    image: 'https://via.placeholder.com/300x300?text=Product+4',
    name: 'Laptop 15 inch',
    price: 1299.99,
    originalPrice: 1799.99,
    discount: 27,
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    onAddToCart: () => console.log('Add to cart'),
    onViewDetails: () => console.log('View details'),
  },
  {
    id: '5',
    image: 'https://via.placeholder.com/300x300?text=Product+5',
    name: 'Camera DSLR',
    price: 799.99,
    originalPrice: 999.99,
    discount: 20,
    rating: 4.9,
    reviewCount: 98,
    inStock: true,
    onAddToCart: () => console.log('Add to cart'),
    onViewDetails: () => console.log('View details'),
  },
  {
    id: '6',
    image: 'https://via.placeholder.com/300x300?text=Product+6',
    name: 'Robot Vacuum',
    price: 349.99,
    originalPrice: 499.99,
    discount: 30,
    rating: 4.4,
    reviewCount: 156,
    inStock: false,
    onAddToCart: () => console.log('Add to cart'),
    onViewDetails: () => console.log('View details'),
  },
];

const mockBrands = [
  {
    id: '1',
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/150x80?text=TechCorp',
    description: 'Leading electronics brand',
  },
  {
    id: '2',
    name: 'ElectroHub',
    logo: 'https://via.placeholder.com/150x80?text=ElectroHub',
    description: 'Best quality products',
  },
  {
    id: '3',
    name: 'ProGear',
    logo: 'https://via.placeholder.com/150x80?text=ProGear',
    description: 'Professional equipment',
  },
  {
    id: '4',
    name: 'InnovateTech',
    logo: 'https://via.placeholder.com/150x80?text=InnovateTech',
    description: 'Innovation first',
  },
];

const mockArticles = [
  {
    id: '1',
    image: 'https://via.placeholder.com/400x250?text=Article+1',
    title: 'How to choose the perfect smartphone',
    date: '2 days ago',
    category: 'Technology',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/400x250?text=Article+2',
    title: 'Gaming setups for professionals',
    date: '1 day ago',
    category: 'Gaming',
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/400x250?text=Article+3',
    title: '5 must-have gadgets in 2024',
    date: '3 hours ago',
    category: 'Gadgets',
  },
];

const mockTestimonials: TestimonialData[] = [
  {
    id: '1',
    author: 'John Smith',
    location: 'New York, USA',
    rating: 5,
    text: 'Excellent product quality and super fast shipping. Highly recommended!',
    productName: 'Smart TV 55 inch',
    verified: true,
  },
  {
    id: '2',
    author: 'Maria Garcia',
    location: 'Los Angeles, USA',
    rating: 4,
    text: 'Great customer service and amazing discounts. Will buy again!',
    productName: 'Wireless Headphones',
    verified: true,
  },
  {
    id: '3',
    author: 'David Chen',
    location: 'San Francisco, USA',
    rating: 5,
    text: 'Best online store ever. Products exactly as described.',
    productName: 'Laptop 15 inch',
    verified: true,
  },
];

export const Home: React.FC = () => {
  const dealExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroBanner items={mockHeroBanners} height="lg" />
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <CategoriesGrid
            categories={mockCategories}
            columns={6}
            onCategoryClick={(cat) => console.log('Category clicked:', cat.name)}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel
            products={mockProducts}
            title="Featured Products"
            visibleItems={4}
            onViewAll={() => console.log('View all featured')}
          />
        </div>
      </section>

      {/* Best Weekly Deals */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BestDealsSection
            products={mockProducts}
            expiresAt={dealExpires}
            onViewAll={() => console.log('View all deals')}
          />
        </div>
      </section>

      {/* Best Seller */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BestSellerSection
            products={mockProducts}
            onViewAll={() => console.log('View all sellers')}
          />
        </div>
      </section>

      {/* Popular Brands */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PopularBrandsSection
            brands={mockBrands}
            onBrandClick={(brand) => console.log('Brand clicked:', brand.name)}
          />
        </div>
      </section>

      {/* Suggest Today */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuggestTodaySection
            products={mockProducts}
            onFilterSelect={(filter) => console.log('Filter selected:', filter)}
          />
        </div>
      </section>

      {/* Blog + Testimonials */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Section */}
            <div className="lg:col-span-2">
              <BlogSection
                articles={mockArticles}
                onViewAll={() => console.log('View all articles')}
              />
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              <div className="flex flex-col gap-4">
                {mockTestimonials.map((testimonial) => (
                  <Testimonial key={testimonial.id} {...testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup
            onSubscribe={(email) => console.log('Subscribe:', email)}
          />
        </div>
      </div>

      {/* Trust Signals */}
      <div className="w-full py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustSignals />
        </div>
      </div>
    </div>
  );
};

Home.displayName = 'Home';
