/**
 * Toast - Simple notification system
 */

import React, { useState, useCallback, useContext, createContext } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  messages: ToastMessage[];
  showToast: (
    message: string,
    type: ToastType,
    action?: { label: string; onClick: () => void }
  ) => void;
  closeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      action?: { label: string; onClick: () => void }
    ) => {
      const id = `toast-${Date.now()}`;
      setMessages(prev => [...prev, { id, message, type, action }]);

      // Longer timeout for actionable toasts (10s vs 3s)
      const timeout = action ? 10000 : 3000;
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== id));
      }, timeout);
    },
    []
  );

  const closeToast = useCallback((id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ messages, showToast, closeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  messages: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ messages, onClose }) => {
  if (messages.length === 0) return null;

  return (
    <div className="toast-container">
      {messages.map(({ id, message, type, action }) => (
        <div key={id} className={`toast toast-${type}`}>
          <div className="toast-content">
            <span>{message}</span>
            {action && (
              <button onClick={action.onClick} className="toast-action">
                {action.label}
              </button>
            )}
          </div>
          <button onClick={() => onClose(id)} className="toast-close">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
