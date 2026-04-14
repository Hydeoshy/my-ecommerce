import React, { useState } from 'react';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';

interface NewsletterSignupProps {
  onSubscribe?: (email: string) => void;
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  onSubscribe,
  className,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      onSubscribe?.(email);
      setMessage({ type: 'success', text: 'Subscribed successfully!' });
      setEmail('');
    } catch {
      setMessage({ type: 'error', text: 'Failed to subscribe. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`bg-yellow-50 ${className || ''}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Subscribe & Get 10% OFF for your first order
          </h2>
          <p className="text-gray-600">
            Join our newsletter and receive exclusive offers
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button
            variant="primary"
            type="submit"
            isLoading={isLoading}
            className="font-bold"
          >
            Subscribe
          </Button>
        </form>

        {message && (
          <p
            className={`text-center text-sm mt-3 ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message.text}
          </p>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          By subscribing, you agree to our Privacy Policy
        </p>
      </div>
    </section>
  );
};

NewsletterSignup.displayName = 'NewsletterSignup';
