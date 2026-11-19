import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { appClient } from '@/api/appClient';
import PageLayout from '../components/layout/PageLayout';
import OrderStep1 from '../components/order/OrderStep1';
import OrderStep2 from '../components/order/OrderStep2';
import OrderStep3 from '../components/order/OrderStep3';
import OrderStep4 from '../components/order/OrderStep4';
import OrderStep5 from '../components/order/OrderStep5';
import OrderStep6 from '../components/order/OrderStep6';

const STEPS = [
  'Project Type',
  'Building Details',
  'Services',
  'Site & Permit',
  'Upload Files',
  'Contact',
];

const initialData = {
  projectType: '',
  buildingLength: '', buildingWidth: '', buildingHeight: '',
  numberOfFloors: '', roofStyle: '', roofPitch: '', wallHeight: '',
  baySpacing: '', numberOfDoors: '', numberOfWindows: '',
  intendedUse: '', useCategory: '', needsInteriorRooms: '', needsLoft: '', needsPorch: '',
  selectedServices: [],
  projectAddress: '', city: '', state: '', county: '', country: '',
  buildingDepartment: '', forPermitSubmission: '', hasPermitComments: '',
  stampingRequired: '', stampingJurisdiction: '', stampingEmirate: '',
  buildingCode: '', windSpeed: '', snowLoad: '', seismicCategory: '', soilBearing: '',
  floodZone: '', hasSitePlan: '', hasSurvey: '',
  selectedPackage: '', selectedAddOns: [],
  timeline: '', preferredDeadline: '',
  fullName: '', email: '', phone: '', companyName: '', contactMethod: '',
  projectDescription: '',
  uploadedFileNames: [],
};

export default function Order() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateData = (updates) => setData(prev => ({ ...prev, ...updates }));

  const handleSubmit = async () => {
    if (data.stampingRequired === 'Yes' && (!data.stampingJurisdiction || (data.stampingJurisdiction === 'United Arab Emirates (UAE)' && !data.stampingEmirate))) {
      setStep(3);
      return;
    }
    setLoading(true);
    const order = await appClient.entities.ProjectOrder.create(data);
    // Create tentative Google Calendar consultation event
    try {
      const result = await appClient.functions.invoke('createConsultationEvent', {
        orderId: order.id,
        clientName: data.fullName,
        clientEmail: data.email,
        projectType: data.projectType,
        projectLocation: [data.city, data.state, data.country].filter(Boolean).join(', '),
      });
      if (result.data?.eventId) {
        await appClient.entities.ProjectOrder.update(order.id, { calendarEventId: result.data.eventId });
      }
    } catch (_) { /* non-blocking */ }
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
            <div className="font-mono text-steel text-[9px] tracking-widest uppercase mb-3">Request Submitted</div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-4">Thank You</h2>
            <p className="font-inter text-steel text-base leading-relaxed mb-8">
              Your project files have been received. Our team will review your drawings, sketches, survey, or city comments and contact you with the next step and drawing package options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/14803383000" target="_blank" rel="noopener noreferrer" className="yellow-btn px-8 py-3 text-sm inline-block">Message on WhatsApp</a>
              <Link to="/" className="navy-btn px-8 py-3 text-sm inline-block">Return Home</Link>
              <Link to="/services" className="border border-navy text-navy hover:bg-navy hover:text-white font-condensed font-bold text-sm uppercase tracking-wide px-8 py-3 inline-block transition-colors">View Services</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const stepComponents = [
    <OrderStep1 data={data} updateData={updateData} />,
    <OrderStep2 data={data} updateData={updateData} />,
    <OrderStep3 data={data} updateData={updateData} />,
    <OrderStep4 data={data} updateData={updateData} />,
    <OrderStep5 data={data} updateData={updateData} />,
    <OrderStep6 data={data} updateData={updateData} />,
  ];

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="absolute inset-0">
          <img
            src="/images/post-frame.svg"
            alt="Structural framing"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[9px] tracking-widest uppercase">Project Order Form</span>
          </div>
          <h1 className="font-condensed font-black text-white text-3xl lg:text-4xl uppercase tracking-tight mb-2">
            Upload Plans for Quote
          </h1>
          <p className="font-inter text-gray-400 text-sm max-w-2xl leading-relaxed">
            Submit your sketches, drawings, survey, permit comments, or project details. Our team will review your files and contact you with drawing package options and pricing.
          </p>
        </div>
      </div>

      {/* Step progress */}
      <div className="bg-white border-b border-silver sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto py-3 gap-0 no-scrollbar">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 ${i <= step ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center font-mono text-[10px] font-bold transition-colors flex-shrink-0
                    ${i < step ? 'bg-navy text-white' : i === step ? 'bg-yellow text-navy' : 'bg-silver text-steel'}`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`font-condensed text-xs uppercase tracking-tight font-bold hidden sm:block whitespace-nowrap ${i === step ? 'text-navy' : 'text-steel/50'}`}>{s}</span>
                </button>
                {i < STEPS.length - 1 && <div className={`w-4 h-px flex-shrink-0 ${i < step ? 'bg-navy' : 'bg-silver'}`} />}
              </div>
            ))}
          </div>
          <div className="h-0.5 bg-silver">
            <div className="h-0.5 bg-yellow transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Form body */}
      <div className="py-10 bg-white grid-overlay min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-silver p-8 lg:p-10"
            >
              {stepComponents[step]}
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 font-inter text-steel text-xs leading-relaxed">
            Need signed and sealed documents for submission? Select professional stamping under Site &amp; Permit. Our multidisciplinary team coordinates drawings, engineering review and licensed professional sealing for US and UAE projects.
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4 pt-5 border-t border-silver">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 font-condensed font-bold text-steel text-sm uppercase tracking-wide disabled:opacity-30 hover:text-navy transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
                className="yellow-btn px-8 py-3 text-sm flex items-center gap-2"
              >
                Continue <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !data.fullName || !data.email}
                className="yellow-btn px-10 py-3 text-sm disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Project Request'}
              </button>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}