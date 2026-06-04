import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const includes = [
  'Full floor plan with living and utility zone layout',
  'Kitchen, bathroom, and bedroom design',
  'Open-concept living area layout',
  'Exterior elevations (all four sides)',
  'Foundation plan for combined structure',
  'Structural framing design for hybrid build',
  'MEP layout for residential and utility areas',
  'Door, window, and finish schedules',
  'Loft and mezzanine design (where applicable)',
  'Permit-ready drawing package',
];

const layouts = [
  { title: 'Live-Work Combo', desc: 'Living space on one side, shop or storage on the other. Popular for farms, ranches, and home businesses.' },
  { title: 'Full Residential Barndominium', desc: 'Complete living quarters with open floor plan inside a post-frame shell. Metal exterior, residential interior.' },
  { title: 'Shop-House Design', desc: 'Large shop or garage space with a finished living suite attached or above.' },
  { title: 'Multi-Use Agricultural', desc: 'Living quarters combined with livestock, hay storage, or equipment space on a working farm.' },
  { title: 'Vacation or Guest House', desc: 'Rural barndominium as a vacation home, hunting cabin, or guest retreat on rural property.' },
];

export default function BarndominiumDesign() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Barndominium Plans</span>
            </div>
            <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-5">
              Barndominium Design Plans
            </h1>
            <p className="font-inter text-gray-300 text-lg leading-relaxed mb-8">
              Custom barndominium design packages combining residential living space with functional utility, shop, or agricultural areas inside a post-frame structure. Permit-ready plans for builders, permit offices, and lenders.
            </p>
            <Link to="/order" className="yellow-btn px-8 py-4 text-sm inline-flex items-center gap-2">
              Get Barndominium Plans <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative">
            <img
              src="/images/barndominium.svg"
              alt="Barndominium design consultation"
              className="w-full object-cover"
              style={{ height: '400px' }}
            />
            <div className="absolute inset-0 border border-yellow/20" />
          </div>
        </div>
      </section>

      {/* Includes + layouts */}
      <section className="py-20 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-6">What's Included</h2>
              <ul className="space-y-3">
                {includes.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={11} className="text-navy" />
                    </div>
                    <span className="font-inter text-steel text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-6">Barndominium Layout Types</h2>
              <div className="space-y-3">
                {layouts.map((l, i) => (
                  <motion.div
                    key={l.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-l-2 border-yellow pl-4 py-1"
                  >
                    <h3 className="font-condensed font-bold text-navy text-base uppercase tracking-tight">{l.title}</h3>
                    <p className="font-inter text-steel text-sm mt-1">{l.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-silver/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-condensed font-bold text-navy text-2xl uppercase tracking-tight mb-4">Barndominium Design and Plans</h2>
          <p className="font-inter text-steel text-base leading-relaxed mb-4">
            Pole Barndominium Designs prepares custom barndominium plans for residential, agricultural, and mixed-use projects. Our barndominium design service covers floor plan layout, exterior elevations, foundation design, structural framing coordination, and MEP layout for both the living and utility areas.
          </p>
          <p className="font-inter text-steel text-base leading-relaxed">
            Barndominium plans are prepared for permit submission, lender review, and contractor bidding. If you need a complete set of barndominium drawings including structural calculations and MEP coordination, we can prepare a full design package for your project.
          </p>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">Ready to Design Your Barndominium?</h2>
          <p className="font-inter text-gray-400 mb-8">Submit your building size, floor plan ideas, and location. We'll prepare a complete barndominium drawing package for your project.</p>
          <Link to="/order" className="yellow-btn px-10 py-4 text-base inline-block">Start Barndominium Design</Link>
        </div>
      </section>
    </PageLayout>
  );
}