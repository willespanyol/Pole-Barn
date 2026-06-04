import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import BottomTabBar from '../mobile/BottomTabBar';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-18 overscroll-none">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <BottomTabBar />
    </div>
  );
}