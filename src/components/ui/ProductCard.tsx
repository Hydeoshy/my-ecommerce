import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Rating } from './Rating';

export interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  onAddToCart: () => void;
  onViewDetails: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  inStock,
  onAddToCart,
  onViewDetails,
  className,
}) => {
  return (
    <Card hover className={`p-4 overflow-hidden ${className || ''}`}>
      {/* Image Container */}
      <div className="relative mb-4 h-40 overflow-hidden rounded bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {discount && (
          <div className="absolute top-2 right-2">
            <Badge variant="danger">{discount}% OFF</Badge>
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-base mb-2 line-clamp-2 text-gray-900 hover:text-yellow-400 transition-colors cursor-pointer" onClick={onViewDetails}>
        {name}
      </h3>

      {/* Rating */}
      <div className="mb-3 flex items-center gap-1">
        <Rating value={rating} readonly count={reviewCount} />
      </div>

      {/* Price Section */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg font-bold text-yellow-400">${price}</span>
        {originalPrice && (
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="md"
          fullWidth
          disabled={!inStock}
          onClick={onAddToCart}
          className="text-sm"
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onViewDetails}
          className="text-sm"
        >
          View
        </Button>
      </div>
    </Card>
  );
};

ProductCard.displayName = 'ProductCard';
