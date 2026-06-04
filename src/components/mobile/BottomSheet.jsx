import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function BottomSheet({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="relative bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {/* Handle */}
        <div className="flex items-center justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
            <span className="font-condensed font-bold text-navy dark:text-white text-base uppercase tracking-tight">{title}</span>
            <button onClick={onClose} className="p-2 -mr-2 text-steel dark:text-gray-400 hover:text-navy dark:hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center">
              <X size={18} />
            </button>
          </div>
        )}
        {/* Content */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}