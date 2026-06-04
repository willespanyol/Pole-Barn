import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const foundationItems = [
  'Concrete slab plan with thickness and reinforcement',
  'Post footing layout with dimensions',
  'Footing depth and size schedule',
  'Anchor bolt layout and hardware schedule',
  'Bearing plate and column base details',
  'Grade beam and thickened edge details',
  'Foundation section detail drawings',
  'Soil bearing capacity notes',
];

const framingItems = [
  'Roof framing plan with rafter spacing and layout',
  'Post and column layout plan',
  'Wall girt spacing and attachment details',
  'Purlin spacing and bearing details',
  'Ridge beam and ridge board sizing',
  'Knee brace and diagonal bracing layout',
  'Truss bearing and layout coordination',
  'Connection hardware schedule and details',
  'Bay spacing and frame layout diagram',
];

export default function FoundationFraming() {
  return (
    <PageLayout>
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Foundation & Framing</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-5 max-w-3xl">
            Foundation Plans & Structural Framing Design
          </h1>
          <p className="font-inter text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
            Pole barn foundation layouts, footing plans, and structural framing drawings. Designed for permit submission and practical construction use.
          </p>
          <Link to="/order" className="yellow-btn px-8 py-4 text-sm inline-flex items-center gap-2">
            Request Foundation & Framing Plans <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <div className="w-8 h-px bg-yellow mb-3" />
                <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-6">Foundation Plan Includes</h2>
                <ul className="space-y-3">
                  {foundationItems.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} className="text-navy" />
                      </div>
                      <span className="font-inter text-steel text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="w-8 h-px bg-yellow mb-3" />
              <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-6">Structural Framing Plan Includes</h2>
              <ul className="space-y-3">
                {framingItems.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={11} className="text-navy" />
                    </div>
                    <span className="font-inter text-steel text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image + content */}
      <section className="py-20 bg-silver/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/garage-workshop.svg"
                alt="Foundation construction layout"
                className="w-full object-cover"
                style={{ height: '380px' }}
              />
            </div>
            <div>
              <h2 className="font-condensed font-bold text-navy text-2xl uppercase tracking-tight mb-4">Pole Barn Foundation and Framing Design</h2>
              <p className="font-inter text-steel text-base leading-relaxed mb-4">
                Pole barn foundation design includes concrete slab plans, post footing layouts, anchor bolt schedules, and footing detail drawings. Foundation plans are coordinated with structural framing to ensure posts, footings, and anchor hardware are sized and positioned correctly.
              </p>
              <p className="font-inter text-steel text-base leading-relaxed mb-6">
                Structural framing plans show roof framing, post layout, wall girt spacing, bracing locations, and connection hardware schedules. All framing drawings are designed for practical construction by a qualified contractor.
              </p>
              <Link to="/order" className="yellow-btn px-8 py-4 text-sm inline-block">Request Foundation & Framing Plans</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">Start Your Foundation & Framing Design</h2>
          <p className="font-inter text-gray-400 mb-8">Submit your project details and we'll prepare permit-ready foundation and framing plans for your pole barn or post-frame building.</p>
          <Link to="/order" className="yellow-btn px-10 py-4 text-base inline-block">Get Foundation & Framing Plans</Link>
        </div>
      </section>
    </PageLayout>
  );
}