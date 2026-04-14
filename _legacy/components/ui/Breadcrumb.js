import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const Breadcrumb = ({ items, onNavigate, className, }) => {
    return (_jsx("nav", { className: `flex items-center text-sm text-gray-600 ${className || ''}`, "aria-label": "Breadcrumb", children: items.map((item, index) => (_jsxs(React.Fragment, { children: [index > 0 && _jsx("span", { className: "mx-2 text-gray-400", children: "/" }), item.current || !item.href ? (_jsx("span", { className: item.current ? 'text-gray-900 font-medium' : '', "aria-current": item.current ? 'page' : undefined, children: item.label })) : (_jsx("button", { onClick: () => onNavigate?.(item.href), className: "text-green-600 hover:text-green-700 hover:underline transition-colors", children: item.label }))] }, index))) }));
};
Breadcrumb.displayName = 'Breadcrumb';
