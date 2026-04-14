import React from 'react';
import { Carousel } from '@components/ui/Carousel';
import { Button } from '@components/ui/Button';
import { SectionHeader } from './SectionHeader';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

interface PopularBrandsSectionProps {
  brands: Brand[];
  onBrandClick?: (brand: Brand) => void;
  className?: string;
}

export const PopularBrandsSection: React.FC<PopularBrandsSectionProps> = ({
  brands,
  onBrandClick,
  className,
}) => {
  const brandCards = brands.map((brand) => (
    <div
      key={brand.id}
      onClick={() => onBrandClick?.(brand)}
      className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-16 object-contain"
        />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>

      {/* Description */}
      {brand.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {brand.description}
        </p>
      )}

      {/* CTA */}
      <Button
        variant="primary"
        size="sm"
        fullWidth
        className="text-sm"
      >
        Shop Now
      </Button>
    </div>
  ));

  return (
    <section className={`w-full ${className || ''}`}>
      <SectionHeader title="Popular Brands" />

      <Carousel
        items={brandCards}
        autoPlay={false}
        showDots={true}
        showArrows={true}
        visibleItems={4}
      />
    </section>
  );
};

PopularBrandsSection.displayName = 'PopularBrandsSection';
