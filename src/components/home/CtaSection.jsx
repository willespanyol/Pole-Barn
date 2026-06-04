import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-30" />
      <div className="absolute inset-0">
        <img
          src="/images/pole-barn.svg"
          alt="Pole barn exterior"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-navy/80" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-yellow" />
          <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Project Inquiry</span>
          <div className="w-8 h-px bg-yellow" />
        </div>

        <h2 className="font-condensed font-black text-white text-4xl lg:text-6xl uppercase tracking-tight mb-6">
          Need Pole Barn Plans<br />
          <span className="text-yellow">for Permit or Construction?</span>
        </h2>

        <p className="font-inter text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Send your building size, location, sketches, site information, and permit requirements. We will review the project and recommend the right drawing package.
        </p>

        <Link to="/order" className="yellow-btn px-12 py-5 text-base inline-flex items-center gap-3 group">
          Start My Design Order
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8">
          {['Pole Barn Design', 'Post-Frame Plans', 'Barndominium Design', 'Structural Calculations', 'MEP Layouts', 'Foundation Plans'].map(tag => (
            <span key={tag} className="font-mono text-gray-500 text-[9px] tracking-widest uppercase">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}