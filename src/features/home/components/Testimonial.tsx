import React from 'react';
import { Rating } from '@components/ui/Rating';

export interface TestimonialData {
  id: string;
  author: string;
  location: string;
  avatar?: string;
  rating: number;
  text: string;
  productName?: string;
  verified?: boolean;
}

interface TestimonialProps extends TestimonialData {
  className?: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  author,
  location,
  avatar,
  rating,
  text,
  productName,
  verified,
  className,
}) => {
  return (
    <div className={`bg-white rounded-lg p-4 border border-gray-200 ${className || ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          {avatar && (
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 text-sm">{author}</h4>
              {verified && (
                <span className="text-yellow-400 text-xs">✓</span>
              )}
            </div>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <Rating value={rating} readonly count={undefined} />
      </div>

      {/* Text */}
      <p className="text-sm text-gray-700 line-clamp-3 mb-3">{text}</p>

      {/* Product */}
      {productName && (
        <p className="text-xs text-yellow-400 hover:text-yellow-500 cursor-pointer font-medium">
          → {productName}
        </p>
      )}
    </div>
  );
};

Testimonial.displayName = 'Testimonial';
