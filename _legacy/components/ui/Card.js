import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const Card = React.forwardRef(({ children, hover = false, className, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow duration-200';
    const hoverStyles = hover ? 'hover:shadow-md hover:cursor-pointer' : '';
    return (_jsx("div", { ref: ref, className: `${baseStyles} ${hoverStyles} ${className || ''}`, ...props, children: children }));
});
Card.displayName = 'Card';
