import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { appClient } from '@/api/appClient';

// Static fallback showcase projects
const STATIC_PROJECTS = [
  {
    title: '40×80 Agricultural Pole Barn',
    type: 'Pole Barn',
    location: 'Rural Texas',
    img: '/images/pole-barn.svg',
    services: 'Architectural + Foundation + Framing',
    featured: true,
  },
  {
    title: 'Live-Work Barndominium',
    type: 'Barndominium',
    location: 'Oklahoma',
    img: '/images/barndominium.svg',
    services: 'Full Design Package + MEP',
    featured: false,
  },
  {
    title: '30×60 Workshop & Garage',
    type: 'Workshop',
    location: 'Missouri',
    img: '/images/garage-workshop.svg',
    services: 'Architectural + MEP',
    featured: false,
  },
];

function ProjectCard({ project, index, featured }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group relative overflow-hidden cursor-pointer ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <img
          src={project.afterImg || project.img}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Before/after badge */}
        {project.beforeImg && (
          <div className="absolute top-3 right-3 z-10">
            <span className="font-mono text-[8px] bg-yellow text-navy px-2 py-0.5 tracking-widest uppercase font-bold">Before & After</span>
          </div>
        )}
        <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/70 transition-colors duration-300" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-2">{project.type}</div>
          <h3 className="font-condensed font-black text-white text-xl uppercase tracking-tight mb-1">{project.title}</h3>
          <p className="font-inter text-gray-300 text-sm">{project.services}</p>
          <div className="flex items-center gap-1 mt-2">
            <div className="w-3 h-px bg-yellow" />
            <span className="font-mono text-gray-400 text-[9px]">{project.location}</span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[9px] text-white/70 bg-navy/50 px-2 py-1 tracking-widest">{project.type?.toUpperCase()}</span>
        </div>
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-yellow/40 group-hover:border-yellow transition-colors" />
      </div>
    </motion.div>
  );
}

export default function HomePortfolioSection() {
  const { data: portfolioProjects = [] } = useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: () => appClient.entities.PortfolioProject.list('-created_date', 6),
  });

  const displayProjects = portfolioProjects.length > 0
    ? portfolioProjects.slice(0, 6).map((p, i) => ({ ...p, featured: i === 0 }))
    : STATIC_PROJECTS;

  return (
    <section className="py-16 bg-white grid-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-yellow" />
              <span className="font-mono text-steel text-[9px] tracking-widest uppercase">Recent Work</span>
            </div>
            <h2 className="font-condensed font-black text-navy text-4xl uppercase tracking-tight">
              Completed Projects
            </h2>
            <p className="font-inter text-steel text-sm mt-2 max-w-xl">
              Permit-ready architectural drawings delivered for pole barns, barndominiums, and post-frame buildings for clients worldwide.
            </p>
          </div>
          <Link to="/portfolio" className="flex-shrink-0 border border-navy/20 text-navy font-condensed font-bold text-xs uppercase tracking-wide px-5 py-3 hover:bg-navy hover:text-white transition-colors">
            View Full Portfolio →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayProjects.map((project, i) => (
            <ProjectCard key={project.id || project.title} project={project} index={i} featured={project.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}