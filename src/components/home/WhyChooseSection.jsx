import { motion } from 'framer-motion';
import { Shield, FileCheck, Ruler, Wrench } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Permit-Focused Design',
    desc: 'Drawing sets are organized for permit submission — cover sheet, floor plans, elevations, sections, foundation, framing, and notes in a single PDF package.',
  },
  {
    icon: FileCheck,
    title: 'Complete Documentation',
    desc: 'Clear dimensions, notes, door and window schedules, framing schedules, and detail callouts. No ambiguity during plan check or construction.',
  },
  {
    icon: Ruler,
    title: 'Practical & Buildable',
    desc: 'All designs are based on real post-frame construction methods. Every framing plan reflects actual lumber sizes, bay spacing, and connection hardware.',
  },
  {
    icon: Wrench,
    title: 'Structural Calculation Support',
    desc: 'Structural calculations available for posts, beams, rafters, footings, uplift loads, lateral loads, and load path documentation.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-silver/30 grid-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Why Us</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight mb-6">
              Clear Drawings.<br />
              <span className="text-steel">Built for Permit Offices.</span>
            </h2>
            <p className="font-inter text-steel text-base leading-relaxed mb-6">
              Pole Barndominium Designs prepares clear, buildable, permit-focused CAD drawing packages for pole barns, post-frame buildings, barndominiums, garages, workshops, and agricultural structures. Every drawing set includes proper dimensions, notes, schedules, and details organized for plan review.
            </p>
            <p className="font-inter text-steel text-base leading-relaxed mb-8">
              Whether you are a homeowner building a pole barn, a farmer expanding storage, a contractor pricing a job, or a developer planning a commercial post-frame structure — we prepare drawing packages that work for permit offices, contractors, and engineers.
            </p>
            <div className="hidden lg:block relative">
              <img
                src="/images/post-frame.svg"
                alt="Post-frame structural framing"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-navy/10" />
            </div>
          </div>

          {/* Photo */}
          <div className="relative mb-8 lg:hidden">
            <img
              src="/images/garage-workshop.svg"
              alt="Foundation construction layout"
              className="w-full h-52 object-cover"
            />
            <div className="absolute inset-0 bg-navy/20" />
          </div>

          {/* Right - reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-silver p-6 hover:border-navy/30 transition-colors group"
                >
                  <div className="w-10 h-10 bg-yellow/10 flex items-center justify-center mb-4 group-hover:bg-yellow/20 transition-colors">
                    <Icon size={18} className="text-navy" />
                  </div>
                  <h3 className="font-condensed font-bold text-navy text-base uppercase tracking-tight mb-2">{r.title}</h3>
                  <p className="font-inter text-steel text-sm leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}