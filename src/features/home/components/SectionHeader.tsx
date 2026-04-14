import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllText?: string;
  onViewAll?: () => void;
  className?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  viewAllText = 'View All',
  onViewAll,
  className,
  centered = false,
}) => {
  return (
    <div
      className={`flex items-start justify-between mb-6 ${
        centered ? 'flex-col gap-3' : ''
      } ${className || ''}`}
    >
      <div className={centered ? 'text-center w-full' : ''}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
        )}
      </div>

      {onViewAll && (
        <button
          onClick={onViewAll}
          className="text-yellow-400 hover:text-yellow-500 font-semibold text-sm md:text-base whitespace-nowrap ml-4 md:ml-0"
        >
          {viewAllText} →
        </button>
      )}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
