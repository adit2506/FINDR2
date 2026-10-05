import React from 'react';
import { useItems } from '../../context/ItemsContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useItems();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-70 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto p-4 rounded-2xl bg-white dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#282828] shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)] flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-[#C1122F] dark:text-[#FF4A6B]" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-[#111111] dark:text-[#F5F5F7]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-semibold text-[#111111] dark:text-[#F5F5F7]">
                {toast.message}
              </h5>
              {toast.description && (
                <p className="mt-0.5 text-xs text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8E8E93] dark:text-[#7A7A7E] hover:text-[#111111] dark:hover:text-[#F5F5F7] p-1 -mr-1 -mt-1 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
