import React from 'react';
import { Carousel } from '@components/ui/Carousel';
import { Button } from '@components/ui/Button';

interface HeroBannerItem {
  id: string;
  image: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroBannerProps {
  items: HeroBannerItem[];
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  items,
  height = 'lg',
  className,
}) => {
  const heightClasses = {
    sm: 'h-48',
    md: 'h-80',
    lg: 'h-96',
  };

  const handleCTA = (link?: string) => {
    if (link) {
      window.location.href = link;
    }
  };

  const carouselItems = items.map((item) => (
    <div
      key={item.id}
      className={`relative w-full bg-cover bg-center ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
      style={{ backgroundImage: `url(${item.image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h2>
        {item.description && (
          <p className="text-lg md:text-xl mb-6 opacity-90">{item.description}</p>
        )}
        {item.ctaText && (
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleCTA(item.ctaLink)}
            className="text-gray-900"
          >
            {item.ctaText}
          </Button>
        )}
      </div>
    </div>
  ));

  return (
    <div className={`w-full ${className || ''}`}>
      <Carousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={6000}
        showDots={true}
        showArrows={true}
      />
    </div>
  );
};

HeroBanner.displayName = 'HeroBanner';
