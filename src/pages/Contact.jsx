import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { appClient } from '@/api/appClient';
import FileUploader from '../components/shared/FileUploader';
import MobileSelect from '../components/mobile/MobileSelect';

const CHECKLIST = [
  'Building length, width, and height',
  'Project location (city, state/province, county, country)',
  'Intended building use',
  'Site plan or survey if available',
  'Sketches or inspiration images',
  'Permit checklist or review comments',
  'Required services',
  'Preferred timeline',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', projectLocation: '',
    buildingType: '', buildingSize: '', servicesNeeded: '',
    permitStatus: '', projectDescription: '', budgetRange: '',
  });
  const [fileData, setFileData] = useState({ urls: [], names: [] });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await appClient.entities.ContactInquiry.create({
      ...form,
      file_name: fileData.names.join(', ') || null,
      file_urls: fileData.urls,
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <section className="min-h-screen bg-white flex items-center justify-center py-24">
          <div className="text-center max-w-lg px-4">
            <div className="w-16 h-16 bg-yellow flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={28} className="text-navy" />
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-4">Inquiry Received</h2>
            <p className="font-inter text-steel text-base leading-relaxed mb-8">
              Thank you for reaching out. We will review your project details and contact you with next steps, drawing package options, and pricing. For urgent permit comments or active construction questions, message us on WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/14803383000" target="_blank" rel="noopener noreferrer" className="yellow-btn px-8 py-4 text-sm inline-block">Message on WhatsApp</a>
              <Link to="/" className="navy-btn px-8 py-4 text-sm inline-block">Return Home</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="absolute inset-0">
          <img
            src="/images/barndominium.svg"
            alt="Professional CAD drafting consultation"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Contact</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-4">
            Contact Pole Barndominium<br />Designs
          </h1>
          <p className="font-inter text-gray-400 text-base max-w-2xl leading-relaxed">
            Send your project details, drawings, sketches, or permit comments. We will review the information and contact you with the next steps.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <div className="font-mono text-steel text-[9px] tracking-widest uppercase mb-5">Get in Touch</div>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-navy" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-0.5">Email</div>
                      <a href="mailto:willymwangi997@gmail.com" className="font-inter text-navy text-sm hover:text-yellow transition-colors break-all">
                        willymwangi997@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-navy" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-0.5">Phone / WhatsApp</div>
                      <a href="tel:+14803383000" className="font-inter text-navy text-sm hover:text-yellow transition-colors">
                        +1 (480) 338-3000
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-navy" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-0.5">Service Area</div>
                      <span className="font-inter text-steel text-sm">Worldwide — Remote Design Service</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Helpful info checklist */}
              <div className="border border-silver p-5 bg-silver/10">
                <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-3">Helpful Information to Send</div>
                <ul className="space-y-2">
                  {CHECKLIST.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={9} className="text-navy" />
                      </div>
                      <span className="font-inter text-steel text-xs leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-silver p-5 bg-silver/10">
                <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-2">Need the Full Order Form?</div>
                <p className="font-inter text-steel text-sm mb-4 leading-relaxed">Use our detailed project order form to submit building dimensions, site information, selected services, and project files in one step.</p>
                <Link to="/order" className="yellow-btn px-5 py-2.5 text-xs inline-block">Start My Design Order</Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Full Name *</label>
                    <input required value={form.name} onChange={e => update('name', e.target.value)}
                      className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                      className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
                      placeholder="you@email.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Phone Number</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)}
                      className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
                      placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Project Location</label>
                    <input value={form.projectLocation} onChange={e => update('projectLocation', e.target.value)}
                      className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
                      placeholder="City, State/Province, Country" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Building Type</label>
                    <MobileSelect
                      label="Building Type"
                      value={form.buildingType}
                      onChange={val => update('buildingType', val)}
                      options={['Pole Barn','Post-Frame Building','Barndominium','Garage','Workshop','Agricultural Building','Equipment Storage','Commercial Storage','Other'].map(t => ({ value: t, label: t }))}
                      placeholder="Select type"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Building Size</label>
                    <input value={form.buildingSize} onChange={e => update('buildingSize', e.target.value)}
                      className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
                      placeholder="e.g. 40×60 ft" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Budget Range</label>
                    <MobileSelect
                      label="Budget Range"
                      value={form.budgetRange}
                      onChange={val => update('budgetRange', val)}
                      options={['Under $500','$500 – $1,000','$1,000 – $2,500','$2,500 – $5,000','$5,000 – $10,000','$10,000+','Not sure yet'].map(r => ({ value: r, label: r }))}
                      placeholder="Select range"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Services Needed</label>
                    <input value={form.servicesNeeded} onChange={e => update('servicesNeeded', e.target.value)}
                      className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
                      placeholder="e.g. Architectural, Foundation, Framing, MEP" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Permit Status</label>
                    <MobileSelect
                      label="Permit Status"
                      value={form.permitStatus}
                      onChange={val => update('permitStatus', val)}
                      options={['Not yet submitted','Permit application in progress','Permit comments received','Permit approved','No permit required'].map(o => ({ value: o, label: o }))}
                      placeholder="Select..."
                    />
                  </div>
                </div>

                {/* File upload */}
                <FileUploader
                  label="Upload Files"
                  fileUrls={fileData.urls}
                  fileNames={fileData.names}
                  onChange={setFileData}
                />

                <div>
                  <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Message</label>
                  <textarea value={form.projectDescription} onChange={e => update('projectDescription', e.target.value)}
                    rows={5}
                    className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors resize-none"
                    placeholder="Describe your project, required drawings, permit needs, or any specific requirements..." />
                </div>

                <button type="submit" disabled={loading}
                  className="yellow-btn px-10 py-4 text-sm flex items-center gap-2 disabled:opacity-60">
                  {loading ? 'Sending...' : <><Send size={14} /> Submit Project Inquiry</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}