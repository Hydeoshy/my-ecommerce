import React, { useState } from 'react';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';

interface SignUpProps {
  onSignUpSuccess?: (data: {
    name: string;
    email: string;
    password: string;
  }) => void;
  onLoginClick?: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({
  onSignUpSuccess,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Call backend API for signup
      console.log('Sign up attempt:', {
        name: formData.name,
        email: formData.email,
      });

      // Simulate API call
      setTimeout(() => {
        onSignUpSuccess?.({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setIsLoading(false);
      }, 1500);
    } catch {
      setError('Sign up failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center px-4 py-12">
      <Card className="p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 text-sm mt-2">
            Join SWOO and start shopping
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Full Name */}
          <Input
            type="text"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Confirm Password */}
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 mt-0.5" required />
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-yellow-400 hover:text-yellow-500">
                Terms & Conditions
              </a>
            </span>
          </label>

          {/* Sign Up Button */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isLoading}
            className="mt-6 font-semibold"
          >
            Create Account
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            onClick={onLoginClick}
            className="text-yellow-400 hover:text-yellow-500 font-semibold"
          >
            Login
          </button>
        </p>
      </Card>
    </div>
  );
};

SignUp.displayName = 'SignUp';
