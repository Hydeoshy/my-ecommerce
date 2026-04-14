import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toast } from '@components/ui/Toast';
import { useToast } from '@hooks/useToast';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toasts, remove } = useToast();

  const handleCart = () => {
    // TODO: Navigate to cart
  };

  const handleLogin = () => {
    // TODO: Navigate to login
  };

  const handleSearch = (query: string) => {
    // TODO: Handle search
    console.log('Search:', query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header onCart={handleCart} onLogin={handleLogin} onSearch={handleSearch} />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              onClose={remove}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Layout.displayName = 'Layout';
