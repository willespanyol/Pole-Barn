const Field = ({ label, value, onChange, placeholder, type = 'text', required }) => (
  <div>
    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">
      {label}{required && <span className="text-yellow ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-silver px-4 py-2.5 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
    />
  </div>
);

export default function OrderStep6({ data, updateData }) {
  return (
    <div>
      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-1">Step 6 of 6</div>
      <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-1">Contact Information</h2>
      <p className="font-inter text-steel text-sm mb-6">We will use this to follow up on your project, send quotes, and deliver completed drawing packages.</p>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" value={data.fullName} onChange={v => updateData({ fullName: v })} placeholder="Your full name" required />
          <Field label="Email Address" value={data.email} onChange={v => updateData({ email: v })} placeholder="you@example.com" type="email" required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone Number" value={data.phone} onChange={v => updateData({ phone: v })} placeholder="+1 (555) 000-0000" type="tel" />
          <Field label="Company or Business Name" value={data.companyName} onChange={v => updateData({ companyName: v })} placeholder="Optional" />
        </div>

        <div className="pt-3 border-t border-silver">
          <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-2">Preferred Contact Method</div>
          <div className="flex flex-wrap gap-2">
            {['Email', 'Phone', 'WhatsApp', 'Text'].map(m => (
              <button key={m} onClick={() => updateData({ contactMethod: m })}
                className={`px-4 py-2 border text-sm font-condensed font-bold uppercase tracking-tight transition-colors ${data.contactMethod === m ? 'border-yellow bg-yellow/10 text-navy' : 'border-silver text-steel hover:border-steel/40'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Project Description</label>
          <textarea
            value={data.projectDescription}
            onChange={e => updateData({ projectDescription: e.target.value })}
            placeholder="Describe your project, any specific requirements, permit office feedback, design preferences, or questions..."
            rows={5}
            className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}