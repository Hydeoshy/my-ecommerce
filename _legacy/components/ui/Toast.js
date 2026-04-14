import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const Toast = ({ id, type, message, duration = 3000, onClose, }) => {
    React.useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => onClose(id), duration);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [id, duration, onClose]);
    const typeStyles = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
        info: 'bg-blue-100 text-blue-800 border-blue-300',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠',
    };
    return (_jsxs("div", { className: `
        flex items-center gap-3 px-4 py-3 rounded-lg border
        shadow-md animate-in fade-in slide-in-from-top
        ${typeStyles[type]}
      `, role: "status", "aria-live": "polite", children: [_jsx("span", { className: "text-xl font-bold flex-shrink-0", children: icons[type] }), _jsx("p", { className: "flex-1", children: message }), _jsx("button", { onClick: () => onClose(id), className: "text-xl flex-shrink-0 hover:opacity-70 transition-opacity", "aria-label": "Close notification", children: "\u2715" })] }));
};
Toast.displayName = 'Toast';
