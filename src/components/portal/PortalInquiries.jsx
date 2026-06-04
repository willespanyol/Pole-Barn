import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PullToRefresh from '../mobile/PullToRefresh';
import { appClient } from '@/api/appClient';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, MapPin, Building2, ChevronRight, DollarSign } from 'lucide-react';
import InquiryDetail from './InquiryDetail';

const QUOTE_BADGE = {
  pending:  { label: 'Awaiting Quote',   color: 'bg-silver text-steel border-silver' },
  quoted:   { label: 'Quote Received',   color: 'bg-yellow/20 text-yellow border-yellow/40' },
  accepted: { label: 'Quote Accepted',   color: 'bg-blue-50 text-blue-700 border-blue-200' },
  declined: { label: 'Declined',         color: 'bg-red-50 text-red-600 border-red-200' },
};
const PAY_BADGE = {
  unpaid:            null,
  payment_submitted: { label: 'Payment Sent',      color: 'bg-orange-50 text-orange-600 border-orange-200' },
  confirmed:         { label: 'Payment Confirmed', color: 'bg-green-50 text-green-700 border-green-200' },
};

export default function PortalInquiries({ currentUser }) {
  const [selected, setSelected] = useState(null);
  const queryClient = useQueryClient();

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ['portal-inquiries'],
    queryFn: () => appClient.entities.ContactInquiry.list('-created_date'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-7 h-7 border-4 border-silver border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  if (selected) {
    return (
      <InquiryDetail
        inquiry={selected}
        currentUser={currentUser}
        onBack={() => {
          setSelected(null);
          queryClient.invalidateQueries({ queryKey: ['portal-inquiries'] });
        }}
      />
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 bg-silver flex items-center justify-center mx-auto mb-4">
          <MessageSquare size={20} className="text-steel" />
        </div>
        <h3 className="font-condensed font-bold text-navy text-xl uppercase tracking-tight mb-2">No Inquiries Yet</h3>
        <p className="font-inter text-steel text-sm mb-6">You haven't submitted any project inquiries yet.</p>
        <Link to="/contact" className="yellow-btn px-8 py-3 text-sm inline-block">Send an Inquiry</Link>
      </div>
    );
  }

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['portal-inquiries'] });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight">Project Inquiries</h2>
          <p className="font-inter text-steel text-sm mt-0.5">{inquiries.length} inquir{inquiries.length !== 1 ? 'ies' : 'y'} submitted</p>
        </div>
        <Link to="/contact" className="yellow-btn px-5 py-2.5 text-xs">+ New Inquiry</Link>
      </div>
      <div className="space-y-3">
        {inquiries.map(inquiry => {
          const date = new Date(inquiry.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const qBadge = QUOTE_BADGE[inquiry.quoteStatus || 'pending'];
          const pBadge = PAY_BADGE[inquiry.paymentStatus || 'unpaid'];

          return (
            <button
              key={inquiry.id}
              onClick={() => setSelected(inquiry)}
              className="w-full text-left border border-silver bg-white p-5 hover:border-navy/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 border font-mono text-[9px] tracking-widest uppercase font-bold ${qBadge.color}`}>
                      {qBadge.label}
                    </span>
                    {pBadge && (
                      <span className={`inline-flex items-center px-2 py-0.5 border font-mono text-[9px] tracking-widest uppercase font-bold ${pBadge.color}`}>
                        {pBadge.label}
                      </span>
                    )}
                    <span className="font-condensed font-bold text-navy text-sm uppercase tracking-tight">
                      {inquiry.buildingType || 'General Inquiry'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-steel">
                    {inquiry.projectLocation && (
                      <span className="flex items-center gap-1.5"><MapPin size={11} /> {inquiry.projectLocation}</span>
                    )}
                    {inquiry.buildingSize && (
                      <span className="flex items-center gap-1.5"><Building2 size={11} /> {inquiry.buildingSize}</span>
                    )}
                    {inquiry.budgetRange && (
                      <span className="flex items-center gap-1.5"><DollarSign size={11} /> {inquiry.budgetRange}</span>
                    )}
                    <span className="flex items-center gap-1.5"><Calendar size={11} /> {date}</span>
                  </div>
                  {inquiry.quoteStatus === 'quoted' && inquiry.quotePrice && (
                    <div className="mt-2 font-inter text-sm">
                      <span className="text-steel">Quote: </span>
                      <strong className="text-navy">${inquiry.quotePrice.toLocaleString()}</strong>
                      <span className="text-steel"> · {inquiry.quoteDays} days</span>
                    </div>
                  )}
                </div>
                <ChevronRight size={16} className="text-silver group-hover:text-navy transition-colors flex-shrink-0 mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
    </PullToRefresh>
  );
}