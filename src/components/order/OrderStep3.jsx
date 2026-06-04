const ALL_SERVICES = [
  'Architectural plans',
  'Foundation plan',
  'Post and footing layout',
  'Structural framing drawings',
  'Roof framing plan',
  'Wall framing details',
  'Structural calculations',
  'MEP layouts',
  'Electrical layout',
  'Plumbing layout',
  'HVAC layout',
  'Permit review revisions',
  'Full permit-ready drawing package',
];

export default function OrderStep3({ data, updateData }) {
  const toggle = (svc) => {
    const curr = data.selectedServices || [];
    const updated = curr.includes(svc) ? curr.filter(s => s !== svc) : [...curr, svc];
    updateData({ selectedServices: updated });
  };

  const selectAll = () => updateData({ selectedServices: [...ALL_SERVICES] });
  const clearAll = () => updateData({ selectedServices: [] });

  return (
    <div>
      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-1">Step 3 of 6</div>
      <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-1">Services Needed</h2>
      <p className="font-inter text-steel text-sm mb-5">Select all drawing services required for your project. If unsure, we will help identify what your permit office requires.</p>

      <div className="flex gap-3 mb-4">
        <button onClick={selectAll} className="font-mono text-[9px] text-navy border border-navy px-3 py-1.5 tracking-widest uppercase hover:bg-navy hover:text-white transition-colors">
          Select All
        </button>
        <button onClick={clearAll} className="font-mono text-[9px] text-steel border border-silver px-3 py-1.5 tracking-widest uppercase hover:border-steel transition-colors">
          Clear All
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        {ALL_SERVICES.map(svc => {
          const selected = (data.selectedServices || []).includes(svc);
          return (
            <button
              key={svc}
              onClick={() => toggle(svc)}
              className={`flex items-center gap-3 p-3 border text-left transition-all ${
                selected ? 'border-yellow bg-yellow/10' : 'border-silver hover:border-steel/40'
              }`}
            >
              <div className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                selected ? 'border-yellow bg-yellow' : 'border-silver'
              }`}>
                {selected && <span className="text-navy text-[10px] font-bold leading-none">✓</span>}
              </div>
              <span className={`font-inter text-sm ${selected ? 'text-navy font-medium' : 'text-steel'}`}>{svc}</span>
            </button>
          );
        })}
      </div>

      {(data.selectedServices || []).length > 0 && (
        <div className="mt-4 p-3 bg-yellow/10 border border-yellow/30">
          <div className="font-mono text-[9px] text-navy tracking-widest uppercase">{data.selectedServices.length} service{data.selectedServices.length !== 1 ? 's' : ''} selected</div>
        </div>
      )}
    </div>
  );
}