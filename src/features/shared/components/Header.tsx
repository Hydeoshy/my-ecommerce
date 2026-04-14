import React from 'react';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

export const Header: React.FC<{
  onCart?: () => void;
  onLogin?: () => void;
  onSearch?: (query: string) => void;
}> = ({ onCart, onLogin, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 text-xs text-gray-600 flex justify-between">
        <div className="flex gap-4">
          <span>Hotline 24/7: (025) 3886 25 16</span>
          <span>•</span>
          <a href="#" className="hover:text-yellow-400">
            Sell on SWOO
          </a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-400">
            Order Tracking
          </a>
          <span>•</span>
          <select className="bg-transparent text-gray-600 hover:text-gray-900">
            <option>USD</option>
          </select>
          <span>•</span>
          <select className="bg-transparent text-gray-600 hover:text-gray-900">
            <option>Eng</option>
          </select>
        </div>
      </div>

      {/* Main header */}
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-yellow-400">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900">
            ✓
          </div>
          <span>SWOO</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-yellow-400">
            HOMES
          </a>
          <a href="#" className="hover:text-yellow-400">
            PAGES
          </a>
          <a href="#" className="hover:text-yellow-400">
            PRODUCTS
          </a>
          <a href="#" className="hover:text-yellow-400">
            CONTACT
          </a>
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs">
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm"
            />
            <Button variant="primary" size="md" type="submit" className="text-sm">
              🔍
            </Button>
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end text-xs">
            <span className="text-gray-600">Welcome</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogin}
              className="mt-1"
            >
              Login / Register
            </Button>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={onCart}
            className="text-sm"
          >
            🛒 Cart
          </Button>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-yellow-400 text-gray-900 px-4 py-3 flex items-center gap-4 overflow-x-auto">
        <select className="bg-yellow-500 text-gray-900 border border-yellow-600 px-3 py-2 rounded text-sm font-medium">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Laptops</option>
          <option>Phones</option>
        </select>

        <div className="text-xs flex gap-4 font-medium">
          <span>✓ FREE SHIPPING OVER $199</span>
          <span>•</span>
          <span>📅 30 DAYS MONEY BACK</span>
          <span>•</span>
          <span>🔒 100% SECURE PAYMENT</span>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
