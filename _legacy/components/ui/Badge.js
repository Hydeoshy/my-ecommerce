import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const Badge = React.forwardRef(({ variant = 'info', children, className }, ref) => {
    const variantStyles = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
    };
    const baseStyles = 'inline-block px-3 py-1 rounded-full text-sm font-medium';
    return (_jsx("span", { ref: ref, className: `${baseStyles} ${variantStyles[variant]} ${className || ''}`, children: children }));
});
Badge.displayName = 'Badge';
