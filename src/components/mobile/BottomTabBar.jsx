import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Image, Info, Phone } from 'lucide-react';

const TABS = [
  { label: 'Home',      path: '/',         icon: Home },
  { label: 'Services',  path: '/services', icon: Briefcase },
  { label: 'Portfolio', path: '/portfolio',icon: Image },
  { label: 'About',     path: '/about',    icon: Info },
  { label: 'Contact',   path: '/contact',  icon: Phone },
];

export default function BottomTabBar() {
  const location = useLocation();

  // Hide on portal and order pages (they have their own nav)
  const hidden = ['/portal', '/order', '/estimator'].some(p => location.pathname.startsWith(p));
  if (hidden) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy border-t border-white/10 flex"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map(({ label, path, icon: Icon }) => {
        const active = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 select-none min-h-[44px]"
          >
            <Icon size={20} className={active ? 'text-yellow' : 'text-gray-400'} />
            <span className={`font-mono text-[9px] tracking-widest uppercase ${active ? 'text-yellow' : 'text-gray-500'}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}