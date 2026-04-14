import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, className, ...props }, ref) => {
    const baseStyles =
      'bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow duration-200';
    const hoverStyles = hover ? 'hover:shadow-md hover:cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
