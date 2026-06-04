import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Contractor Services',
    items: [
      {
        q: 'Do you prepare pole barn and barndominium permit plans?',
        a: 'Yes. We prepare permit drawing packages for pole barns, post-frame buildings, garages, workshops, barndominiums, and related rural residential or agricultural structures.',
      },
      {
        q: 'Do you work with contractors?',
        a: 'Yes. We support contractors, builders, post-frame companies, metal building contractors, and general contractors with overflow drafting, structural documentation, MEP layouts, and permit support.',
      },
      {
        q: 'What files do I need to send?',
        a: 'You can send sketches, PDFs, CAD files, Revit files, site surveys, photos, redlines, previous drawings, or city correction comments.',
      },
      {
        q: 'Do you provide structural calculations?',
        a: 'Yes. We can prepare structural calculation support for foundations, framing, roof systems, posts, beams, and other project elements, depending on the project scope and local requirements.',
      },
      {
        q: 'Do you provide MEP drawings?',
        a: 'Yes. We can prepare basic MEP layouts for barndominiums, garages, workshops, and related building types.',
      },
      {
        q: 'Can you help with city correction comments?',
        a: 'Yes. You can upload the plan review comments, and we can help prepare revised drawings and written responses.',
      },
      {
        q: 'Do you provide stamped drawings?',
        a: 'Where stamping is required, drawings and calculations must be reviewed and sealed by a licensed professional in the project jurisdiction. Add a clear option in the order form asking whether the client needs PE stamping.',
      },
      {
        q: 'How do I start?',
        a: 'Click "Upload Plans for Quote," send your project files, and include your project location, scope, deadline, and any permit comments.',
      },
    ],
  },
  {
    category: 'Permit Process',
    items: [
      {
        q: 'Do I need a permit to build a pole barn?',
        a: 'Most jurisdictions require a building permit for permanent pole barn and post-frame structures. Requirements vary by county, state, and building size. Some rural areas exempt agricultural structures under a certain square footage. We recommend contacting your local building department before starting any design work.',
      },
      {
        q: 'What drawings are typically required for a pole barn permit application?',
        a: 'Most building departments require a site plan, floor plan, exterior elevations, foundation plan, and structural framing drawings. Some jurisdictions also require structural calculations, MEP layouts, and energy compliance documentation. We prepare complete permit packages based on your jurisdiction\'s requirements.',
      },
      {
        q: 'How do I find out what my local building department requires?',
        a: 'Contact your city or county building department and ask for the residential or agricultural permit checklist. Many departments post their requirements online. Once you have the checklist, we can prepare a drawing set that addresses each line item.',
      },
      {
        q: 'Can you prepare drawings for permit submission worldwide?',
        a: 'Yes. Pole Barndominium Designs serves clients worldwide. We coordinate drawings with local wind speed maps, snow load maps, seismic design categories, and applicable building codes for each project location.',
      },
      {
        q: 'What happens if the building department requests changes after submission?',
        a: 'We offer permit review revision support. After receiving plan check comments from your building department, we update the drawings and calculations to address each comment and prepare a revised package for resubmission.',
      },
    ],
  },
  {
    category: 'Structural Stamping & Engineering',
    items: [
      {
        q: 'Do your drawings need to be stamped by a licensed engineer?',
        a: 'Stamping requirements vary by jurisdiction, building size, and intended use. Some counties accept non-stamped drafting packages for smaller residential or agricultural buildings, while others require drawings stamped by a licensed Professional Engineer (PE) registered in that jurisdiction. We prepare the design documentation, and where stamping is required, we can coordinate with a licensed PE for your jurisdiction.',
      },
      {
        q: 'Do you provide PE-stamped drawings?',
        a: 'Pole Barndominium Designs provides design and drafting documentation. Where PE stamping is required by your jurisdiction, we can coordinate with a licensed structural engineer registered in your jurisdiction to review and stamp the drawings. This is an additional step and may affect timeline and cost.',
      },
      {
        q: 'What is the difference between a drafting package and stamped engineering?',
        a: 'A drafting package includes architectural, foundation, and framing drawings with construction details and notes. Stamped engineering involves a licensed PE performing formal calculations, reviewing the design for code compliance, and placing their stamp and signature on the documents. Many jurisdictions require stamping for commercial projects, buildings over a certain size, or structures with specific occupancy classifications.',
      },
      {
        q: 'Are structural calculations included in every drawing package?',
        a: 'Structural calculations are available as an add-on service. They are not included in all packages by default, but can be added when required by your building department or when the project scope warrants formal load analysis. If you are unsure, we recommend requesting them as part of your package to avoid revision delays.',
      },
    ],
  },
  {
    category: 'Project Timelines',
    items: [
      {
        q: 'How long does it take to receive a drawing package?',
        a: 'Typical turnaround is 5 to 10 business days for standard residential and agricultural projects. More complex projects — including barndominiums with full MEP coordination, structural calculations, or large commercial buildings — may take 10 to 20 business days. Rush turnaround is available for select project types.',
      },
      {
        q: 'What affects how long my project takes?',
        a: 'The key factors are project complexity, number of services requested, completeness of the information you provide at the start, and whether structural calculations or MEP coordination is included. Projects where all building dimensions, site information, and permit requirements are provided upfront move the fastest.',
      },
      {
        q: 'When does the timeline start?',
        a: 'The project timeline starts after all required project information is received and confirmed — including building dimensions, location, use, and any uploaded files. Projects that begin with incomplete information may experience delays while we collect missing details.',
      },
      {
        q: 'Can I request a faster turnaround?',
        a: 'Rush service is available for select project types. If you have a specific permit deadline or construction start date, let us know when you submit your project. We will confirm whether rush turnaround is available for your scope and what the timeline would be.',
      },
      {
        q: 'How many rounds of revisions are included?',
        a: 'Standard packages include one round of client revisions after the initial drawing set is delivered. Revisions based on building department comments are handled separately through our permit review revision service. Additional revision rounds can be requested and are priced based on scope.',
      },
    ],
  },
  {
    category: 'Project Scope & Services',
    items: [
      {
        q: 'What types of buildings do you design?',
        a: 'We specialize in pole barns, post-frame buildings, barndominiums, agricultural storage buildings, workshops, garages, equipment storage structures, riding arenas, and commercial post-frame buildings. We do not design wood-frame residential homes, steel buildings, or concrete tilt-up structures.',
      },
      {
        q: 'Do I need to hire a contractor before ordering drawings?',
        a: 'No. Many clients order drawings before selecting a contractor so they can get accurate bids. A complete drawing package allows multiple contractors to quote the same scope, which helps with cost comparison and project planning.',
      },
      {
        q: 'Can you work from my rough sketches or ideas?',
        a: 'Yes. You do not need formal drawings to get started. A rough sketch, site plan, Google Maps screenshot, or written description of your building dimensions and layout is enough for us to begin preparing professional drawings.',
      },
    ],
  },
];

export default function Faq() {
  const [openItems, setOpenItems] = useState({});

  const toggle = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">FAQ</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-inter text-gray-400 text-base max-w-2xl leading-relaxed">
            Answers to common questions about the permit process, structural stamping requirements, drawing packages, and project timelines.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white grid-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {faqs.map((category, catIdx) => (
            <div key={category.category}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-yellow" />
                <h2 className="font-condensed font-black text-navy text-xl uppercase tracking-tight">
                  {category.category}
                </h2>
              </div>
              <div className="divide-y divide-silver border border-silver">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div key={itemIdx}>
                      <button
                        onClick={() => toggle(catIdx, itemIdx)}
                        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-silver/20 transition-colors"
                      >
                        <span className="font-condensed font-bold text-navy text-base uppercase tracking-tight leading-snug">
                          {item.q}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-steel flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5">
                          <p className="font-inter text-steel text-sm leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-silver/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-steel/60 text-xs leading-relaxed">
            Design and permit requirements vary by project location. Some projects may require review, approval, or stamping by a licensed professional in the project jurisdiction. The information on this page is general in nature and does not constitute legal or engineering advice. Pole Barndominium Designs prepares design and drafting documentation based on the project scope and information provided by the client.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">Still Have Questions?</h2>
          <p className="font-inter text-gray-400 mb-8">Send us your project details and we will review your scope, permit requirements, and drawing needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="yellow-btn px-10 py-4 text-sm inline-block">Contact Us</Link>
            <Link to="/order" className="border border-white/30 text-white px-10 py-4 font-condensed font-bold text-sm uppercase tracking-wide hover:border-yellow hover:text-yellow transition-colors inline-block">Start My Design Order</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}