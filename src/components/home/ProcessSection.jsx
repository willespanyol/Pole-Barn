import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Submit Project Details',
    desc: 'Use our order form to submit your building dimensions, site location, intended use, and project requirements.',
  },
  {
    num: '02',
    title: 'Upload Sketches & Site Plans',
    desc: 'Attach any existing sketches, site plans, permit checklists, or permit correction comments to your submission.',
  },
  {
    num: '03',
    title: 'We Review the Scope',
    desc: 'We review your building type, dimensions, site conditions, and local code requirements, then confirm the drawing scope.',
  },
  {
    num: '04',
    title: 'Drawings & Calculations Prepared',
    desc: 'Floor plans, elevations, foundation layout, structural framing, MEP coordination, and structural calculations are prepared.',
  },
  {
    num: '05',
    title: 'Final Package Delivered',
    desc: 'The complete, labeled drawing set is delivered as a PDF package — ready for permit submission, engineering review, or contractor pricing.',
  },
  {
    num: '06',
    title: 'Revisions Completed if Needed',
    desc: 'If the permit office issues correction comments, we revise the drawing set and prepare a response letter as needed.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">How It Works</span>
            <div className="w-8 h-px bg-yellow" />
          </div>
          <h2 className="font-condensed font-black text-white text-4xl lg:text-5xl uppercase tracking-tight">
            From Submission to <span className="text-yellow">Permit-Ready</span> Package
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative border border-white/10 p-6 hover:border-yellow/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 border-2 border-yellow bg-navy flex items-center justify-center flex-shrink-0">
                  <span className="font-condensed font-black text-yellow text-lg">{step.num}</span>
                </div>
                <h3 className="font-condensed font-bold text-white text-base uppercase tracking-tight leading-tight">
                  {step.title}
                </h3>
              </div>
              <p className="font-inter text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}