import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Droplets, Wind, Navigation } from 'lucide-react';

const mepSystems = [
  {
    icon: Zap,
    title: 'Electrical Layout',
    tag: 'ELEC',
    items: ['Panel location and circuit layout', 'Outlet and receptacle plan', 'Lighting fixture layout', 'Switch locations', '240V circuit routing for equipment', 'Conduit routing notes'],
  },
  {
    icon: Droplets,
    title: 'Plumbing Layout',
    tag: 'PLMB',
    items: ['Fixture location plan', 'Water supply rough-in layout', 'Drain and waste line routing', 'Hose bib and utility sink locations', 'Water heater location', 'Cleanout locations'],
  },
  {
    icon: Wind,
    title: 'HVAC Layout',
    tag: 'HVAC',
    items: ['Heating unit location and clearances', 'Duct routing plan', 'Ventilation fan placement', 'Radiant heat layout (where applicable)', 'Mini-split placement and refrigerant line routing', 'Louver and ventilation opening layout'],
  },
  {
    icon: Navigation,
    title: 'Drainage Coordination',
    tag: 'DRAIN',
    items: ['Floor drain locations', 'Site drainage coordination notes', 'Slope-to-drain slab notes', 'Downspout discharge locations', 'Retention pond or infiltration notes (where applicable)'],
  },
];

export default function MepDesign() {
  return (
    <PageLayout>
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">MEP Design</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-5 max-w-3xl">
            MEP Layout Design for Pole Barns & Post-Frame Buildings
          </h1>
          <p className="font-inter text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
            Electrical, plumbing, HVAC, and drainage layout drawings for pole barn permit packages and construction documentation. MEP layouts coordinated with architectural and structural plans.
          </p>
          <Link to="/order" className="yellow-btn px-8 py-4 text-sm inline-flex items-center gap-2">
            Request MEP Design <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="w-8 h-px bg-yellow mb-3" />
            <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight">MEP System Layout Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {mepSystems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <motion.div
                  key={sys.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-silver p-6 hover:border-navy/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow/10 flex items-center justify-center">
                      <Icon size={18} className="text-navy" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-steel/50 tracking-widest">{sys.tag}</div>
                      <h3 className="font-condensed font-bold text-navy text-lg uppercase tracking-tight">{sys.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {sys.items.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow mt-2 flex-shrink-0" />
                        <span className="font-inter text-steel text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-silver/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-condensed font-bold text-navy text-2xl uppercase tracking-tight mb-4">MEP Drawings for Pole Barn Permit Packages</h2>
          <p className="font-inter text-steel text-base leading-relaxed mb-4">
            Pole Barndominium Designs prepares MEP layout drawings for pole barns, post-frame buildings, barndominiums, and agricultural structures. Electrical, plumbing, HVAC, and drainage layout plans are coordinated with architectural and structural plans to create a complete permit-ready drawing package.
          </p>
          <p className="font-inter text-steel text-base leading-relaxed">
            MEP layouts show fixture, equipment, and rough-in locations required for permit review. Detailed contractor-level MEP design and engineering is performed by licensed MEP engineers when required by your jurisdiction.
          </p>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">Need MEP Drawings?</h2>
          <p className="font-inter text-gray-400 mb-8">Tell us your building size, location, and MEP requirements. We'll prepare layout drawings for your permit package.</p>
          <Link to="/order" className="yellow-btn px-10 py-4 text-base inline-block">Start My Design Order</Link>
        </div>
      </section>
    </PageLayout>
  );
}