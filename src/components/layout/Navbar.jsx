import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowLeft } from 'lucide-react';
import { appClient } from '@/api/appClient';

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    children: [
      { label: 'All Services', path: '/services' },
      { label: 'Pole Barn Design', path: '/pole-barn-design' },
      { label: 'Barndominium Design', path: '/barndominium-design' },
      { label: 'Foundation & Framing', path: '/foundation-framing' },
      { label: 'MEP Design', path: '/mep-design' },
      { label: 'Structural Calculations', path: '/structural-calculations' },
    ],
  },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Resources', path: '/resources' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Client Portal', path: '/portal' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(null); setMobileExpanded(null); }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy shadow-2xl' : 'bg-navy/95 backdrop-blur-sm'}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Back button */}
          {!isHome ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-yellow transition-colors min-h-[44px] min-w-[44px] select-none"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
              <span className="font-condensed font-bold text-sm uppercase tracking-wide hidden sm:inline">Back</span>
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-8 h-8 bg-yellow flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="8" width="16" height="2" fill="#0A1628"/>
                  <rect x="8" y="1" width="2" height="16" fill="#0A1628"/>
                  <rect x="3" y="3" width="4" height="4" fill="#0A1628" opacity="0.5"/>
                  <rect x="11" y="11" width="4" height="4" fill="#0A1628" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <div className="font-condensed font-black text-white text-sm leading-none tracking-tight uppercase">Pole Barndo</div>
                <div className="font-mono text-yellow text-[9px] leading-none tracking-widest">DESIGN & PERMIT PLANS</div>
              </div>
            </Link>
          )}

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}>
                  <button className={`flex items-center gap-1 px-3 py-2 font-inter text-sm font-medium transition-colors hover:text-yellow ${dropdown === link.label ? 'text-yellow' : 'text-gray-300'}`}>
                    {link.label} <ChevronDown size={11} />
                  </button>
                  {dropdown === link.label && (
                    <div className="absolute top-full left-0 bg-navy border border-white/10 shadow-2xl py-1 min-w-[220px]">
                      {link.children.map(c => (
                        <Link key={c.path} to={c.path}
                          className={`block px-4 py-2.5 font-inter text-sm transition-colors hover:text-yellow hover:bg-white/5 ${location.pathname === c.path ? 'text-yellow' : 'text-gray-300'}`}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.path} to={link.path}
                  className={`px-3 py-2 font-inter text-sm font-medium transition-colors hover:text-yellow ${location.pathname === link.path ? 'text-yellow' : 'text-gray-300'}`}>
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
           <Link
             to="/order"
             className="yellow-btn px-5 py-2.5 text-sm font-semibold"
             onClick={() => appClient.analytics.track({ eventName: 'upload_plans_clicked', properties: { source: 'navbar_desktop' } })}
           >
             Upload Plans
           </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-0.5">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-300 hover:text-yellow font-inter text-sm font-medium">
                    {link.label}
                    <ChevronDown size={12} className={`transition-transform ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="bg-white/5">
                      {link.children.map(c => (
                        <Link key={c.path} to={c.path}
                          className="block px-6 py-2 text-gray-400 hover:text-yellow font-inter text-sm transition-colors">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.path} to={link.path}
                  className={`block px-4 py-2.5 font-inter text-sm font-medium transition-colors hover:text-yellow ${location.pathname === link.path ? 'text-yellow' : 'text-gray-300'}`}>
                  {link.label}
                </Link>
              )
            ))}
            <div className="px-4 pt-3 space-y-2 border-t border-white/10 mt-2">
              <Link
                to="/order"
                className="block text-center yellow-btn px-4 py-2.5 text-sm font-semibold"
                onClick={() => appClient.analytics.track({ eventName: 'upload_plans_clicked', properties: { source: 'navbar_mobile' } })}
              >Upload Plans</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}