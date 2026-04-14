import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const Input = React.forwardRef(({ label, errorMessage, fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (_jsxs("div", { className: `${fullWidth ? 'w-full' : ''}`, children: [label && (_jsxs("label", { htmlFor: inputId, className: "block text-sm font-medium text-gray-900 mb-1", children: [label, props.required && _jsx("span", { className: "text-red-600 ml-1", children: "*" })] })), _jsx("input", { ref: ref, id: inputId, className: `
            w-full px-4 py-2 text-base border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errorMessage ? 'border-red-600 focus:ring-red-600' : 'border-gray-300'}
            ${className || ''}
          `, ...props }), errorMessage && (_jsx("p", { className: "text-sm text-red-600 mt-1", children: errorMessage }))] }));
});
Input.displayName = 'Input';
