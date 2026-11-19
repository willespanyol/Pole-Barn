import { useState } from 'react';
import { Link } from 'react-router-dom';
import { appClient } from '@/api/appClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Paperclip, CheckCircle2 } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import StampRequestFields from '../components/shared/StampRequestFields';

const PROJECT_TYPES = [
  'Pole Barn', 'Post-Frame Building', 'Barndominium', 'Garage',
  'Workshop', 'Agricultural Building', 'Commercial Storage Building', 'Other',
];

const SERVICES = [
  { key: 'foundation', label: 'Foundation Design Required' },
  { key: 'framing', label: 'Structural Framing Required' },
  { key: 'mep', label: 'MEP Layout Required' },
  { key: 'calculations', label: 'Structural Calculations Required' },
  { key: 'revisions', label: 'Permit Revision Support Required' },
];

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
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full border border-silver px-4 py-2.5 font-inter text-sm text-navy focus:outline-none focus:border-navy bg-white">
      <option value="">Select...</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const YesNo = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b border-silver/60">
    <span className="font-inter text-sm text-steel">{label}</span>
    <div className="flex gap-2">
      {['Yes', 'No', 'Unknown'].map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          className={`px-3 py-1 border text-xs font-condensed font-bold uppercase tracking-tight transition-colors ${value === opt ? 'border-yellow bg-yellow/10 text-navy' : 'border-silver text-steel hover:border-steel/40'}`}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default function Estimator() {
  const [form, setForm] = useState({
    projectType: '', buildingLength: '', buildingWidth: '', buildingHeight: '',
    numberOfFloors: '', roofStyle: '', intendedUse: '', projectLocation: '',
    foundation: '', framing: '', mep: '', calculations: '', revisions: '',
    timeline: '', fullName: '', email: '', phone: '',
    stampingRequired: '', stampingJurisdiction: '', stampingEmirate: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key, val) => { setForm(p => ({ ...p, [key]: val })); setShowResult(false); };

  const canSubmit = form.projectType && form.fullName && form.email &&
    (form.stampingRequired !== 'Yes' || (form.stampingJurisdiction && (form.stampingJurisdiction !== 'United Arab Emirates (UAE)' || form.stampingEmirate)));

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const names = files.map(f => f.name);
    setUploadedFiles(p => [...p, ...names]);
    setUploading(false);
    e.target.value = '';
  };

  const removeFile = (name) => setUploadedFiles(p => p.filter(f => f !== name));

  const calcPriceRange = () => {
    const l = parseFloat(form.buildingLength) || 0;
    const w = parseFloat(form.buildingWidth) || 0;
    const sqft = l * w;
    if (sqft === 0) return null;

    // Base rate per sq ft for design drawings
    let baseMin = 0.45, baseMax = 0.85;

    // Adjust for project type
    if (form.projectType?.includes('Barndominium')) { baseMin += 0.15; baseMax += 0.25; }
    if (form.projectType?.includes('Commercial')) { baseMin += 0.10; baseMax += 0.20; }

    // Adjust for services
    const yesCount = SERVICES.filter(sv => form[sv.key] === 'Yes').length;
    baseMin += yesCount * 0.05;
    baseMax += yesCount * 0.10;

    // Minimum floor
    const rawMin = Math.max(800, Math.round(sqft * baseMin / 100) * 100);
    const rawMax = Math.max(1400, Math.round(sqft * baseMax / 100) * 100);

    const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;
    return { min: rawMin, max: rawMax, label: `${fmt(rawMin)} – ${fmt(rawMax)}` };
  };

  const priceRange = showResult ? calcPriceRange() : null;

  const handleScopeReview = () => setShowResult(true);

  const handleSubmit = async () => {
    setLoading(true);
    await appClient.entities.ProjectOrder.create({
      projectType: form.projectType,
      buildingLength: form.buildingLength,
      buildingWidth: form.buildingWidth,
      buildingHeight: form.buildingHeight,
      numberOfFloors: form.numberOfFloors,
      roofStyle: form.roofStyle,
      intendedUse: form.intendedUse,
      projectAddress: form.projectLocation,
      hasSitePlan: form.foundation,
      selectedServices: [
        form.foundation === 'Yes' ? 'Foundation plan' : null,
        form.framing === 'Yes' ? 'Structural framing drawings' : null,
        form.mep === 'Yes' ? 'MEP layouts' : null,
        form.calculations === 'Yes' ? 'Structural calculations' : null,
        form.revisions === 'Yes' ? 'Permit review revisions' : null,
      ].filter(Boolean),
      timeline: form.timeline,
      stampingRequired: form.stampingRequired,
      stampingJurisdiction: form.stampingJurisdiction,
      stampingEmirate: form.stampingEmirate,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      uploadedFileNames: uploadedFiles,
      status: 'new',
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <section className="min-h-screen bg-white flex items-center justify-center py-24">
          <div className="text-center max-w-lg px-6">
            <div className="w-16 h-16 bg-yellow flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-navy" />
            </div>
            <div className="font-mono text-steel text-[9px] tracking-widest uppercase mb-3">Scope Submitted</div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-4">Thank You</h2>
            <p className="font-inter text-steel text-base leading-relaxed mb-8">
              Your project scope has been received. We will review your building details, selected services, and project location, then contact you with pricing and next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="yellow-btn px-8 py-3 text-sm inline-block">Return Home</Link>
              <Link to="/order" className="navy-btn px-8 py-3 text-sm inline-block">Full Order Form</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="absolute inset-0">
          <img
            src="/images/post-frame.svg"
            alt="Post-frame structural framing"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[9px] tracking-widest uppercase">Scope Estimator</span>
          </div>
          <h1 className="font-condensed font-black text-white text-3xl lg:text-4xl uppercase tracking-tight mb-2">
            Pole Barn Project Scope Estimator
          </h1>
          <p className="font-inter text-gray-400 text-sm max-w-2xl leading-relaxed">
            Enter your building size and required services. We will use this information to understand the project scope and prepare a quote after review.
          </p>
        </div>
      </div>

      <div className="py-10 bg-white grid-overlay min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Form */}
            <div className="lg:col-span-3 space-y-8">

              {/* Project type */}
              <div>
                <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-3">1. Project Type</div>
                <div className="grid grid-cols-2 gap-2">
                  {PROJECT_TYPES.map(pt => (
                    <button key={pt} onClick={() => update('projectType', pt)}
                      className={`p-3 border text-left font-condensed font-bold text-sm uppercase tracking-tight transition-all ${form.projectType === pt ? 'border-yellow bg-yellow/10 text-navy' : 'border-silver text-steel hover:border-steel/40'}`}>
                      {pt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Building dimensions */}
              <div>
                <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-3">2. Building Details</div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Length (ft)" value={form.buildingLength} onChange={v => update('buildingLength', v)} placeholder="60" />
                    <Field label="Width (ft)" value={form.buildingWidth} onChange={v => update('buildingWidth', v)} placeholder="40" />
                    <Field label="Height (ft)" value={form.buildingHeight} onChange={v => update('buildingHeight', v)} placeholder="14" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SelectField label="Number of Floors" value={form.numberOfFloors} onChange={v => update('numberOfFloors', v)}
                      options={['1', '2', '1.5 (Loft)', 'Other']} />
                    <SelectField label="Roof Style" value={form.roofStyle} onChange={v => update('roofStyle', v)}
                      options={['Gable', 'Hip', 'Gambrel', 'Monitor', 'Shed', 'Other']} />
                  </div>
                  <Field label="Building Use" value={form.intendedUse} onChange={v => update('intendedUse', v)}
                    placeholder="e.g. Vehicle storage, agricultural equipment, residential living..." />
                  <Field label="Project Location" value={form.projectLocation} onChange={v => update('projectLocation', v)}
                    placeholder="City, State/Province, Country" />
                </div>
              </div>

              {/* Services */}
              <div>
                <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-3">3. Services Required</div>
                <div className="border border-silver divide-y divide-silver/60">
                  {SERVICES.map(sv => (
                    <YesNo key={sv.key} label={sv.label} value={form[sv.key]} onChange={v => update(sv.key, v)} />
                  ))}
                </div>
              </div>

              <StampRequestFields
                stampingRequired={form.stampingRequired}
                stampingJurisdiction={form.stampingJurisdiction}
                stampingEmirate={form.stampingEmirate}
                onChange={changes => setForm(prev => ({ ...prev, ...changes }))}
              />

              {/* Upload */}
              <div>
                <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-3">4. Upload Files (Optional)</div>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed border-silver p-8 cursor-pointer hover:border-navy/40 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                  <Upload size={22} className="text-steel mb-2" />
                  <div className="font-condensed font-bold text-navy text-sm uppercase tracking-tight mb-1">
                    {uploading ? 'Uploading...' : 'Click to Upload'}
                  </div>
                  <div className="font-inter text-steel text-xs">Sketches, site plans, survey, permit comments, photos</div>
                  <input type="file" multiple onChange={handleFileChange} className="hidden" />
                </label>
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {uploadedFiles.map((name, i) => (
                      <div key={i} className="flex items-center justify-between border border-silver px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Paperclip size={12} className="text-steel" />
                          <span className="font-inter text-sm text-navy truncate max-w-xs">{name}</span>
                        </div>
                        <button onClick={() => removeFile(name)} className="text-steel hover:text-navy ml-2">
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline + Contact */}
              <div>
                <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-3">5. Timeline & Contact</div>
                <div className="space-y-4">
                  <SelectField label="Preferred Timeline" value={form.timeline} onChange={v => update('timeline', v)}
                    options={['ASAP', '1–2 Weeks', '2–4 Weeks', '1–2 Months', 'Flexible']} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" value={form.fullName} onChange={v => update('fullName', v)} placeholder="Your name" />
                    <Field label="Email Address *" value={form.email} onChange={v => update('email', v)} placeholder="you@email.com" type="email" />
                  </div>
                  <Field label="Phone Number" value={form.phone} onChange={v => update('phone', v)} placeholder="+1 (555) 000-0000" type="tel" />
                </div>
              </div>

              <button
                onClick={handleScopeReview}
                disabled={!form.projectType}
                className="yellow-btn px-8 py-3 text-sm disabled:opacity-40"
              >
                Review Project Scope
              </button>
            </div>

            {/* Result panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                <AnimatePresence mode="wait">
                  {showResult ? (
                    <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="bg-navy p-6">
                      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-4">Scope Review</div>

                      <div className="space-y-2 mb-5 text-xs border-b border-white/10 pb-5">
                        {form.projectType && (
                          <div className="flex justify-between">
                            <span className="font-mono text-gray-400 tracking-wide">Project type</span>
                            <span className="font-inter text-white text-right max-w-[160px]">{form.projectType}</span>
                          </div>
                        )}
                        {form.buildingLength && form.buildingWidth && (
                          <div className="flex justify-between">
                            <span className="font-mono text-gray-400 tracking-wide">Building size</span>
                            <span className="font-inter text-white">{form.buildingLength} × {form.buildingWidth} ft</span>
                          </div>
                        )}
                        {form.projectLocation && (
                          <div className="flex justify-between">
                            <span className="font-mono text-gray-400 tracking-wide">Location</span>
                            <span className="font-inter text-white text-right max-w-[160px]">{form.projectLocation}</span>
                          </div>
                        )}
                        {SERVICES.filter(sv => form[sv.key] === 'Yes').length > 0 && (
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-gray-400 tracking-wide">Services</span>
                            <span className="font-inter text-white text-right max-w-[160px]">
                              {SERVICES.filter(sv => form[sv.key] === 'Yes').map(sv => sv.label.replace(' Required', '')).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>

                      {priceRange && (
                        <div className="bg-yellow/10 border border-yellow/30 p-4 mb-3">
                          <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-1">Estimated Design Package Range</div>
                          <div className="font-condensed font-black text-white text-3xl tracking-tight">{priceRange.label}</div>
                          <p className="font-inter text-gray-400 text-[10px] mt-1 leading-relaxed">Starting range for drafting and drawings only; professional review and stamping are priced separately according to the selected jurisdiction. Final quote may vary based on complexity and permit scope.</p>
                        </div>
                      )}

                      <div className="bg-white/5 border border-white/10 p-4 mb-5">
                        <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-2">Next Steps</div>
                        <p className="font-inter text-gray-300 text-xs leading-relaxed">
                          Submit your contact info and we'll confirm your quote within 1 business day, tailored to your exact building specs, location, and required permit documents.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <button onClick={handleSubmit} disabled={loading || !canSubmit}
                          className="yellow-btn w-full py-3 text-xs text-center disabled:opacity-50">
                          {loading ? 'Submitting...' : 'Submit for Pricing Review'}
                        </button>
                        <Link to="/order" className="block w-full text-center py-3 border border-white/20 text-white font-condensed font-bold text-xs uppercase tracking-wide hover:border-yellow hover:text-yellow transition-colors">
                          Start Full Order
                        </Link>
                        <Link to="/contact" className="block w-full text-center py-3 border border-white/10 text-gray-400 font-condensed font-bold text-xs uppercase tracking-wide hover:text-white transition-colors">
                          Contact Us
                        </Link>
                      </div>

                      <p className="font-mono text-gray-600 text-[8px] tracking-wide leading-relaxed mt-5">
                        Final pricing depends on project complexity, location, available information, required drawings, calculation scope, and permit review requirements.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="border-2 border-dashed border-silver p-8 text-center">
                      <div className="w-10 h-10 border-2 border-silver flex items-center justify-center mx-auto mb-3">
                        <div className="w-4 h-4 bg-silver" />
                      </div>
                      <div className="font-condensed font-bold text-steel text-sm uppercase tracking-tight mb-1">Project Scope</div>
                      <p className="font-inter text-steel/60 text-xs">Select a project type and fill in your details, then click Review Project Scope.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-4 bg-silver/30 border border-silver">
                  <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-2">Need the full form?</div>
                  <p className="font-inter text-steel text-xs leading-relaxed mb-3">Use our detailed order form to specify building dimensions, site details, permit requirements, and attach project files.</p>
                  <Link to="/order" className="font-mono text-[9px] text-navy tracking-widest uppercase hover:text-yellow transition-colors">
                    Start My Design Order →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}