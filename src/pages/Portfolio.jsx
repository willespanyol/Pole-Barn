import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const projects = [
  {
    title: '40×80 Agricultural Pole Barn',
    type: 'Pole Barn',
    location: 'Rural Texas',
    size: '3,200 sq ft',
    services: 'Architectural + Foundation + Framing',
    img: '/images/pole-barn.svg',
    featured: true,
  },
  {
    title: 'Live-Work Barndominium',
    type: 'Barndominium',
    location: 'Oklahoma',
    size: '2,400 sq ft',
    services: 'Full Design Package + MEP',
    img: '/images/barndominium.svg',
    featured: false,
  },
  {
    title: 'Commercial Equipment Storage',
    type: 'Post-Frame',
    location: 'Kansas',
    size: '6,000 sq ft',
    services: 'Structural + Foundation + Calculations',
    img: '/images/post-frame.svg',
    featured: false,
  },
  {
    title: '30×60 Workshop & Garage',
    type: 'Workshop',
    location: 'Missouri',
    size: '1,800 sq ft',
    services: 'Architectural + MEP',
    img: '/images/garage-workshop.svg',
    featured: true,
  },
  {
    title: 'Indoor Riding Arena',
    type: 'Agricultural',
    location: 'Colorado',
    size: '12,000 sq ft',
    services: 'Full Design + Structural Calculations',
    img: '/images/agricultural.svg',
    featured: false,
  },
  {
    title: 'Farm Hay & Implement Storage',
    type: 'Agricultural',
    location: 'Iowa',
    size: '4,800 sq ft',
    services: 'Foundation + Framing + Architectural',
    img: '/images/equipment-storage.svg',
    featured: false,
  },
  {
    title: 'Rural Multi-Use Barndominium',
    type: 'Barndominium',
    location: 'Tennessee',
    size: '3,600 sq ft',
    services: 'Full Package + MEP + Calculations',
    img: '/images/commercial-storage.svg',
    featured: true,
  },
  {
    title: 'Commercial Storage Facility',
    type: 'Commercial',
    location: 'Georgia',
    size: '8,000 sq ft',
    services: 'Architectural + Foundation + Structural',
    img: '/images/pole-barn.svg',
    featured: false,
  },
];

export default function Portfolio() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Project Portfolio</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-4">
            Design Projects
          </h1>
          <p className="font-inter text-gray-400 text-lg max-w-2xl">
            Pole barn designs, post-frame building plans, barndominium drawings, and structural packages for residential, agricultural, and commercial clients.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`group relative overflow-hidden cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${project.featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/70 transition-colors duration-300" />

                  {/* Technical overlay on hover */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-2">{project.type} · {project.size}</div>
                    <h3 className="font-condensed font-black text-white text-xl uppercase tracking-tight mb-1">{project.title}</h3>
                    <p className="font-inter text-gray-300 text-sm">{project.services}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-3 h-px bg-yellow" />
                      <span className="font-mono text-gray-400 text-[9px]">{project.location}</span>
                    </div>
                  </div>

                  {/* Always visible tag */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] text-white/70 bg-navy/50 px-2 py-1 tracking-widest">{project.type.toUpperCase()}</span>
                  </div>

                  {/* Corner marks */}
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-yellow/40 group-hover:border-yellow transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-condensed font-black text-white text-4xl uppercase tracking-tight mb-4">Start Your Project</h2>
          <p className="font-inter text-gray-400 mb-8">Ready to start your pole barn, barndominium, or post-frame building design? Submit your project details to get started.</p>
          <Link to="/order" className="yellow-btn px-10 py-4 text-base inline-block">Request a Design Package</Link>
        </div>
      </section>
    </PageLayout>
  );
}