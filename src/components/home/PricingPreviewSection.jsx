import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const packages = [
  {
    name: 'Basic Concept Package',
    price: 'From $400',
    desc: 'Best for early planning, simple layouts, and confirming the drawing direction before permit work starts.',
    items: ['Building layout review', 'Basic floor plan', 'Exterior concept direction', 'Scope notes for next step'],
  },
  {
    name: 'Permit Drawing Package',
    price: 'From $800',
    desc: 'Best for homeowners, contractors, and builders who need a clean drawing set for review or permit submission.',
    items: ['Floor plan and elevations', 'Foundation layout', 'Framing coordination', 'Permit-ready sheet set'],
    featured: true,
  },
  {
    name: 'Structural Package',
    price: 'From $1,200',
    desc: 'Best when the project needs load paths, member sizing, footing checks, or engineer coordination.',
    items: ['Structural framing plans', 'Foundation and footing details', 'Load path notes', 'Calculation support'],
  },
  {
    name: 'Premium Full Package',
    price: 'From $2,500',
    desc: 'Best for barndominiums or larger buildings needing architectural, structural, MEP, and visual presentation support.',
    items: ['Full permit drawing set', 'Structural calculations', 'MEP layout coordination', 'Rendering support'],
  },
];

export default function PricingPreviewSection() {
  return (
    <section className="py-24 bg-white grid-overlay border-y border-silver">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Starting Packages</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight">
              Clear Design Packages<br />Before You Order
            </h2>
            <p className="font-inter text-steel text-base mt-4 max-w-2xl leading-relaxed">
              These are starting prices for design and drawing services only. Final pricing depends on building size, required sheets, permit complexity, structural scope, and available project information.
            </p>
          </div>
          <Link to="/estimator" className="navy-btn px-8 py-4 text-sm w-fit">
            Get Price Estimate
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`border p-6 bg-white relative ${pkg.featured ? 'border-yellow shadow-lg' : 'border-silver'}`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-6 bg-yellow px-3 py-1 font-mono text-[8px] text-navy tracking-widest uppercase">
                  Most Requested
                </div>
              )}
              <div className="font-condensed font-black text-navy text-xl uppercase tracking-tight mb-2">{pkg.name}</div>
              <div className="font-condensed font-black text-yellow text-3xl uppercase tracking-tight mb-3">{pkg.price}</div>
              <p className="font-inter text-steel text-sm leading-relaxed mb-5">{pkg.desc}</p>
              <ul className="space-y-2 mb-6">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-inter text-xs text-steel leading-relaxed">
                    <CheckCircle2 size={13} className="text-yellow flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/order" className={pkg.featured ? 'yellow-btn px-5 py-3 text-xs inline-block w-full text-center' : 'border border-navy text-navy hover:bg-navy hover:text-white font-condensed font-bold text-xs uppercase tracking-wide px-5 py-3 inline-block w-full text-center transition-colors'}>
                Request This Package
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
