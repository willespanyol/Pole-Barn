import { useState } from 'react';
import { ArrowLeft, MapPin, Building2, Calendar, Paperclip, ExternalLink } from 'lucide-react';
import InquiryChat from './InquiryChat';
import QuotePanel from './QuotePanel';
import FileAnnotations from './FileAnnotations';

const QUOTE_STATUS_CONFIG = {
  pending:  { label: 'Pending Quote', color: 'bg-silver text-steel border-silver' },
  quoted:   { label: 'Quote Sent',    color: 'bg-yellow/20 text-yellow border-yellow/40' },
  accepted: { label: 'Quote Accepted', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  declined: { label: 'Quote Declined', color: 'bg-red-50 text-red-600 border-red-200' },
};
const PAY_STATUS_CONFIG = {
  unpaid:            { label: 'Unpaid',              color: 'bg-silver text-steel border-silver' },
  payment_submitted: { label: 'Payment Submitted',   color: 'bg-yellow/20 text-yellow border-yellow/40' },
  confirmed:         { label: 'Payment Confirmed',   color: 'bg-green-50 text-green-700 border-green-200' },
};

export default function InquiryDetail({ inquiry: initialInquiry, currentUser, onBack }) {
  const [inquiry, setInquiry] = useState(initialInquiry);
  const date = new Date(inquiry.created_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const qStatus = QUOTE_STATUS_CONFIG[inquiry.quoteStatus || 'pending'];
  const pStatus = PAY_STATUS_CONFIG[inquiry.paymentStatus || 'unpaid'];

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 font-condensed font-bold text-steel text-xs uppercase tracking-wide hover:text-navy transition-colors mb-6">
        <ArrowLeft size={14} /> All Inquiries
      </button>

      {/* Header */}
      <div className="border border-silver bg-white p-5 mb-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="font-condensed font-black text-navy text-xl uppercase tracking-tight">
              {inquiry.buildingType || 'General Inquiry'}
            </h2>
            <p className="font-inter text-steel text-sm mt-0.5">{inquiry.name} · {inquiry.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 border font-mono text-[9px] tracking-widest uppercase font-bold ${qStatus.color}`}>
              {qStatus.label}
            </span>
            {inquiry.quoteStatus === 'accepted' && (
              <span className={`inline-flex items-center px-2.5 py-0.5 border font-mono text-[9px] tracking-widest uppercase font-bold ${pStatus.color}`}>
                {pStatus.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-steel">
          {inquiry.projectLocation && (
            <span className="flex items-center gap-1.5"><MapPin size={11} /> {inquiry.projectLocation}</span>
          )}
          {inquiry.buildingSize && (
            <span className="flex items-center gap-1.5"><Building2 size={11} /> {inquiry.buildingSize}</span>
          )}
          <span className="flex items-center gap-1.5"><Calendar size={11} /> {date}</span>
          {inquiry.budgetRange && (
            <span className="flex items-center gap-1.5 font-semibold text-navy">Budget: {inquiry.budgetRange}</span>
          )}
        </div>
        {inquiry.projectDescription && (
          <p className="font-inter text-sm text-steel leading-relaxed mt-3 border-t border-silver pt-3">{inquiry.projectDescription}</p>
        )}
        {inquiry.file_urls?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {inquiry.file_urls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-steel hover:text-navy border border-silver px-3 py-1.5 hover:border-navy/30 transition-colors">
                <Paperclip size={10} /> {inquiry.file_name?.split(', ')[i] || `File ${i + 1}`}
                <ExternalLink size={9} />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* File annotations */}
      {inquiry.file_urls?.length > 0 && (
        <div className="mb-5">
          <FileAnnotations inquiry={inquiry} currentUser={currentUser} />
        </div>
      )}

      {/* Two column layout on large screens */}
      <div className="grid lg:grid-cols-2 gap-5">
        <InquiryChat inquiry={inquiry} currentUser={currentUser} />
        <QuotePanel inquiry={inquiry} currentUser={currentUser} onUpdate={setInquiry} />
      </div>
    </div>
  );
}