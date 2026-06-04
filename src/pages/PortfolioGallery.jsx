import PageLayout from '../components/layout/PageLayout';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { appClient } from '@/api/appClient';
import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Projects', emoji: '🏗️' },
  { id: 'Modern Farmhouse', label: 'Modern Farmhouse', emoji: '🏡' },
  { id: 'Traditional Agricultural', label: 'Traditional Agricultural', emoji: '🚜' },
  { id: 'Industrial Commercial', label: 'Industrial Commercial', emoji: '🏭' },
  { id: 'Residential Barndominium', label: 'Barndominium Living', emoji: '🏠' },
  { id: 'Equipment Storage', label: 'Equipment Storage', emoji: '📦' },
  { id: 'Hybrid Living', label: 'Hybrid Living', emoji: '🤝' },
];

export default function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const { data: projects = [] } = useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: () => appClient.entities.PortfolioProject.list('-created_date'),
  });

  const filtered = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow" />
            <span className="font-mono text-yellow text-[10px] tracking-widest uppercase">Our Work</span>
          </div>
          <h1 className="font-condensed font-black text-white text-5xl lg:text-6xl uppercase tracking-tight mb-4">
            Pole Barn & Design<br />Portfolio Gallery
          </h1>
          <p className="font-inter text-gray-400 text-base max-w-2xl leading-relaxed">
            Browse completed projects organized by design style. From modern farmhouses to traditional agricultural buildings, see our full range of permit-ready drawings.
          </p>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="bg-white grid-overlay py-8 border-b border-silver sticky top-16 lg:top-18 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-2">Filter by Style</div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 font-inter text-xs font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-navy text-white border border-navy'
                        : 'border border-silver bg-white text-navy hover:border-navy/50'
                    }`}
                  >
                    <span className="mr-1">{cat.emoji}</span>{cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-navy text-white'
                    : 'bg-silver text-navy hover:bg-silver/70'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-navy text-white'
                    : 'bg-silver text-navy hover:bg-silver/70'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <div className="font-inter text-sm text-steel">
            Showing <span className="font-bold text-navy">{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-white grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="font-condensed font-bold text-navy text-lg uppercase tracking-tight mb-2">No Projects Found</div>
              <p className="font-inter text-steel text-sm">Try selecting a different category.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden border border-silver hover:border-navy/30 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-silver">
                    <img
                      src={project.afterImg || project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-2">
                        {project.category || project.type}
                      </div>
                      <h3 className="font-condensed font-black text-white text-lg uppercase tracking-tight mb-1 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-300 text-xs">
                        <span>{project.size}</span>
                        <span>•</span>
                        <span>{project.location}</span>
                      </div>
                    </div>
                    {project.category && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-block bg-yellow text-navy px-2 py-1 font-mono text-[8px] font-bold tracking-widest uppercase">
                          {project.type}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-condensed font-bold text-navy uppercase tracking-tight text-sm mb-1 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="font-inter text-steel text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span>{project.size}</span>
                        <span>{project.location}</span>
                      </div>
                      <div className="text-[11px]">{project.services}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 border border-silver p-4 hover:bg-silver/30 hover:border-navy/30 transition-all group cursor-pointer"
                >
                  <img
                    src={project.afterImg || project.img}
                    alt={project.title}
                    className="w-24 h-24 object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-condensed font-black text-navy uppercase tracking-tight text-sm line-clamp-1">
                        {project.title}
                      </h3>
                      {project.category && (
                        <span className="text-[9px] bg-yellow/20 text-yellow px-2 py-0.5 font-bold tracking-widest uppercase flex-shrink-0">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <div className="font-inter text-steel text-xs space-y-0.5">
                      <div className="line-clamp-1">{project.services}</div>
                      <div className="flex items-center gap-2">
                        <span>{project.size}</span>
                        <span>•</span>
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-silver flex-shrink-0" />
                  <span className="font-mono text-[9px] text-steel tracking-widest uppercase flex-shrink-0 group-hover:text-navy transition-colors">
                    View →
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-condensed font-black text-white text-3xl uppercase tracking-tight mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="font-inter text-gray-400 text-sm max-w-xl mx-auto mb-6">
            Use our price estimator to get a quick quote, or submit the full order form with your building specs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/estimator" className="yellow-btn px-8 py-3 text-sm">Get a Quote</a>
            <a href="/order" className="border border-white/20 text-white font-condensed font-bold text-sm uppercase tracking-wide px-8 py-3 hover:border-yellow hover:text-yellow transition-colors">Start Your Order</a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}