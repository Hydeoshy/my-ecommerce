import React from 'react';

interface RatingProps {
  value: number; // 0-5
  count?: number; // number of reviews
  readonly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  count,
  readonly = true,
  onChange,
  className,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      <div className="flex gap-0.5">
        {stars.map((star) => (
          <button
            key={star}
            onClick={() => !readonly && onChange?.(star)}
            disabled={readonly}
            aria-label={`Rate ${star} out of 5`}
            className={`text-lg transition-colors ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:text-yellow-400'
            }`}
          >
            {star <= value ? '⭐' : '☆'}
          </button>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-sm text-gray-600">({count})</span>
      )}
    </div>
  );
};

Rating.displayName = 'Rating';
