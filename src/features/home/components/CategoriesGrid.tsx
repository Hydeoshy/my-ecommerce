import React from 'react';

interface Category {
  id: string;
  name: string;
  icon?: string; // emoji ou URL
  image?: string;
  link?: string;
}

interface CategoriesGridProps {
  categories: Category[];
  columns?: 3 | 4 | 6;
  onCategoryClick?: (category: Category) => void;
  className?: string;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  columns = 4,
  onCategoryClick,
  className,
}) => {
  const gridColsMap = {
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <div className={`grid ${gridColsMap[columns]} gap-4 ${className || ''}`}>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick?.(category)}
          className="bg-white rounded-lg p-4 text-center hover:shadow-md hover:scale-105 transition-all cursor-pointer border border-gray-200"
        >
          {/* Icon or Image */}
          {category.icon && (
            <div className="text-4xl mb-3 flex justify-center">{category.icon}</div>
          )}
          {category.image && !category.icon && (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover rounded mb-3"
            />
          )}

          {/* Name */}
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
            {category.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

CategoriesGrid.displayName = 'CategoriesGrid';
