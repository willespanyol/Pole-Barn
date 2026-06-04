export default function OrderSummary({ data }) {
  const sqft = data.buildingLength && data.buildingWidth
    ? parseInt(data.buildingLength) * parseInt(data.buildingWidth)
    : null;

  const rows = [
    { label: 'Project Type', value: data.projectType },
    { label: 'Dimensions', value: sqft ? `${data.buildingLength} × ${data.buildingWidth} ft (${sqft.toLocaleString()} sf)` : null },
    { label: 'Roof Style', value: data.roofStyle },
    { label: 'Use Category', value: data.useCategory },
    { label: 'Location', value: [data.city, data.state, data.country].filter(Boolean).join(', ') },
    { label: 'Permit Submission', value: data.forPermitSubmission },
    { label: 'Package', value: data.selectedPackage },
    { label: 'Timeline', value: data.timeline },
    { label: 'Services', value: (data.selectedServices || []).length > 0 ? `${data.selectedServices.length} selected` : null },
    { label: 'Add-Ons', value: (data.selectedAddOns || []).length > 0 ? `${data.selectedAddOns.length} selected` : null },
    { label: 'Contact', value: data.fullName || null },
    { label: 'Email', value: data.email || null },
  ].filter(r => r.value);

  return (
    <div className="sticky top-24">
      <div className="bg-navy p-5">
        <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-4">Project Summary</div>
        {rows.length === 0 ? (
          <p className="font-inter text-gray-500 text-xs leading-relaxed">Your project details will appear here as you fill in the form.</p>
        ) : (
          <div className="space-y-3">
            {rows.map(r => (
              <div key={r.label} className="flex justify-between items-start gap-2">
                <span className="font-mono text-[9px] text-gray-400 tracking-wide flex-shrink-0">{r.label}</span>
                <span className="font-inter text-white text-xs text-right">{r.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 p-4 border border-silver bg-silver/20">
        <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-1">Need help?</div>
        <a href="https://wa.me/14803383000" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-inter text-steel hover:text-navy transition-colors">
          <span className="text-[#25D366]">●</span> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}