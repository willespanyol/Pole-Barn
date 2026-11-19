import StampRequestFields from '../shared/StampRequestFields';

const Field = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">{label}</label>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-silver px-4 py-2.5 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
    />
  </div>
);

const YesNo = ({ label, value, onChange }) => (
  <div>
    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {['Yes', 'No', 'Unknown'].map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          className={`px-4 py-2 border text-sm font-condensed font-bold uppercase tracking-tight transition-colors ${value === opt ? 'border-yellow bg-yellow/10 text-navy' : 'border-silver text-steel hover:border-steel/40'}`}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default function OrderStep4({ data, updateData }) {
  return (
    <div>
      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-1">Step 4 of 6</div>
      <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-1">Site & Permit Information</h2>
      <p className="font-inter text-steel text-sm mb-6">This helps us prepare drawings for your location and jurisdiction. Leave blank if unknown.</p>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Project Location / Address" value={data.projectAddress} onChange={v => updateData({ projectAddress: v })} placeholder="Street address or general area" />
          <Field label="City" value={data.city} onChange={v => updateData({ city: v })} placeholder="City name" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="State / Province / Region" value={data.state} onChange={v => updateData({ state: v })} placeholder="e.g. Texas, Ontario, Queensland" />
          <Field label="County" value={data.county} onChange={v => updateData({ county: v })} placeholder="County name" />
          <Field label="Country" value={data.country} onChange={v => updateData({ country: v })} placeholder="e.g. USA, Canada, Australia" />
        </div>
        <Field label="Local Building Department" value={data.buildingDepartment} onChange={v => updateData({ buildingDepartment: v })} placeholder="e.g. Travis County Building Department" />

        <div className="pt-4 border-t border-silver space-y-3">
          <YesNo label="Is this for permit submission?" value={data.forPermitSubmission} onChange={v => updateData({ forPermitSubmission: v })} />
          <YesNo label="Has the permit office issued comments?" value={data.hasPermitComments} onChange={v => updateData({ hasPermitComments: v })} />
        </div>

        <StampRequestFields
          stampingRequired={data.stampingRequired}
          stampingJurisdiction={data.stampingJurisdiction}
          stampingEmirate={data.stampingEmirate}
          onChange={updateData}
        />

        <div className="pt-4 border-t border-silver">
          <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-3">Design Loads (if known — leave blank if unknown)</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Required Building Code" value={data.buildingCode} onChange={v => updateData({ buildingCode: v })} placeholder="e.g. IBC 2021" />
            <Field label="Wind Speed (mph)" value={data.windSpeed} onChange={v => updateData({ windSpeed: v })} placeholder="e.g. 115 mph" />
            <Field label="Ground Snow Load (psf)" value={data.snowLoad} onChange={v => updateData({ snowLoad: v })} placeholder="e.g. 25 psf" />
            <Field label="Soil Bearing Capacity" value={data.soilBearing} onChange={v => updateData({ soilBearing: v })} placeholder="e.g. 1500 psf" />
            <Field label="Seismic Design Category" value={data.seismicCategory} onChange={v => updateData({ seismicCategory: v })} placeholder="e.g. SDC B" />
            <Field label="Flood Zone (if applicable)" value={data.floodZone} onChange={v => updateData({ floodZone: v })} placeholder="e.g. Zone X, AE" />
          </div>
        </div>
      </div>
    </div>
  );
}