import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="blueprint-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-yellow flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="8" width="16" height="2" fill="#0A1628"/>
                  <rect x="8" y="1" width="2" height="16" fill="#0A1628"/>
                  <rect x="3" y="3" width="4" height="4" fill="#0A1628" opacity="0.5"/>
                  <rect x="11" y="11" width="4" height="4" fill="#0A1628" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <div className="font-condensed font-bold text-white text-base leading-none tracking-tight uppercase">Pole Barndo</div>
                <div className="font-mono text-yellow text-[9px] leading-none tracking-widest mt-0.5">DESIGN & PERMIT PLANS</div>
              </div>
            </div>
            <p className="text-gray-400 font-inter text-sm leading-relaxed mb-5">
              Permit-ready design and drafting for pole barns, post-frame buildings, barndominiums, garages, workshops, and agricultural structures for clients worldwide.
            </p>
            <div className="inline-flex items-center gap-2 border border-yellow/30 px-3 py-2">
              <div className="w-6 h-6 border border-yellow/50 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#F5C518" strokeWidth="1"/>
                  <path d="M4 6l1.5 1.5L8 4" stroke="#F5C518" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-mono text-yellow text-[9px] tracking-widest uppercase">Permit-Ready Design</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-4">Services</div>
            <ul className="space-y-2">
              {[
                { label: 'Pole Barn Design', path: '/pole-barn-design' },
                { label: 'Barndominium Plans', path: '/barndominium-design' },
                { label: 'Foundation Design', path: '/foundation-framing' },
                { label: 'Structural Framing', path: '/foundation-framing' },
                { label: 'MEP Layouts', path: '/mep-design' },
                { label: 'Structural Calculations', path: '/structural-calculations' },
                { label: 'Permit Review Revisions', path: '/services' },
              ].map(s => (
                <li key={s.label}>
                  <Link to={s.path} className="text-gray-400 hover:text-yellow font-inter text-sm transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 bg-yellow/50 group-hover:bg-yellow transition-colors flex-shrink-0"></span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-4">Quick Links</div>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/services' },
                { label: 'About', path: '/about' },
                { label: 'Estimator', path: '/estimator' },
                { label: 'Contact', path: '/contact' },
                { label: 'Start My Design Order', path: '/order' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-gray-400 hover:text-yellow font-inter text-sm transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 bg-yellow/50 group-hover:bg-yellow transition-colors flex-shrink-0"></span>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><a href="/blog/" className="text-gray-400 hover:text-yellow font-inter text-sm transition-colors">Articles &amp; Permit Guides</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-4">Contact</div>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-2.5">
                <Mail size={13} className="text-yellow mt-0.5 flex-shrink-0" />
                <a href="mailto:willymwangi997@gmail.com" className="text-gray-400 hover:text-yellow font-inter text-sm transition-colors">
                  willymwangi997@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={13} className="text-yellow mt-0.5 flex-shrink-0" />
                <a href="tel:+14803383000" className="text-gray-400 hover:text-yellow font-inter text-sm transition-colors">
                  +1 (480) 338-3000
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-yellow mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 font-inter text-sm">
                  Worldwide<br />Remote Design Service
                </span>
              </li>
            </ul>
            <div className="border border-white/10 p-3">
              <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-1">Service Coverage</div>
              <p className="text-gray-500 font-inter text-xs">Worldwide · Residential, Agricultural & Commercial · County and City Permit Requirements</p>
            </div>
          </div>
        </div>

        {/* Professional team service information */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <p className="font-inter text-gray-400 text-xs leading-relaxed max-w-4xl">
            <span className="text-white font-semibold">Design, engineering and professional sealing:</span>{' '}
            Our team coordinates architectural, structural and MEP drawing packages for projects across the United States and UAE. Clients can request professional review and sealed drawings through licensed engineering and architectural partners in the selected jurisdiction. We deliver coordinated, submission-ready drawing packages for the agreed scope.
          </p>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-gray-500 text-[10px] tracking-wide">
            © {new Date().getFullYear()} Pole Barndominium Designs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-gray-600 text-[10px] tracking-wide">POLE BARN · POST-FRAME · BARNDOMINIUM · FOUNDATION · FRAMING · MEP · STRUCTURAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}