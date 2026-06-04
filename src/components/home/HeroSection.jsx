import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { appClient } from '@/api/appClient';

const trustPoints = [
  'We help contractors prepare permit-ready drawings',
  'Work from sketches, PDFs, CAD, surveys, or city comments',
  'Pole barns, barndominiums, garages, workshops',
  'Structural calculations and MEP layouts included',
  'City comment response support available',
  'Remote design service — clients worldwide',
];

export default function HeroSection() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 blueprint-bg opacity-60" />

        <div className="absolute inset-0">
          <img
            src="/images/pole-barn.svg"
            alt="Modern completed pole barn exterior"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/50" />
        </div>

        {/* Technical corner marks */}
        <div className="absolute top-8 left-8 w-6 h-6 border-l-2 border-t-2 border-yellow/40" />
        <div className="absolute top-8 right-8 w-6 h-6 border-r-2 border-t-2 border-yellow/40" />
        <div className="absolute bottom-20 left-8 w-6 h-6 border-l-2 border-b-2 border-yellow/40" />
        <div className="absolute bottom-20 right-8 w-6 h-6 border-r-2 border-b-2 border-yellow/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Pole Barndominium Designs</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-condensed font-black text-white text-5xl sm:text-6xl lg:text-7xl uppercase leading-none tracking-tight mb-6"
            >
              Pole Barn and<br />
              <span className="text-yellow">Barndominium</span><br />
              Permit Plans for Contractors
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-inter text-gray-300 text-lg leading-relaxed max-w-2xl mb-10"
            >
              Architectural plans, structural calculations, foundation and framing drawings, MEP layouts, and construction documentation for post-frame buildings, barndominiums, garages, workshops, agricultural buildings, and rural residential projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/order"
                className="yellow-btn px-8 py-4 text-base flex items-center justify-center gap-2 group"
                onClick={() => appClient.analytics.track({ eventName: 'upload_plans_clicked', properties: { source: 'hero' } })}
              >
                Upload Plans for Quote
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="px-8 py-4 border-2 border-white/30 text-white font-condensed font-bold text-base uppercase tracking-wide hover:border-yellow hover:text-yellow transition-colors flex items-center justify-center">
                View Contractor Services
              </Link>
              <Link to="/contact" className="px-8 py-4 border-2 border-white/30 text-white font-condensed font-bold text-base uppercase tracking-wide hover:border-yellow hover:text-yellow transition-colors flex items-center justify-center">
                Send City Comments
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="font-mono text-gray-500 text-[9px] tracking-widest">SCROLL</div>
          <ChevronDown size={14} className="text-gray-500" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-silver/40 border-b border-silver py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-yellow flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={11} className="text-navy" />
                </div>
                <span className="font-inter text-steel text-xs font-medium leading-tight">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}