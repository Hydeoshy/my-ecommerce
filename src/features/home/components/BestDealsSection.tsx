import React from 'react';
import { CountdownTimer } from '@components/ui/CountdownTimer';
import { ProductCard, ProductCardProps } from '@components/ui/ProductCard';

interface BestDealsSectionProps {
  products: ProductCardProps[];
  expiresAt: Date | string | number;
  title?: string;
  onViewAll?: () => void;
  className?: string;
}

export const BestDealsSection: React.FC<BestDealsSectionProps> = ({
  products,
  expiresAt,
  title = 'Best Weekly Deals',
  onViewAll,
  className,
}) => {
  return (
    <section className={`w-full ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-yellow-400 hover:text-yellow-500 font-semibold text-sm md:text-base"
          >
            See All Products →
          </button>
        )}
      </div>

      {/* Timer */}
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg flex justify-center">
        <div>
          <p className="text-center text-gray-600 text-sm font-medium mb-3">
            Expires in:
          </p>
          <CountdownTimer expiresAt={expiresAt} />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

BestDealsSection.displayName = 'BestDealsSection';
