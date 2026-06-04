import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Layers, Grid, Zap, Calculator, RefreshCw, Home, Tractor } from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: 'Architectural Plans',
    desc: 'Floor plans, elevations, building sections, and sheet layout for permit submission or contractor use.',
    path: '/services',
    tag: 'ARCH-01',
  },
  {
    icon: Layers,
    title: 'Foundation Design',
    desc: 'Concrete slab, post footing layouts, anchor bolt plans, and foundation details for code-compliant construction.',
    path: '/services',
    tag: 'FND-02',
  },
  {
    icon: Grid,
    title: 'Structural Framing',
    desc: 'Post, beam, rafter, girt, purlin, truss coordination, bracing design, and connection details.',
    path: '/services',
    tag: 'STR-03',
  },
  {
    icon: Zap,
    title: 'MEP Layouts',
    desc: 'Electrical, plumbing, HVAC, lighting, and drainage coordination for building permit packages.',
    path: '/services',
    tag: 'MEP-04',
  },
  {
    icon: Calculator,
    title: 'Engineering Calculations',
    desc: 'Structural calculations for posts, beams, rafters, footings, uplift, lateral loads, and load paths.',
    path: '/services',
    tag: 'CALC-05',
  },
  {
    icon: RefreshCw,
    title: 'Permit Review Revisions',
    desc: 'Drawing revisions for city, county, or permit review comments. Fast turnaround for plan check responses.',
    path: '/services',
    tag: 'REV-06',
  },
  {
    icon: Home,
    title: 'Barndominium Plans',
    desc: 'Complete barndominium design packages combining living quarters and functional utility space.',
    path: '/services',
    tag: 'BRN-07',
  },
  {
    icon: Tractor,
    title: 'Agricultural & Storage Buildings',
    desc: 'Farm buildings, equipment storage, riding arenas, and utility building design packages.',
    path: '/services',
    tag: 'AGR-08',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white grid-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-steel text-[10px] tracking-widest uppercase">CAD Construction Services</span>
          </div>
          <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight">
            Pole Barn & Post-Frame<br />Design Services
          </h2>
          <p className="font-inter text-steel text-base mt-4 max-w-2xl leading-relaxed">
            Pole Barndominium Designs provides a full range of CAD drawing services for pole barn, post-frame, and barndominium projects — from architectural floor plans and foundation layouts to structural framing, MEP coordination, and engineering calculations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-silver">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={svc.path}
                  className="group block p-6 border-b border-r border-silver hover:bg-navy transition-colors duration-300 relative overflow-hidden h-full"
                >
                  <div className="absolute top-3 right-3 font-mono text-[8px] text-silver group-hover:text-yellow/40 tracking-widest transition-colors">{svc.tag}</div>
                  <div className="w-10 h-10 bg-yellow/10 group-hover:bg-yellow/20 flex items-center justify-center mb-4 transition-colors">
                    <Icon size={18} className="text-navy group-hover:text-yellow transition-colors" />
                  </div>
                  <h3 className="font-condensed font-bold text-navy group-hover:text-white text-lg uppercase tracking-tight mb-2 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="font-inter text-steel group-hover:text-gray-300 text-sm leading-relaxed transition-colors">
                    {svc.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Learn More</span>
                    <div className="w-4 h-px bg-yellow" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/services" className="navy-btn px-10 py-4 text-sm">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}