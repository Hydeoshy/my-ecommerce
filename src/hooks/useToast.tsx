import React, { useState, useCallback, createContext, useContext } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (message: Omit<ToastMessage, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (message: Omit<ToastMessage, 'id'>): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast: ToastMessage = { ...message, id };
      setToasts((prev) => [...prev, toast]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return {
    toasts: context.toasts,
    success: (message: string, duration?: number) =>
      context.addToast({ type: 'success', message, duration }),
    error: (message: string, duration?: number) =>
      context.addToast({ type: 'error', message, duration }),
    info: (message: string, duration?: number) =>
      context.addToast({ type: 'info', message, duration }),
    warning: (message: string, duration?: number) =>
      context.addToast({ type: 'warning', message, duration }),
    remove: context.removeToast,
  };
};
