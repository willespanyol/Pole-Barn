import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const trustPoints = [
  'Permit-ready pole barn drawing packages',
  'Architectural plans, elevations, and building sections',
  'Foundation plans and post footing layouts',
  'Structural framing design and connection details',
  'MEP layout coordination drawings',
  'Structural calculation reports',
  'Permit review revision support',
  'Designs for residential, agricultural, and commercial use',
  'Remote service — clients worldwide',
];

export default function TrustSection() {
  return (
    <section className="bg-silver/40 border-y border-silver section-line py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 bg-yellow flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={12} className="text-navy" />
              </div>
              <span className="font-inter text-steel text-sm font-medium">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}