import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
  'Floor plans with bay spacing and post layout',
  'Exterior elevations showing all four sides',
  'Foundation plan with footing dimensions',
  'Roof framing plan with rafter and truss layout',
  'Wall framing details with girt spacing',
  'Connection hardware details and schedules',
  'Door and window schedule',
  'General construction notes',
  'Structural calculation report (where required)',
  'MEP layout coordination (optional)',
];

const buildingTypes = [
  { name: 'Standard Pole Barn', desc: 'Open-span agricultural or storage buildings with post-frame construction.' },
  { name: 'Post-Frame Garage', desc: 'Residential and commercial garage structures with optional living space above.' },
  { name: 'Equipment Storage', desc: 'Large-span clear-span buildings for farm equipment, vehicles, and machinery.' },
  { name: 'Farm Utility Buildings', desc: 'Livestock housing, hay storage, implement sheds, and multi-use farm structures.' },
  { name: 'Riding Arenas', desc: 'Large-span indoor riding arenas with proper ventilation and door placement.' },
  { name: 'Commercial Storage', desc: 'Multi-bay commercial post-frame storage and warehouse structures.' },
];

export default function PoleBarnDesign() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Pole Barn & Post-Frame</span>
            </div>
            <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-5">
              Pole Barn Design Plans
            </h1>
            <p className="font-inter text-gray-300 text-lg leading-relaxed mb-8">
              Permit-ready pole barn and post-frame building design. Architectural drawings, foundation layouts, structural framing plans, and engineering calculations for residential, agricultural, and commercial pole barn projects.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/order" className="yellow-btn px-8 py-4 text-sm flex items-center gap-2">
                Get Pole Barn Plans <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="border border-white/30 text-white px-8 py-4 font-condensed font-bold text-sm uppercase tracking-wide hover:border-yellow hover:text-yellow transition-colors">
                Ask a Question
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/pole-barn.svg"
              alt="Pole barn exterior"
              className="w-full object-cover"
              style={{ height: '400px' }}
            />
            <div className="absolute inset-0 border border-yellow/20" />
            <div className="absolute top-4 left-4 font-mono text-yellow text-[9px] tracking-widest">POLE BARN · POST-FRAME DESIGN</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-yellow" />
                <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Drawing Package</span>
              </div>
              <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-4">
                What's in Your Pole Barn Drawing Package
              </h2>
              <p className="font-inter text-steel text-base leading-relaxed mb-8">
                Each pole barn design package is organized for permit submission and contractor use. Sheet sets include all required drawings for your local building department.
              </p>
              <ul className="space-y-3">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={11} className="text-navy" />
                    </div>
                    <span className="font-inter text-steel text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-yellow" />
                <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Building Types</span>
              </div>
              <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-6">
                Pole Barn Types We Design
              </h2>
              <div className="space-y-3">
                {buildingTypes.map((bt, i) => (
                  <motion.div
                    key={bt.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-silver p-4 hover:border-navy/30 transition-colors"
                  >
                    <h3 className="font-condensed font-bold text-navy text-base uppercase tracking-tight mb-1">{bt.name}</h3>
                    <p className="font-inter text-steel text-sm">{bt.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO text block */}
      <section className="py-16 bg-silver/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-condensed font-bold text-navy text-2xl uppercase tracking-tight mb-4">Pole Barn Design and Post-Frame Building Plans</h2>
          <p className="font-inter text-steel text-base leading-relaxed mb-4">
            Pole Barndominium Designs prepares pole barn plans and post-frame building drawings for residential, agricultural, and commercial projects worldwide. Our pole barn design service includes permit-ready floor plans, foundation layouts, structural framing details, and engineering calculations.
          </p>
          <p className="font-inter text-steel text-base leading-relaxed">
            Whether you need pole barn plans for a 30x40 storage building, a 40x60 farm shop, a 60x100 riding arena, or a large commercial post-frame structure, we can prepare a complete drawing package for permit submission, contractor bidding, or construction documentation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">Need Pole Barn Plans?</h2>
          <p className="font-inter text-gray-400 mb-8">Tell us your building size, location, and project requirements. We'll prepare permit-ready pole barn drawings for your project.</p>
          <Link to="/order" className="yellow-btn px-10 py-4 text-base inline-block">Start Your Pole Barn Design</Link>
        </div>
      </section>
    </PageLayout>
  );
}