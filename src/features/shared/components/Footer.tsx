import React, { useState } from 'react';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-white">SWOO - 1ST NYC TECH ONLINE MARKET</h3>
          <p className="text-sm mb-4">hotline 24/7</p>
          <p className="text-lg font-bold text-yellow-400 mb-4">(025) 3686 25 16</p>
          <p className="text-sm">
            257 Thatcher Road St, Brooklyn, Manhattan,
            <br />
            NY 10092
          </p>
          <p className="text-sm mt-2">contact@Swootechmart.com</p>
        </div>

        {/* Top Categories */}
        <div>
          <h4 className="font-semibold text-white mb-4">TOP CATEGORIES</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Laptops
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                PC & Computers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Cell Phones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Tablets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Gaming & VR
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Cameras
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white mb-4">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                About Swoo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Career
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Sitemap
              </a>
            </li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h4 className="font-semibold text-white mb-4">HELP CENTER</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Customer Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-white mb-4">SUBSCRIBE & GET 10% OFF FOR YOUR FIRST ORDER</h4>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            <Button variant="primary" fullWidth type="submit" size="sm">
              SUBSCRIBE
            </Button>
            <p className="text-xs text-gray-400">
              By subscribing, you're accepted the our Policy
            </p>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>© 2024 Swootechmart3. All Rights Reserved</p>

        {/* Payment methods */}
        <div className="flex items-center gap-3">
          <span>Payment methods:</span>
          <div className="flex gap-2 items-center">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect fill='%231f4788' width='48' height='32'/%3E%3C/svg%3E"
              alt="PayPal"
              className="h-5"
            />
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect fill='%23EB001B' width='48' height='32'/%3E%3C/svg%3E"
              alt="Mastercard"
              className="h-5"
            />
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect fill='%231434CB' width='48' height='32'/%3E%3C/svg%3E"
              alt="Visa"
              className="h-5"
            />
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect fill='%23009FE3' width='48' height='32'/%3E%3C/svg%3E"
              alt="Stripe"
              className="h-5"
            />
          </div>
        </div>

        <a href="#" className="hover:text-yellow-300 transition">
          Mobile Site
        </a>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
