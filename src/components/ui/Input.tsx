import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2 text-base border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errorMessage ? 'border-red-600 focus:ring-red-600' : 'border-gray-300'}
            ${className || ''}
          `}
          {...props}
        />
        {errorMessage && (
          <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
