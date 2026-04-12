import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    const { worker } = await import('./mocks/browser');
    return worker.start();
}
enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
});
