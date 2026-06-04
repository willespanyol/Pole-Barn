import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Layers, Grid, Zap, Calculator, RefreshCw, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: FileText,
    tag: 'ARCH-01',
    title: 'Architectural Plans',
    desc: 'We prepare clear architectural drawings for planning, pricing, permit review, and construction coordination. Drawings may include floor plans, exterior elevations, roof plans, sections, door and window layouts, and general construction notes.',
    deliverables: ['Floor plans', 'Exterior elevations', 'Building sections', 'Roof plans', 'Door and window schedules', 'General notes'],
    img: '/images/barndominium.svg',
  },
  {
    icon: Layers,
    tag: 'FND-02',
    title: 'Foundation Design',
    desc: 'We prepare foundation layouts for post-frame and pole barn projects, including footing layouts, slab plans, post locations, thickened slab edges, pier footings, and foundation notes.',
    deliverables: ['Foundation plan', 'Post and footing layout', 'Concrete slab layout', 'Pier footing details', 'Anchor and post base notes'],
    img: '/images/garage-workshop.svg',
  },
  {
    icon: Grid,
    tag: 'STR-03',
    title: 'Structural Framing',
    desc: 'We prepare framing layouts that show how posts, beams, headers, girts, purlins, rafters, trusses, bracing, and connections work together.',
    deliverables: ['Roof framing plan', 'Wall framing details', 'Beam and post layout', 'Bracing details', 'Connection notes'],
    img: '/images/post-frame.svg',
  },
  {
    icon: Zap,
    tag: 'MEP-04',
    title: 'MEP Layouts',
    desc: 'We coordinate basic electrical, plumbing, HVAC, lighting, ventilation, and drainage layouts for pole barn, workshop, garage, and barndominium projects.',
    deliverables: ['Electrical layout', 'Lighting layout', 'Plumbing layout', 'HVAC layout', 'Drainage coordination'],
    img: '/images/agricultural.svg',
  },
  {
    icon: Calculator,
    tag: 'CALC-05',
    title: 'Structural Calculations',
    desc: 'We provide structural calculation support where required for permit review, design coordination, or engineering review.',
    deliverables: ['Gravity load checks', 'Wind load checks', 'Snow load checks', 'Post and beam checks', 'Footing checks', 'Connection checks'],
    img: '/images/equipment-storage.svg',
  },
  {
    icon: RefreshCw,
    tag: 'REV-06',
    title: 'Permit Review Revisions',
    desc: 'We help revise drawings after city, county, or building department comments. The goal is to make corrections clearly and prepare the package for resubmission.',
    deliverables: ['Review comment response', 'Drawing updates', 'Calculation updates', 'Resubmittal package'],
    img: '/images/commercial-storage.svg',
  },
];

export default function Services() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="absolute inset-0">
          <img
            src="/images/pole-barn.svg"
            alt="Pole barn exterior"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">CAD Construction Services</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-5">
            Pole Barn, Post-Frame &<br />Barndominium Design Services
          </h1>
          <p className="font-inter text-gray-300 text-lg max-w-3xl leading-relaxed">
            We prepare architectural drawings, foundation plans, structural framing layouts, MEP coordination drawings, and structural calculation support for pole barns, post-frame buildings, barndominiums, garages, workshops, agricultural buildings, and storage structures.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={svc.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`grid md:grid-cols-2 border border-silver overflow-hidden ${isReversed ? 'md:[direction:rtl]' : ''}`}
              >
                {/* Image */}
                <div className={`relative h-64 md:h-auto overflow-hidden ${isReversed ? 'md:[direction:ltr]' : ''}`}>
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-navy/30" />
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-yellow/80 tracking-widest">{svc.tag}</div>
                </div>

                {/* Content */}
                <div className={`p-8 lg:p-10 bg-white flex flex-col justify-center ${isReversed ? 'md:[direction:ltr]' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-yellow flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-navy" />
                    </div>
                    <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight">{svc.title}</h2>
                  </div>

                  <p className="font-inter text-steel text-sm leading-relaxed mb-6">{svc.desc}</p>

                  <div className="mb-6">
                    <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-3">Deliverables</div>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map(d => (
                        <li key={d} className="flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-yellow flex-shrink-0" />
                          <span className="font-inter text-steel text-sm">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/order" className="yellow-btn px-6 py-3 text-sm self-start">
                    Request This Service
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="font-inter text-gray-400 mb-8 leading-relaxed">
            Submit your project details and we will review your building type, dimensions, site location, and permit requirements — then recommend the right drawing package for your project.
          </p>
          <Link to="/order" className="yellow-btn px-12 py-4 text-base inline-block">
            Start My Design Order
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}