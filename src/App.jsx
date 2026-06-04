import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
// Add page imports here
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Order from './pages/Order';
import Estimator from './pages/Estimator';
import PoleBarnDesign from './pages/PoleBarnDesign';
import BarndominiumDesign from './pages/BarndominiumDesign';
import FoundationFraming from './pages/FoundationFraming';
import MepDesign from './pages/MepDesign';
import StructuralCalculations from './pages/StructuralCalculations';
import Portfolio from './pages/Portfolio';
import Faq from './pages/Faq';
import ClientPortal from './pages/ClientPortal';
import Resources from './pages/Resources';
import PortfolioGallery from './pages/PortfolioGallery';
import PortfolioManagement from './pages/PortfolioManagement';
import PageTransition from './components/layout/PageTransition';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <PageTransition>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/order" element={<Order />} />
      <Route path="/estimator" element={<Estimator />} />
      <Route path="/pole-barn-design" element={<PoleBarnDesign />} />
      <Route path="/barndominium-design" element={<BarndominiumDesign />} />
      <Route path="/foundation-framing" element={<FoundationFraming />} />
      <Route path="/mep-design" element={<MepDesign />} />
      <Route path="/structural-calculations" element={<StructuralCalculations />} />
      <Route path="/portfolio" element={<PortfolioGallery />} />
      <Route path="/admin/portfolio" element={<PortfolioManagement />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/portal" element={<ClientPortal />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </PageTransition>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App