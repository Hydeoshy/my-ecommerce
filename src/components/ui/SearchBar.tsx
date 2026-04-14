import React, { useState } from 'react';
import { Button } from './Button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  categories?: string[];
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onCategoryChange,
  categories = ['All Categories', 'Electronics', 'Laptops', 'Phones', 'Tablets'],
  placeholder = 'Search anything...',
  className,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    onCategoryChange?.(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 ${className || ''}`}>
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      />

      {/* Search Button */}
      <Button variant="primary" type="submit" size="md">
        🔍
      </Button>
    </form>
  );
};

SearchBar.displayName = 'SearchBar';
