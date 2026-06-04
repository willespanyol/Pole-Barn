import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const calcItems = [
  'Design load summary (dead, live, wind, snow, seismic)',
  'Post and column capacity analysis',
  'Beam and header sizing calculations',
  'Rafter, purlin, and girt design',
  'Footing bearing pressure and sizing',
  'Uplift and hold-down force calculations',
  'Lateral load analysis and bracing design',
  'Load path analysis from roof to foundation',
  'Truss reaction loads and bearing design',
  'Formal calculation report in PDF format',
];

const loadTypes = [
  { label: 'Dead Loads', desc: 'Weight of structural materials, roofing, siding, insulation, and permanent fixtures.' },
  { label: 'Live Loads', desc: 'Occupancy loads, floor loading for mezzanines, attics, and second floors.' },
  { label: 'Wind Loads', desc: 'Wind speed, exposure category, and building shape-based lateral and uplift pressures.' },
  { label: 'Snow Loads', desc: 'Ground snow load converted to roof snow load based on roof slope and exposure.' },
  { label: 'Seismic Loads', desc: 'Seismic design category, response coefficient, and base shear calculations.' },
  { label: 'Uplift Forces', desc: 'Net uplift on roof framing and foundation anchors from wind loading.' },
];

export default function StructuralCalculations() {
  return (
    <PageLayout>
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Structural Engineering</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-5 max-w-3xl">
            Structural Calculations for Pole Barns & Post-Frame Buildings
          </h1>
          <p className="font-inter text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
            Engineering calculation reports for posts, beams, rafters, footings, uplift forces, lateral loads, and load path analysis. Prepared to support permit applications and construction documentation.
          </p>
          <Link to="/order" className="yellow-btn px-8 py-4 text-sm inline-flex items-center gap-2">
            Request Calculations <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-6">Calculation Report Includes</h2>
              <ul className="space-y-3">
                {calcItems.map(item => (
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
              <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-6">Load Types Analyzed</h2>
              <div className="space-y-4">
                {loadTypes.map((lt, i) => (
                  <motion.div
                    key={lt.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-silver p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-yellow" />
                      <span className="font-condensed font-bold text-navy text-sm uppercase tracking-tight">{lt.label}</span>
                    </div>
                    <p className="font-inter text-steel text-sm">{lt.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-silver/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-condensed font-bold text-navy text-2xl uppercase tracking-tight mb-4">Pole Barn Structural Calculations</h2>
          <p className="font-inter text-steel text-base leading-relaxed mb-4">
            Pole Barndominium Designs prepares structural calculation reports for pole barns, post-frame buildings, barndominiums, and agricultural structures. Calculations address design loads, member sizing, footing design, uplift, and lateral analysis in accordance with applicable building codes.
          </p>
          <p className="font-inter text-steel text-base leading-relaxed">
            Calculation reports can be submitted with permit applications or used to support engineer review. If your local jurisdiction requires stamped calculations, we can coordinate with a licensed engineer for your jurisdiction.
          </p>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">Need Structural Calculations?</h2>
          <p className="font-inter text-gray-400 mb-8">Submit your project details, building size, and location. We'll prepare a structural calculation report for your permit or construction package.</p>
          <Link to="/order" className="yellow-btn px-10 py-4 text-base inline-block">Start My Design Order</Link>
        </div>
      </section>
    </PageLayout>
  );
}