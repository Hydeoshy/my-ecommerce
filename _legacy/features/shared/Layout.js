import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from './Header';
import { Footer } from './Footer';
import { Toast } from '@components/ui/Toast';
import { useToast } from '@hooks/useToast';
export const Layout = ({ children }) => {
    const { toasts, remove } = useToast();
    const handleCart = () => {
        // TODO: Navigate to cart
    };
    const handleLogin = () => {
        // TODO: Navigate to login
    };
    const handleSearch = (query) => {
        // TODO: Handle search
        console.log('Search:', query);
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-white", children: [_jsx(Header, { onCart: handleCart, onLogin: handleLogin, onSearch: handleSearch }), _jsx("main", { className: "flex-1", children: children }), _jsx(Footer, {}), _jsx("div", { className: "fixed bottom-4 right-4 flex flex-col gap-2 pointer-events-none", children: toasts.map((toast) => (_jsx("div", { className: "pointer-events-auto", children: _jsx(Toast, { id: toast.id, type: toast.type, message: toast.message, duration: toast.duration, onClose: remove }) }, toast.id))) })] }));
};
Layout.displayName = 'Layout';
