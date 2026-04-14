import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const Button = React.forwardRef(({ variant = 'primary', size = 'md', fullWidth = false, isLoading = false, className, disabled, children, ...props }, ref) => {
    // Base styles
    const baseStyles = 'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    // Size styles
    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    // Variant styles
    const variantStyles = {
        primary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
        outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };
    const widthStyles = fullWidth ? 'w-full' : '';
    const computedClassName = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${widthStyles}
      ${className || ''}
    `;
    return (_jsx("button", { ref: ref, className: computedClassName, disabled: disabled || isLoading, ...props, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "inline-block mr-2 animate-spin", children: "\u23F3" }), children] })) : (children) }));
});
Button.displayName = 'Button';
