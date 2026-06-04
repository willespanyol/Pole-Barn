import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { appClient } from '@/api/appClient';

export default function ContractorCtaSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-30" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Contractor Support</span>
            <div className="w-6 h-px bg-yellow" />
          </div>
          <h2 className="font-condensed font-black text-white text-4xl lg:text-5xl uppercase tracking-tight mb-6">
            Need Overflow Drawing<br />Support?
          </h2>
          <p className="font-inter text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            If your team is busy with multiple projects, we can help prepare permit drawings, framing plans, foundation layouts, MEP drawings, structural calculations, and city comment responses on a project-by-project basis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="yellow-btn px-12 py-4 text-base inline-flex items-center justify-center gap-2 font-semibold"
              onClick={() => appClient.analytics.track({ eventName: 'upload_plans_clicked', properties: { source: 'contractor_cta' } })}
            >
              Upload Plans for Quote
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-12 py-4 font-condensed font-bold text-base uppercase tracking-wide hover:border-yellow hover:text-yellow hover:bg-white/5 transition-all inline-flex items-center justify-center">
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}