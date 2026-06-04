import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Uploaded project images only — cycled across building types
const IMGS = [
  '/images/pole-barn.svg',
  '/images/post-frame.svg',
  '/images/garage-workshop.svg',
  '/images/commercial-storage.svg',
  '/images/agricultural.svg',
  '/images/equipment-storage.svg',
  '/images/barndominium.svg',
  '/images/pole-barn.svg',
  '/images/post-frame.svg',
  '/images/commercial-storage.svg',
];

const projectTypes = [
  { label: 'Pole Barns' },
  { label: 'Post-Frame Buildings' },
  { label: 'Barndominiums' },
  { label: 'Garages' },
  { label: 'Workshops' },
  { label: 'Equipment Storage' },
  { label: 'Farm Buildings' },
  { label: 'Riding Arenas' },
  { label: 'Commercial Storage' },
  { label: 'Utility Buildings' },
];

export default function ProjectTypesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Building Types</span>
          </div>
          <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight">
            Building Types We Design
          </h2>
          <p className="font-inter text-steel text-base mt-4 max-w-xl leading-relaxed">
            Pole Barndominium Designs prepares permit-ready CAD drawing packages for a wide range of post-frame and pole barn building types — from residential garages and barndominiums to large agricultural and commercial structures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {projectTypes.map((type, i) => (
            <motion.div
              key={type.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden aspect-square"
            >
              <img
                src={IMGS[i]}
                alt={type.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/70 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-3">
                <span className="font-condensed font-bold text-white text-sm uppercase tracking-tight leading-tight">{type.label}</span>
              </div>
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-yellow/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/order" className="yellow-btn px-10 py-4 text-sm">
            Start My Design Order
          </Link>
        </div>
      </div>
    </section>
  );
}