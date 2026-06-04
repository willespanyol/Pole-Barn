import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const buildingTypes = [
  { label: 'Pole Barns', img: '/images/pole-barn.svg' },
  { label: 'Post-Frame Buildings', img: '/images/post-frame.svg' },
  { label: 'Barndominiums', img: '/images/barndominium.svg' },
  { label: 'Garages', img: '/images/garage-workshop.svg' },
  { label: 'Workshops', img: '/images/commercial-storage.svg' },
  { label: 'Agricultural Buildings', img: '/images/agricultural.svg' },
  { label: 'Equipment Storage Buildings', img: '/images/equipment-storage.svg' },
  { label: 'Commercial Storage Structures', img: '/images/pole-barn.svg' },
];

export default function WhatWeDesignSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Project Types</span>
          </div>
          <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight">
            What We Design
          </h2>
          <p className="font-inter text-steel text-base mt-3 max-w-2xl leading-relaxed">
            Permit-ready CAD drawing packages for a wide range of post-frame and pole barn building types — from residential garages and barndominiums to large agricultural and commercial structures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
          {buildingTypes.map((type, i) => (
            <motion.div
              key={type.label}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative overflow-hidden aspect-[4/3]"
            >
              <img
                src={type.img}
                alt={type.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/55 group-hover:bg-navy/75 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="font-condensed font-bold text-white text-sm uppercase tracking-tight leading-tight">{type.label}</span>
              </div>
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-yellow/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/order" className="yellow-btn px-10 py-4 text-sm">
            Start My Design Order
          </Link>
        </div>
      </div>
    </section>
  );
}