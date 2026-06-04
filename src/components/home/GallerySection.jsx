import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
  {
    src: '/images/pole-barn.svg',
    label: 'Modern Pole Barn Exterior',
    tag: 'EXT-01',
  },
  {
    src: '/images/barndominium.svg',
    label: 'Architectural Drawing Package',
    tag: 'ARC-02',
  },
  {
    src: '/images/garage-workshop.svg',
    label: 'Foundation Design',
    tag: 'FND-03',
  },
  {
    src: '/images/post-frame.svg',
    label: 'Structural Framing',
    tag: 'STR-04',
  },
  {
    src: '/images/agricultural.svg',
    label: 'MEP Coordination',
    tag: 'MEP-05',
  },
  {
    src: '/images/equipment-storage.svg',
    label: 'Structural Calculations',
    tag: 'CALC-06',
  },
  {
    src: '/images/commercial-storage.svg',
    label: 'Post-Frame Agricultural Build',
    tag: 'AGR-07',
  },
];

export default function GallerySection() {
  return (
    <section className="py-24 bg-silver/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Our Work</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight">
              Permit-Ready Projects
            </h2>
            <p className="font-inter text-steel text-sm max-w-sm leading-relaxed">
              CAD drawing packages, structural plans, and permit-ready sets delivered for clients for clients worldwide.
            </p>
          </div>
        </div>

        {/* Grid — featured first item spans 2 cols on md */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {images.map((img, i) => (
            <motion.div
              key={img.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative overflow-hidden group ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-colors duration-300" />
              {/* Tag badge */}
              <div className="absolute top-3 right-3">
                <span className="font-mono text-white/60 text-[9px] tracking-widest">{img.tag}</span>
              </div>
              {/* Label on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-condensed font-bold text-white text-sm uppercase tracking-tight">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/order" className="yellow-btn px-10 py-4 text-sm inline-block">Start Your Project</Link>
        </div>
      </div>
    </section>
  );
}