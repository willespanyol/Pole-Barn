import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const deliverables = [
  'Cover sheet and project notes',
  'Floor plans',
  'Exterior elevations',
  'Building sections',
  'Foundation plan',
  'Post and footing layout',
  'Roof framing plan',
  'Wall framing details',
  'Connection details',
  'MEP layout drawings',
  'Structural calculation report',
  'Permit response revisions',
];

export default function DeliverablesSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Typical Deliverables</span>
            </div>
            <h2 className="font-condensed font-black text-white text-4xl lg:text-5xl uppercase tracking-tight mb-6">
              What's Included<br />
              <span className="text-yellow">In Your Drawing Package</span>
            </h2>
            <p className="font-inter text-gray-400 text-base leading-relaxed mb-4">
              Every drawing package is organized and labeled for permit submission. The list below represents a full permit-ready set. Individual sheets are included based on your project scope and what your permit office or engineer requires.
            </p>
            <p className="font-inter text-gray-500 text-sm leading-relaxed">
              Packages are delivered as a PDF drawing set. Files can be submitted directly to your local building department, forwarded to a licensed engineer for stamp, or provided to your contractor for pricing and construction.
            </p>
          </div>

          {/* Right - deliverables list */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deliverables.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 border border-white/10 px-4 py-3 hover:border-yellow/30 transition-colors group"
                >
                  <div className="w-5 h-5 bg-yellow/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow/30 transition-colors">
                    <FileText size={10} className="text-yellow" />
                  </div>
                  <span className="font-inter text-gray-300 text-sm">{d}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}