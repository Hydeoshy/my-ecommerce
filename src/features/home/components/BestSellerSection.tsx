import React, { useState } from 'react';
import { ProductCard, ProductCardProps } from '@components/ui/ProductCard';
import { SectionHeader } from './SectionHeader';

interface BestSellerSectionProps {
  products: ProductCardProps[];
  categories?: string[];
  title?: string;
  onViewAll?: () => void;
  onCategorySelect?: (category: string) => void;
  className?: string;
}

export const BestSellerSection: React.FC<BestSellerSectionProps> = ({
  products,
  categories = ['View All', 'Top 30', 'Televisions', 'PC Gaming', 'Cameras'],
  title = 'Best Seller',
  onViewAll,
  onCategorySelect,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect?.(category);
  };

  return (
    <section className={`w-full ${className || ''}`}>
      {/* Header */}
      <SectionHeader
        title={title}
        viewAllText="View All"
        onViewAll={onViewAll}
      />

      {/* Category Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

BestSellerSection.displayName = 'BestSellerSection';
