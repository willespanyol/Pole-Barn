import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appClient } from '@/api/appClient';
import PageLayout from '../components/layout/PageLayout';
import PortalOrders from '../components/portal/PortalOrders';
import PortalInquiries from '../components/portal/PortalInquiries';
import { User, FolderOpen, MessageSquare, LogOut, LayoutDashboard, Trash2 } from 'lucide-react';
import AdminDashboard from '../components/portal/AdminDashboard';
import DeleteAccountModal from '../components/mobile/DeleteAccountModal';

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [emailLogin, setEmailLogin] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    appClient.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        const me = await appClient.auth.me();
        setUser(me);
      }
      setLoading(false);
    });
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMessage('');
    try {
      const result = await appClient.auth.loginWithEmail(emailLogin, '/portal');
      if (!result?.localDemo) {
        setAuthMessage('Check your email for the secure login link.');
      }
    } catch (error) {
      setAuthMessage(error.message || 'Email login failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };


  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-4 border-silver border-t-navy rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <section className="min-h-screen bg-white flex items-center justify-center py-24">
          <div className="max-w-sm w-full px-6">
            <div className="w-14 h-14 bg-yellow flex items-center justify-center mx-auto mb-6">
              <User size={24} className="text-navy" />
            </div>

            <div className="font-mono text-steel text-[9px] tracking-widest uppercase text-center mb-2">Client Portal</div>
            <h2 className="font-condensed font-black text-navy text-3xl uppercase tracking-tight text-center mb-2">
              Sign In or Create Account
            </h2>
            <p className="font-inter text-steel text-sm text-center leading-relaxed mb-8">
              Access your project orders, track design progress, chat with the team, and download delivered drawings.
            </p>

            <button
              onClick={() => appClient.auth.loginWithGoogle('/portal')}
              className="w-full yellow-btn px-6 py-4 text-sm flex items-center justify-center gap-3 mb-4"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#0A1628"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#0A1628"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#0A1628"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#0A1628"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-silver flex-1" />
              <span className="font-mono text-[9px] text-steel tracking-widest uppercase">or email link</span>
              <div className="h-px bg-silver flex-1" />
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-3">
              <input
                type="email"
                required
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                placeholder="you@email.com"
                className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy transition-colors"
              />
              <button
                type="submit"
                disabled={authLoading}
                className="w-full navy-btn px-6 py-4 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {authLoading ? 'Sending Link...' : 'Send Secure Login Link'}
              </button>
            </form>

            {authMessage && (
              <p className="font-inter text-steel text-xs text-center mt-4 leading-relaxed">
                {authMessage}
              </p>
            )}

            <div className="mt-8 border-t border-silver pt-6">
              <div className="font-mono text-[9px] text-steel tracking-widest uppercase text-center mb-3">What you get</div>
              <div className="space-y-2">
                {['Track design & permit progress', 'Chat directly with the team', 'Download delivered drawings', 'Receive & accept project quotes'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-steel font-inter">
                    <div className="w-1.5 h-1.5 bg-yellow flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const isAdmin = user?.role === 'admin';
  const tabs = [
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Dashboard', icon: LayoutDashboard }] : []),
    { id: 'orders', label: 'Project Orders', icon: FolderOpen },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  ];

  return (
    <PageLayout>
      {/* Header */}
      <div className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-yellow" />
                <span className="font-mono text-yellow text-[9px] tracking-widest uppercase">Client Portal</span>
              </div>
              <h1 className="font-condensed font-black text-white text-3xl lg:text-4xl uppercase tracking-tight">
                Welcome, {user.full_name?.split(' ')[0] || 'Client'}
              </h1>
              <p className="font-inter text-gray-400 text-sm mt-1">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/order" className="yellow-btn px-5 py-2.5 text-xs">
                + New Order
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 border border-red-500/30 text-red-400 hover:text-red-300 hover:border-red-400 px-4 py-2.5 font-condensed font-bold text-xs uppercase tracking-wide transition-colors select-none"
              >
                <Trash2 size={13} /> Delete Account
              </button>
              <button
                onClick={() => appClient.auth.logout('/')}
                className="flex items-center gap-2 border border-white/20 text-gray-300 hover:text-yellow hover:border-yellow px-4 py-2.5 font-condensed font-bold text-xs uppercase tracking-wide transition-colors select-none"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-silver sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-4 font-condensed font-bold text-xs uppercase tracking-wide border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-yellow text-navy'
                  : 'border-transparent text-steel hover:text-navy'
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-screen bg-white grid-overlay py-10 pb-24 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'orders' && <PortalOrders currentUser={user} />}
          {activeTab === 'inquiries' && <PortalInquiries currentUser={user} />}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            // Log out after notifying — actual deletion would require a backend function
            await appClient.auth.logout('/');
          }}
        />
      )}
    </PageLayout>
  );
}