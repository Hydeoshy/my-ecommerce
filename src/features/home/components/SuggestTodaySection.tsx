import React, { useState } from 'react';
import { ProductCard, ProductCardProps } from '@components/ui/ProductCard';
import { SectionHeader } from './SectionHeader';

interface SuggestTodaySectionProps {
  products: ProductCardProps[];
  filters?: string[];
  onFilterSelect?: (filter: string) => void;
  className?: string;
}

export const SuggestTodaySection: React.FC<SuggestTodaySectionProps> = ({
  products,
  filters = [
    'Recommend For You',
    'Top Best Seller',
    'Top Rated',
    '70% OFF',
    '50% OFF',
    '30% OFF',
  ],
  onFilterSelect,
  className,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    onFilterSelect?.(filter);
  };

  return (
    <section className={`w-full ${className || ''}`}>
      <SectionHeader title="Suggest Today" />

      {/* Filter Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterSelect(filter)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition ${
              selectedFilter === filter
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.slice(0, 10).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

SuggestTodaySection.displayName = 'SuggestTodaySection';
