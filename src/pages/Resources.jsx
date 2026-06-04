import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ROOF_STYLES = [
  {
    name: 'Gable',
    icon: '🏠',
    description: 'The most common roof style — two sloping sides meet at a ridge. Simple to build, excellent drainage, great for rain and snow.',
    bestFor: 'General storage, workshops, agricultural barns',
    pros: ['Cost-effective', 'Easy to frame', 'Good water runoff', 'Familiar look'],
    considerations: 'Wind uplift at gable ends — bracing required in high-wind zones.',
  },
  {
    name: 'Hip',
    icon: '⛺',
    description: 'All four sides slope downward. More wind-resistant than gable. No exposed gable ends makes it stronger in storm areas.',
    bestFor: 'Coastal/high-wind zones, residential barndominiums',
    pros: ['Superior wind resistance', 'No gable vents needed', 'Elegant appearance'],
    considerations: 'More complex framing = higher cost.',
  },
  {
    name: 'Gambrel',
    icon: '🏚️',
    description: 'Two slopes on each side — steep lower slope, shallow upper slope. Iconic barn look with maximum interior headroom on upper level.',
    bestFor: 'Hay storage, loft living spaces, classic barn aesthetics',
    pros: ['Maximum loft/upper floor space', 'Classic barn appearance', 'Great for hay storage'],
    considerations: 'Requires engineered trusses. More complex than gable.',
  },
  {
    name: 'Monitor',
    icon: '🏛️',
    description: 'A raised center section (clerestory) with windows or vents. Provides excellent natural light and ventilation inside large buildings.',
    bestFor: 'Livestock barns, indoor arenas, large agricultural buildings',
    pros: ['Natural daylighting', 'Superior ventilation', 'Ideal for animal housing'],
    considerations: 'Higher structural complexity and cost.',
  },
  {
    name: 'Shed (Lean-to)',
    icon: '🏗️',
    description: 'Single-slope roof that pitches in one direction. Often used as an addition attached to an existing structure.',
    bestFor: 'Equipment storage additions, covered parking, small standalone shelters',
    pros: ['Simplest and cheapest', 'Easy to attach to existing structure', 'Minimal materials'],
    considerations: 'Limited width without excessive height differential.',
  },
  {
    name: 'Quonset / Arch',
    icon: '🌉',
    description: 'Curved arch structure with no interior columns. All-steel arched buildings provide large clear-span interiors.',
    bestFor: 'Large clear-span storage, aircraft hangars, equipment barns',
    pros: ['Maximum clear span', 'No interior columns', 'Very strong structure'],
    considerations: 'Limited wall height. Not ideal for living space.',
  },
];

const FRAMING_OPTIONS = [
  {
    name: 'Post-Frame (Pole Barn)',
    tag: 'Most Common',
    tagColor: 'bg-yellow text-navy',
    description: 'Large wooden posts embedded in the ground or set on concrete piers support the entire structure. No perimeter foundation wall required.',
    howItWorks: 'Laminated columns spaced 8–12 ft on center carry roof loads directly to the ground. Girts span horizontally between columns.',
    bestFor: 'Agricultural buildings, workshops, garages, barndominiums',
    advantages: ['No concrete foundation required', 'Fast construction', 'Cost-effective', 'Flexible interior layouts', 'Wide clear spans up to 80+ ft'],
    engineeringNotes: 'Requires embedded depth calculations based on soil type and local codes. Column size determined by span, load, and wind exposure.',
  },
  {
    name: 'Stick Frame (Wood Stud)',
    tag: 'Residential Standard',
    tagColor: 'bg-blue-100 text-blue-800',
    description: 'Traditional wood 2×4 or 2×6 stud walls built on a perimeter concrete foundation. Standard for home construction.',
    howItWorks: 'Continuous concrete foundation supports load-bearing stud walls which carry roof and floor loads.',
    bestFor: 'Barndominiums with full living space, mixed residential/barn buildings',
    advantages: ['Familiar to all contractors', 'Full insulation options', 'Standard code compliance', 'Good for multi-story'],
    engineeringNotes: 'Requires full perimeter foundation. More material per sq ft than post-frame but easier to insulate for living space.',
  },
  {
    name: 'Steel Frame',
    tag: 'Commercial / Industrial',
    tagColor: 'bg-steel text-white',
    description: 'Structural steel columns and beams form rigid frames. Common for large commercial, industrial, and clear-span buildings.',
    howItWorks: 'Pre-engineered steel rigid frames are bolted together on concrete piers. Steel girts and purlins support metal cladding.',
    bestFor: 'Large commercial storage, equipment facilities, industrial buildings',
    advantages: ['Maximum clear span (100+ ft)', 'Extremely durable', 'Low maintenance', 'Fast erection'],
    engineeringNotes: 'Requires anchor bolt design and concrete pier engineering. Higher upfront material cost but lower long-term maintenance.',
  },
  {
    name: 'Hybrid (Post-Frame + Stick)',
    tag: 'Barndominium Favorite',
    tagColor: 'bg-green-100 text-green-800',
    description: 'Combines post-frame structural system with stick-frame interior partitions. Best of both worlds for live-work buildings.',
    howItWorks: 'Post-frame exterior shell provides the large clear span; interior walls are conventionally framed 2×4/2×6 for living quarters.',
    bestFor: 'Barndominiums, farm offices, live-work facilities',
    advantages: ['Large garage/barn area + living quarters', 'Single structure, single foundation', 'Cost-effective overall'],
    engineeringNotes: 'Requires coordination of two framing systems. Interior bearing walls need proper load path design.',
  },
];

const PRICE_TIERS = [
  { sqft: 'Under 1,000 sq ft', range: '$800 – $1,800', typical: 'Small garage, shed, simple drawings' },
  { sqft: '1,000 – 2,500 sq ft', range: '$1,200 – $3,500', typical: 'Workshop, single-bay barn, simple barndominium' },
  { sqft: '2,500 – 5,000 sq ft', range: '$2,500 – $6,000', typical: 'Large barn, multi-bay storage, full barndominium package' },
  { sqft: '5,000 – 10,000 sq ft', range: '$4,500 – $10,000', typical: 'Commercial building, arena, industrial storage' },
  { sqft: '10,000+ sq ft', range: 'Custom Quote', typical: 'Large commercial / industrial — contact us' },
];

export default function Resources() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Client Resources</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-4">
            Roof Styles &<br />Framing Guide
          </h1>
          <p className="font-inter text-gray-400 text-base max-w-2xl leading-relaxed">
            Everything you need to know before ordering your pole barn drawings — roof styles, framing systems, and starting price ranges to help you plan your project.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#roof-styles" className="yellow-btn px-6 py-3 text-sm">Roof Styles</a>
            <a href="#framing" className="border border-white/20 text-white font-condensed font-bold text-sm uppercase tracking-wide px-6 py-3 hover:border-yellow hover:text-yellow transition-colors">Framing Options</a>
            <a href="#pricing" className="border border-white/20 text-white font-condensed font-bold text-sm uppercase tracking-wide px-6 py-3 hover:border-yellow hover:text-yellow transition-colors">Price Ranges</a>
          </div>
        </div>
      </section>

      {/* Roof Styles */}
      <section id="roof-styles" className="py-16 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-yellow" />
              <span className="font-mono text-steel text-[9px] tracking-widest uppercase">Section 01</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight">Roof Styles</h2>
            <p className="font-inter text-steel text-base mt-2 max-w-2xl">The roof style affects cost, interior space, structural complexity, and code compliance. Here's what each option means for your project.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROOF_STYLES.map((roof, i) => (
              <motion.div
                key={roof.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border border-silver bg-white p-5 hover:border-navy/30 hover:shadow-sm transition-all"
              >
                <div className="text-3xl mb-3">{roof.icon}</div>
                <h3 className="font-condensed font-black text-navy text-xl uppercase tracking-tight mb-2">{roof.name}</h3>
                <p className="font-inter text-steel text-sm leading-relaxed mb-3">{roof.description}</p>
                <div className="mb-3">
                  <div className="font-mono text-[8px] text-yellow tracking-widest uppercase mb-1.5">Best For</div>
                  <p className="font-inter text-navy text-xs">{roof.bestFor}</p>
                </div>
                <div className="mb-3">
                  <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-1.5">Advantages</div>
                  <ul className="space-y-1">
                    {roof.pros.map(p => (
                      <li key={p} className="flex items-start gap-2 font-inter text-xs text-steel">
                        <div className="w-1.5 h-1.5 bg-yellow flex-shrink-0 mt-1" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-silver pt-3">
                  <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-1">Considerations</div>
                  <p className="font-inter text-xs text-steel leading-relaxed">{roof.considerations}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Framing */}
      <section id="framing" className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-yellow" />
              <span className="font-mono text-yellow/60 text-[9px] tracking-widest uppercase">Section 02</span>
            </div>
            <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight">Framing Systems</h2>
            <p className="font-inter text-gray-400 text-base mt-2 max-w-2xl">The framing system determines how your building's loads are carried to the foundation — and heavily influences cost, span capability, and permit requirements.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {FRAMING_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-condensed font-black text-white text-xl uppercase tracking-tight">{opt.name}</h3>
                  <span className={`flex-shrink-0 font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 font-bold ${opt.tagColor}`}>{opt.tag}</span>
                </div>
                <p className="font-inter text-gray-400 text-sm leading-relaxed mb-4">{opt.description}</p>
                <div className="mb-4">
                  <div className="font-mono text-[8px] text-yellow tracking-widest uppercase mb-1.5">How it works</div>
                  <p className="font-inter text-gray-300 text-xs leading-relaxed">{opt.howItWorks}</p>
                </div>
                <div className="mb-4">
                  <div className="font-mono text-[8px] text-yellow tracking-widest uppercase mb-1.5">Best For</div>
                  <p className="font-inter text-gray-300 text-xs">{opt.bestFor}</p>
                </div>
                <div className="mb-4">
                  <div className="font-mono text-[8px] text-yellow tracking-widest uppercase mb-1.5">Advantages</div>
                  <ul className="space-y-1">
                    {opt.advantages.map(a => (
                      <li key={a} className="flex items-start gap-2 font-inter text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-yellow flex-shrink-0 mt-1" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="font-mono text-[8px] text-gray-500 tracking-widest uppercase mb-1">Engineering Notes</div>
                  <p className="font-inter text-xs text-gray-500 leading-relaxed">{opt.engineeringNotes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price ranges */}
      <section id="pricing" className="py-16 bg-white grid-overlay">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-yellow" />
              <span className="font-mono text-steel text-[9px] tracking-widest uppercase">Section 03</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight">Starting Price Ranges</h2>
            <p className="font-inter text-steel text-base mt-2 max-w-2xl">These are starting ranges for our design drawing packages — not construction costs. Final pricing depends on drawing scope, number of sheets, structural calculations, and permit complexity.</p>
          </div>

          <div className="border border-silver divide-y divide-silver">
            {PRICE_TIERS.map((tier, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-silver/20 transition-colors gap-2">
                <div>
                  <div className="font-condensed font-bold text-navy text-base uppercase tracking-tight">{tier.sqft}</div>
                  <div className="font-inter text-steel text-xs mt-0.5">{tier.typical}</div>
                </div>
                <div className={`font-condensed font-black text-xl uppercase tracking-tight flex-shrink-0 ${tier.range === 'Custom Quote' ? 'text-steel' : 'text-yellow'}`}>
                  {tier.range}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-yellow/30 bg-yellow/5 p-5">
            <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-2">What's included in a drawing package?</div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
              {['Site plan & floor layout', 'Foundation plan & details', 'Structural framing plan', 'Roof framing & truss schedule', 'Wall sections & details', 'Electrical/MEP rough layout (if selected)', 'Structural calculations (if selected)', 'Permit-ready sheet set'].map(item => (
                <div key={item} className="flex items-center gap-2 font-inter text-xs text-steel py-0.5">
                  <div className="w-1.5 h-1.5 bg-yellow flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-inter text-steel text-sm mb-5">Ready to get an actual quote? Use our estimator or submit the full project form.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/estimator" className="yellow-btn px-8 py-3 text-sm">Get a Price Estimate</Link>
              <Link to="/order" className="navy-btn px-8 py-3 text-sm">Submit Full Project Order</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}