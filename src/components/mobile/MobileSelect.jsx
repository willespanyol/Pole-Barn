import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import BottomSheet from './BottomSheet';

/**
 * Mobile-friendly replacement for <select>.
 * On small screens shows a bottom sheet picker.
 * Falls back to normal behavior on desktop.
 */
export default function MobileSelect({ label, value, onChange, options, placeholder = 'Select...', className = '' }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => (o.value ?? o) === value);
  const displayLabel = selected ? (selected.label ?? selected) : placeholder;

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`w-full flex items-center justify-between border border-silver px-4 py-3 font-inter text-sm text-navy dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:border-navy text-left min-h-[44px] bg-white select-none ${className}`}
      >
        <span className={value ? 'text-navy dark:text-white' : 'text-steel dark:text-gray-400'}>{displayLabel}</span>
        <ChevronDown size={16} className="text-steel flex-shrink-0 ml-2" />
      </button>

      <BottomSheet isOpen={open} onClose={() => setOpen(false)} title={label}>
        <div className="py-2">
          {options.map(opt => {
            const val = opt.value ?? opt;
            const lbl = opt.label ?? opt;
            const isSelected = val === value;
            return (
              <button
                key={val}
                type="button"
                onClick={() => handleSelect(val)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-inter text-base text-navy dark:text-white hover:bg-silver/30 dark:hover:bg-gray-800 border-b border-gray-50 dark:border-gray-800 last:border-0 min-h-[44px] select-none"
              >
                <span>{lbl}</span>
                {isSelected && <Check size={16} className="text-yellow flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
}