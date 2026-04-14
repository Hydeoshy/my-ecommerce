import React from 'react';
import { Carousel } from '@components/ui/Carousel';
import { ProductCard, ProductCardProps } from '@components/ui/ProductCard';

interface ProductCarouselProps {
  products: ProductCardProps[];
  title?: string;
  title_variant?: 'h2' | 'h3';
  visibleItems?: 4 | 3 | 2 | 1;
  onViewAll?: () => void;
  className?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
  title_variant = 'h2',
  visibleItems = 4,
  onViewAll,
  className,
}) => {
  const carouselItems = products.map((product) => (
    <div key={product.id} className="px-2">
      <ProductCard {...product} />
    </div>
  ));

  const TitleTag = title_variant === 'h3' ? 'h3' : 'h2';

  return (
    <section className={`w-full ${className || ''}`}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <TitleTag className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </TitleTag>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-yellow-400 hover:text-yellow-500 font-semibold text-sm md:text-base"
            >
              View All →
            </button>
          )}
        </div>
      )}

      {/* Carousel */}
      <Carousel
        items={carouselItems}
        autoPlay={false}
        showDots={false}
        showArrows={true}
        visibleItems={visibleItems}
      />
    </section>
  );
};

ProductCarousel.displayName = 'ProductCarousel';
