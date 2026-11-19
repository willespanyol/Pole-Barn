import { STAMP_JURISDICTIONS, UAE_EMIRATES } from '@/lib/stampJurisdictions';

export default function StampRequestFields({ stampingRequired = '', stampingJurisdiction = '', stampingEmirate = '', onChange }) {
  const update = (patch) => onChange(patch);
  const required = stampingRequired === 'Yes';
  const uae = stampingJurisdiction === 'United Arab Emirates (UAE)';
  return (
    <fieldset className="border border-silver p-5 bg-silver/10 space-y-4">
      <legend className="font-condensed font-black text-navy uppercase tracking-tight px-2">Licensed Professional Stamping</legend>
      <div>
        <p className="font-inter text-sm font-medium text-navy mb-2">Do you need your drawings reviewed and stamped by a licensed professional engineer?</p>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Professional engineering stamp required">
          {['Yes', 'No'].map(option => (
            <label key={option} className={`inline-flex gap-2 items-center border px-4 py-2 font-inter text-sm cursor-pointer ${stampingRequired === option ? 'border-yellow bg-yellow/20 text-navy' : 'border-silver bg-white text-steel'}`}>
              <input type="radio" name="stampingRequired" value={option} checked={stampingRequired === option}
                onChange={() => update({ stampingRequired: option, ...(option === 'No' ? { stampingJurisdiction: '', stampingEmirate: '' } : {}) })} />
              {option}
            </label>
          ))}
        </div>
      </div>
      {required && (
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block font-inter text-sm text-navy">
            <span className="font-mono text-[10px] tracking-wide uppercase block mb-2">State / UAE jurisdiction *</span>
            <select required value={stampingJurisdiction} onChange={e => update({ stampingJurisdiction: e.target.value, stampingEmirate: '' })}
              className="w-full border border-silver bg-white p-3 text-sm text-navy">
              <option value="">Select a US state or UAE</option>
              <optgroup label="United States">
                {STAMP_JURISDICTIONS.filter(v => v !== 'United Arab Emirates (UAE)').map(v => <option key={v} value={v}>{v}</option>)}
              </optgroup>
              <optgroup label="United Arab Emirates">
                <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
              </optgroup>
            </select>
          </label>
          {uae && (
            <label className="block font-inter text-sm text-navy">
              <span className="font-mono text-[10px] tracking-wide uppercase block mb-2">Emirate *</span>
              <select required value={stampingEmirate} onChange={e => update({ stampingEmirate: e.target.value })}
                className="w-full border border-silver bg-white p-3 text-sm text-navy">
                <option value="">Select emirate</option>
                {UAE_EMIRATES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </label>
          )}
        </div>
      )}
      <p className="font-inter text-steel text-xs leading-relaxed">
        Our design team coordinates professional review and sealed drawings for the selected jurisdiction. Stamping is quoted separately from drafting estimates.
      </p>
    </fieldset>
  );
}
