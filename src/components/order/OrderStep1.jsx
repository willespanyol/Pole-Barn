const PROJECT_TYPES = [
  'Pole Barn',
  'Post-Frame Building',
  'Barndominium',
  'Garage',
  'Workshop',
  'Agricultural Building',
  'Equipment Storage Building',
  'Commercial Storage Building',
  'Other',
];

export default function OrderStep1({ data, updateData }) {
  return (
    <div>
      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-1">Step 1 of 6</div>
      <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-1">Project Type</h2>
      <p className="font-inter text-steel text-sm mb-6">Select the building type that best describes your project.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PROJECT_TYPES.map(pt => (
          <button
            key={pt}
            onClick={() => updateData({ projectType: pt })}
            className={`p-4 border-2 text-left transition-all ${
              data.projectType === pt
                ? 'border-yellow bg-yellow/10'
                : 'border-silver hover:border-steel/40'
            }`}
          >
            <div className={`font-condensed font-bold text-sm uppercase tracking-tight ${data.projectType === pt ? 'text-navy' : 'text-steel'}`}>
              {pt}
            </div>
          </button>
        ))}
      </div>
      {data.projectType && (
        <div className="mt-5 flex items-center gap-2 p-3 bg-yellow/10 border border-yellow/30">
          <div className="w-2 h-2 bg-yellow flex-shrink-0" />
          <span className="font-mono text-navy text-[10px] tracking-wide">Selected: <strong>{data.projectType}</strong></span>
        </div>
      )}
    </div>
  );
}