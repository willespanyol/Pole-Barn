import MobileSelect from '../mobile/MobileSelect';

const Field = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-silver px-4 py-2.5 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">{label}</label>
    <MobileSelect
      label={label}
      value={value}
      onChange={onChange}
      options={options.map(o => ({ value: o, label: o }))}
      placeholder="Select..."
    />
  </div>
);

const YesNo = ({ label, value, onChange }) => (
  <div>
    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {['Yes', 'No', 'Not sure'].map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 border text-sm font-condensed font-bold uppercase tracking-tight transition-colors ${value === opt ? 'border-yellow bg-yellow/10 text-navy' : 'border-silver text-steel hover:border-steel/40'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default function OrderStep2({ data, updateData }) {
  return (
    <div>
      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-1">Step 2 of 6</div>
      <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-1">Building Details</h2>
      <p className="font-inter text-steel text-sm mb-6">Provide approximate dimensions if the final design has not been decided. We can help refine the layout.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Building Length (ft)" value={data.buildingLength} onChange={v => updateData({ buildingLength: v })} placeholder="e.g. 60" />
          <Field label="Building Width (ft)" value={data.buildingWidth} onChange={v => updateData({ buildingWidth: v })} placeholder="e.g. 40" />
          <Field label="Building Height (ft)" value={data.buildingHeight} onChange={v => updateData({ buildingHeight: v })} placeholder="e.g. 14" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <SelectField label="Number of Floors" value={data.numberOfFloors} onChange={v => updateData({ numberOfFloors: v })} options={['1', '2', '1.5 (Loft)', 'Other']} />
          <SelectField label="Roof Style" value={data.roofStyle} onChange={v => updateData({ roofStyle: v })} options={['Gable', 'Hip', 'Gambrel', 'Monitor', 'Shed', 'Other']} />
          <Field label="Roof Pitch (e.g. 4:12)" value={data.roofPitch} onChange={v => updateData({ roofPitch: v })} placeholder="e.g. 4:12" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Wall Height (ft)" value={data.wallHeight} onChange={v => updateData({ wallHeight: v })} placeholder="e.g. 12" />
          <Field label="Bay Spacing (ft)" value={data.baySpacing} onChange={v => updateData({ baySpacing: v })} placeholder="e.g. 10" />
          <SelectField label="Use Category" value={data.useCategory} onChange={v => updateData({ useCategory: v })} options={['Residential', 'Agricultural', 'Commercial', 'Mixed-use']} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Doors Required" value={data.numberOfDoors} onChange={v => updateData({ numberOfDoors: v })} placeholder="Number and type" />
          <Field label="Windows Required" value={data.numberOfWindows} onChange={v => updateData({ numberOfWindows: v })} placeholder="Number and type" />
        </div>
        <Field label="Intended Use of Building" value={data.intendedUse} onChange={v => updateData({ intendedUse: v })} placeholder="e.g. Vehicle storage and workshop, farm equipment, residential living..." />

        <div className="space-y-3 pt-4 border-t border-silver">
          <YesNo label="Porch, lean-to, canopy, or covered entry required?" value={data.needsPorch} onChange={v => updateData({ needsPorch: v })} />
          <YesNo label="Loft, mezzanine, or second floor required?" value={data.needsLoft} onChange={v => updateData({ needsLoft: v })} />
          <YesNo label="Interior rooms or partitions required?" value={data.needsInteriorRooms} onChange={v => updateData({ needsInteriorRooms: v })} />
        </div>
      </div>
    </div>
  );
}