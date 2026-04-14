import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Button } from './Button';
export const Modal = ({ isOpen, title, onClose, children, actions, size = 'md', className, }) => {
    useEffect(() => {
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/50", onClick: onClose, "aria-hidden": "true" }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", className: `relative bg-white rounded-lg shadow-lg w-full mx-4 ${sizeClasses[size]} ${className || ''}`, children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [_jsx("h2", { id: "modal-title", className: "text-lg font-semibold text-gray-900", children: title }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700 transition-colors", "aria-label": "Close modal", children: "\u2715" })] }), _jsx("div", { className: "p-6", children: children }), actions && actions.length > 0 && (_jsx("div", { className: "flex gap-2 justify-end p-6 border-t border-gray-200", children: actions.map((action, index) => (_jsx(Button, { variant: action.variant || 'primary', onClick: action.onClick, children: action.label }, index))) }))] })] }));
};
Modal.displayName = 'Modal';
