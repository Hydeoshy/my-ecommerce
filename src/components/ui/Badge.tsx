import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'info', children, className }, ref) => {
    const variantStyles = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };

    const baseStyles = 'inline-block px-3 py-1 rounded-full text-sm font-medium';

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
