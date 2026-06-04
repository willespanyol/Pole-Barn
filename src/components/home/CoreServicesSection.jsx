import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Layers, Grid, Zap, Calculator, RefreshCw } from 'lucide-react';

const services = [
  {
    icon: FileText,
    tag: 'ARCH-01',
    title: 'Architectural Plans',
    desc: 'Floor plans, exterior elevations, building sections, and sheet layout organized for permit submission or contractor use.',
    img: '/images/barndominium.svg',
  },
  {
    icon: Layers,
    tag: 'FND-02',
    title: 'Foundation Design',
    desc: 'Concrete slab plans, post footing layouts, anchor bolt layouts, and foundation section details.',
    img: '/images/garage-workshop.svg',
  },
  {
    icon: Grid,
    tag: 'STR-03',
    title: 'Structural Framing',
    desc: 'Post, beam, rafter, girt, purlin, truss coordination, bracing, and connection hardware details.',
    img: '/images/post-frame.svg',
  },
  {
    icon: Zap,
    tag: 'MEP-04',
    title: 'MEP Layouts',
    desc: 'Electrical, plumbing, HVAC, lighting, and drainage coordination layout drawings for permit packages.',
    img: '/images/agricultural.svg',
  },
  {
    icon: Calculator,
    tag: 'CALC-05',
    title: 'Structural Calculations',
    desc: 'Load calculations for posts, beams, rafters, footings, uplift, lateral loads, and load path documentation.',
    img: '/images/equipment-storage.svg',
  },
  {
    icon: RefreshCw,
    tag: 'REV-06',
    title: 'Permit Review Revisions',
    desc: 'Fast drawing revisions in response to city, county, or permit office review comments and correction notices.',
    img: '/images/commercial-storage.svg',
  },
];

export default function CoreServicesSection() {
  return (
    <section className="py-20 bg-silver/20 grid-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-steel text-[10px] tracking-widest uppercase">CAD Construction Services</span>
          </div>
          <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight">
            Core Services
          </h2>
          <p className="font-inter text-steel text-base mt-3 max-w-2xl leading-relaxed">
            Complete drawing packages for pole barn and post-frame projects — from initial floor plan layout to permit-ready structural and MEP documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white border border-silver hover:border-navy/20 transition-colors overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/60 transition-colors" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 bg-yellow flex items-center justify-center">
                      <Icon size={15} className="text-navy" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 font-mono text-[8px] text-yellow/70 tracking-widest">{svc.tag}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-condensed font-bold text-navy text-lg uppercase tracking-tight mb-2">{svc.title}</h3>
                  <p className="font-inter text-steel text-sm leading-relaxed">{svc.desc}</p>
                </div>
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