import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  { title: 'Pole Barn Permit Plans', desc: 'Complete architectural and framing drawings for permit submission' },
  { title: 'Barndominium Design Plans', desc: 'Residential and agricultural hybrid building plans' },
  { title: 'Post-Frame Building Drawings', desc: 'Construction and structural framing documentation' },
  { title: 'Foundation and Framing Plans', desc: 'Foundation layouts, framing plans, and structural details' },
  { title: 'Structural Calculations', desc: 'Professional structural analysis and load calculations' },
  { title: 'MEP Layouts', desc: 'Mechanical, electrical, and plumbing coordination drawings' },
  { title: 'Garage and Workshop Plans', desc: 'Complete drawing packages for garages and workshops' },
  { title: 'City Comment Response Support', desc: 'Revisions based on plan review comments' },
  { title: 'Contractor Overflow Drafting Support', desc: 'Project-by-project overflow support for your team' },
];

export default function ContractorFocusSection() {
  return (
    <section className="py-20 bg-white grid-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">For Contractors</span>
          </div>
          <h2 className="font-condensed font-black text-navy text-4xl lg:text-5xl uppercase tracking-tight mb-4">
            Built for Contractors,<br />Builders, and<br />Rural Property Owners
          </h2>
          <p className="font-inter text-steel text-base leading-relaxed">
            Pole Barndominium Designs supports contractors, post-frame builders, barndominium builders, general contractors, metal building contractors, and rural property owners with clean permit documentation, construction drawings, framing plans, structural calculations, and MEP layouts. We can work from sketches, PDFs, CAD files, surveys, photos, redlines, or city correction comments.
          </p>
        </motion.div>

        {/* Service Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-silver p-6 hover:border-yellow hover:bg-yellow/5 transition-all group"
            >
              <h3 className="font-condensed font-bold text-navy uppercase tracking-tight text-base mb-2 group-hover:text-yellow transition-colors">
                {service.title}
              </h3>
              <p className="font-inter text-steel text-sm mb-5 leading-relaxed">
                {service.desc}
              </p>
              <Link to="/order" className="inline-flex items-center gap-2 text-yellow font-condensed font-bold text-xs uppercase tracking-wide hover:translate-x-1 transition-all">
                Upload Plans <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* What We Can Work From */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 py-12 border-y border-silver">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-6">
              What We Can Work From
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {['Sketches', 'PDF drawings', 'CAD files', 'Revit files', 'Site surveys', 'Hand drawings', 'Photos', 'Redline markups', 'City correction comments', 'Previous permit drawings', 'Contractor notes'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={10} className="text-navy" />
                  </div>
                  <span className="font-inter text-steel text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-6">
              Typical Deliverables
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {['Permit drawing package', 'Floor plans', 'Elevations', 'Sections', 'Foundation plans', 'Framing plans', 'Roof framing plans', 'Wall details', 'Structural calculation package', 'MEP layouts', 'Code notes', 'City comment response documents', 'PDF drawing sets', 'DWG files where required'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={10} className="text-navy" />
                  </div>
                  <span className="font-inter text-steel text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12 bg-yellow/10 border-2 border-yellow px-8"
        >
          <h3 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight mb-3">
            Ready to Get Started?
          </h3>
          <p className="font-inter text-navy text-base mb-8 max-w-xl mx-auto font-medium">
            Upload your sketches, drawings, survey, or city comments and request a quote for your pole barn, barndominium, or post-frame project.
          </p>
          <Link to="/order" className="yellow-btn px-12 py-4 text-base inline-flex items-center gap-2 font-semibold">
            Upload Plans for Quote <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}