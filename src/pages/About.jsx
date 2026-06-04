import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const whatWeDo = [
  { title: 'Architectural Layouts', desc: 'Floor plans, exterior elevations, building sections, and roof plans organized for permit review, contractor pricing, and construction.' },
  { title: 'Foundation Plans', desc: 'Post and footing layouts, concrete slab plans, thickened edges, pier footings, and foundation notes for post-frame and pole barn projects.' },
  { title: 'Structural Framing Drawings', desc: 'Roof framing plans, wall framing details, beam and post layouts, bracing details, and connection notes based on real post-frame construction methods.' },
  { title: 'MEP Coordination', desc: 'Electrical layouts, lighting plans, plumbing layouts, HVAC coordination, and drainage notes for barndominiums, workshops, and commercial buildings.' },
  { title: 'Structural Calculation Support', desc: 'Gravity load checks, wind and snow load checks, post and beam sizing, footing design, and connection checks where required for permit review.' },
  { title: 'Permit Revision Support', desc: 'Drawing updates, calculation revisions, and resubmittal packages in response to plan check comments from building departments.' },
];

const whoWeHelp = [
  'Homeowners building pole barns, garages, and barndominiums',
  'Farmers and ranchers expanding agricultural storage buildings',
  'Contractors needing permit-ready drawings for client projects',
  'Developers planning commercial post-frame structures',
  'Small business owners building workshops and storage facilities',
  'Equestrian property owners designing riding arenas and horse barns',
];

const approach = [
  { label: 'Clear Dimensions', desc: 'All drawings include complete dimensions, callouts, and schedules. No ambiguity during plan check or on site.' },
  { label: 'Practical Details', desc: 'Drawing details are based on real post-frame construction methods using actual lumber sizes, hardware, and connections.' },
  { label: 'Organized Packages', desc: 'Each drawing set is organized as a single PDF with a cover sheet, sheet index, and sheets numbered in review order.' },
  { label: 'Code-Aware Design', desc: 'Drawings are prepared with applicable building codes, local wind and snow maps, and jurisdiction requirements in mind.' },
];

export default function About() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="absolute inset-0">
          <img
            src="/images/barndominium.svg"
            alt="Professional CAD drafting consultation"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">About Us</span>
            </div>
            <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-5">
              About Pole Barndominium Designs
            </h1>
            <p className="font-inter text-gray-300 text-base leading-relaxed mb-4">
              Pole Barndominium Designs provides practical design and drafting support for pole barns, post-frame buildings, barndominiums, garages, workshops, agricultural buildings, and storage structures.
            </p>
            <p className="font-inter text-gray-400 text-base leading-relaxed">
              We help clients turn building ideas, sketches, site information, and permit requirements into clear drawing packages for planning, contractor pricing, permit review, and construction coordination.
            </p>
          </div>
          <div className="relative hidden lg:block">
            <img
              src="/images/barndominium.svg"
              alt="Drafting consultation"
              className="w-full object-cover h-80"
            />
            <div className="absolute inset-0 border border-yellow/20" />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-steel text-[10px] tracking-widest uppercase">What We Do</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-4">Our Work</h2>
            <p className="font-inter text-steel text-base leading-relaxed max-w-3xl">
              Our work focuses on architectural layouts, foundation plans, structural framing drawings, MEP coordination, and structural calculation support. Each project is prepared with clear dimensions, organized notes, buildable details, and practical documentation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatWeDo.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border border-silver p-6 hover:border-yellow/40 transition-colors">
                <div className="w-5 h-5 bg-yellow flex items-center justify-center mb-3">
                  <CheckCircle2 size={11} className="text-navy" />
                </div>
                <h3 className="font-condensed font-bold text-navy text-sm uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="font-inter text-steel text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-20 bg-silver/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Who We Help</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-5">Who We Work With</h2>
            <p className="font-inter text-steel text-base leading-relaxed mb-6">
              We work with homeowners, farmers, builders, developers, contractors, and small business owners who need reliable design documents for pole barn and post-frame projects.
            </p>
            <div className="space-y-3">
              {whoWeHelp.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow mt-2 flex-shrink-0" />
                  <span className="font-inter text-steel text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Service Area</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-5">Worldwide Remote Service</h2>
            <p className="font-inter text-steel text-base leading-relaxed mb-4">
              Pole Barndominium Designs serves clients worldwide. All projects are completed remotely, with communication and drawing delivery by email.
            </p>
            <p className="font-inter text-steel text-base leading-relaxed">
              Drawing sets are prepared for each jurisdiction. We work with county and city permit requirements, local wind and snow load maps, seismic design categories, and site-specific design conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Design Approach */}
      <section className="py-20 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Our Design Approach</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight">How We Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {approach.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="border border-silver p-5 hover:border-navy/30 transition-colors">
                <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-2">0{i + 1}</div>
                <h3 className="font-condensed font-bold text-navy text-sm uppercase tracking-tight mb-2">{item.label}</h3>
                <p className="font-inter text-steel text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Permit-Focused Documentation */}
      <section className="py-20 bg-silver/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="/images/garage-workshop.svg"
              alt="Foundation construction layout"
              className="w-full object-cover h-72"
            />
            <div className="absolute inset-0 bg-navy/10 border border-yellow/10" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-yellow" />
              <span className="font-mono text-steel text-[10px] tracking-widest uppercase">Permit-Focused Documentation</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight mb-4">Drawing Sets Built for Plan Review</h2>
            <p className="font-inter text-steel text-base leading-relaxed mb-4">
              Every drawing package is organized for permit submission. Sheets are labeled, dimensioned, and structured the way plan reviewers expect — cover sheet, floor plans, elevations, sections, foundation, framing, and notes in a single PDF package.
            </p>
            <p className="font-inter text-steel text-base leading-relaxed">
              Clear dimensions, notes, door and window schedules, framing schedules, and detail callouts are included in every set. No missing information during plan check or construction.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-3">Ready to Discuss Your Project?</h2>
          <p className="font-inter text-gray-400 text-base leading-relaxed mb-8">
            Submit your project details and we will review your scope, building type, site requirements, and permit needs. We prepare permit-ready drawing packages for pole barns, barndominiums, garages, and post-frame buildings for clients worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="yellow-btn px-10 py-4 text-sm inline-block">Request a Quote</Link>
            <Link to="/order" className="border border-white/30 text-white px-10 py-4 font-condensed font-bold text-sm uppercase tracking-wide hover:border-yellow hover:text-yellow transition-colors inline-block">Start My Design Order</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}