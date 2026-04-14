import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Rating = ({ value, count, readonly = true, onChange, className, }) => {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
    return (_jsxs("div", { className: `flex items-center gap-1 ${className || ''}`, children: [_jsx("div", { className: "flex gap-0.5", children: stars.map((star) => (_jsx("button", { onClick: () => !readonly && onChange?.(star), disabled: readonly, "aria-label": `Rate ${star} out of 5`, className: `text-lg transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:text-yellow-400'}`, children: star <= value ? '⭐' : '☆' }, star))) }), count !== undefined && (_jsxs("span", { className: "text-sm text-gray-600", children: ["(", count, ")"] }))] }));
};
Rating.displayName = 'Rating';
