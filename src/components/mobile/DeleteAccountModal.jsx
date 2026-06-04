import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteAccountModal({ onClose, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirmed) return;
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-white dark:bg-gray-900 w-full sm:max-w-md sm:rounded-xl rounded-t-2xl shadow-2xl p-6"
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-steel hover:text-navy min-w-[44px] min-h-[44px] flex items-center justify-center">
          <X size={18} />
        </button>

        <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-4">
          <AlertTriangle size={22} className="text-red-500" />
        </div>

        <h2 className="font-condensed font-black text-navy dark:text-white text-xl uppercase tracking-tight mb-2">Delete Account</h2>
        <p className="font-inter text-steel dark:text-gray-400 text-sm leading-relaxed mb-6">
          This will permanently delete your account and all associated project data. This action cannot be undone.
        </p>

        <label className="flex items-start gap-3 mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={e => setConfirmed(e.target.checked)}
            className="mt-0.5 w-5 h-5 accent-red-500 flex-shrink-0"
          />
          <span className="font-inter text-sm text-navy dark:text-white">
            I understand that deleting my account is permanent and cannot be reversed.
          </span>
        </label>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 min-h-[44px] border border-silver font-condensed font-bold text-sm uppercase tracking-wide text-steel hover:border-navy hover:text-navy transition-colors select-none"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!confirmed || loading}
            className="flex-1 min-h-[44px] bg-red-500 hover:bg-red-600 text-white font-condensed font-bold text-sm uppercase tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed select-none"
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}