import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs("div", { className: "min-h-screen bg-gray-100", children: [_jsx("header", { className: "bg-white shadow", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8", children: _jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "My E-Commerce" }) }) }), _jsx("main", { children: _jsx("div", { className: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8", children: _jsx("p", { className: "text-gray-700", children: "Welcome to your e-commerce platform" }) }) })] }) }));
}
export default App;
