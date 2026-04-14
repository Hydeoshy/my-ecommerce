import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './Button';
export const Pagination = ({ currentPage, totalPages, onPageChange, showFirstLast = true, className, }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    const visiblePages = pages.slice(startPage - 1, endPage);
    return (_jsxs("div", { className: `flex items-center justify-center gap-2 flex-wrap ${className || ''}`, children: [_jsx(Button, { variant: "outline", size: "sm", disabled: currentPage === 1, onClick: () => onPageChange(currentPage - 1), children: "\u2190 Prev" }), showFirstLast && startPage > 1 && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: currentPage === 1 ? 'primary' : 'outline', size: "sm", onClick: () => onPageChange(1), children: "1" }), startPage > 2 && _jsx("span", { className: "text-gray-500", children: "..." })] })), visiblePages.map((page) => (_jsx(Button, { variant: currentPage === page ? 'primary' : 'outline', size: "sm", onClick: () => onPageChange(page), children: page }, page))), showFirstLast && endPage < totalPages && (_jsxs(_Fragment, { children: [endPage < totalPages - 1 && (_jsx("span", { className: "text-gray-500", children: "..." })), _jsx(Button, { variant: currentPage === totalPages ? 'primary' : 'outline', size: "sm", onClick: () => onPageChange(totalPages), children: totalPages })] })), _jsx(Button, { variant: "outline", size: "sm", disabled: currentPage === totalPages, onClick: () => onPageChange(currentPage + 1), children: "Next \u2192" })] }));
};
Pagination.displayName = 'Pagination';
