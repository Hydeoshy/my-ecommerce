import React, { useState } from 'react';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';

interface LoginProps {
  onLoginSuccess?: (data: { email: string; password: string }) => void;
  onSignUpClick?: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  onSignUpClick,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Call backend API for login
      console.log('Login attempt:', { email, password });

      // Simulate API call
      setTimeout(() => {
        onLoginSuccess?.({ email, password });
        setIsLoading(false);
      }, 1500);
    } catch {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Left - Illustration/Copy */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Login to access your account and enjoy exclusive deals
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Checkout</h3>
                <p className="text-sm text-gray-600">
                  Save your info for quick purchases
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900">Secure</h3>
                <p className="text-sm text-gray-600">
                  Your data is encrypted and safe
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900">Order History</h3>
                <p className="text-sm text-gray-600">
                  Track all your purchases
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-yellow-400 hover:text-yellow-500 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              className="mt-6 font-semibold"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button variant="outline" fullWidth size="md">
              Continue with Google
            </Button>
            <Button variant="outline" fullWidth size="md">
              Continue with Facebook
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <button
              onClick={onSignUpClick}
              className="text-yellow-400 hover:text-yellow-500 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

Login.displayName = 'Login';
