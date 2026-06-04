import { useState } from 'react';
import { appClient } from '@/api/appClient';
import { DollarSign, Clock, CheckCircle2, XCircle, CreditCard, AlertCircle } from 'lucide-react';
import MobileSelect from '../mobile/MobileSelect';

// Admin: submit a quote
function AdminQuoteForm({ inquiry, onUpdate }) {
  const [price, setPrice] = useState(inquiry.quotePrice || '');
  const [days, setDays] = useState(inquiry.quoteDays || '');
  const [note, setNote] = useState(inquiry.quoteNote || '');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setSaving(true);
    const updated = await appClient.entities.ContactInquiry.update(inquiry.id, {
      quotePrice: parseFloat(price),
      quoteDays: parseInt(days),
      quoteNote: note,
      quoteStatus: 'quoted',
    });
    onUpdate(updated);
    setSaving(false);
  };

  return (
    <div className="border border-silver bg-white p-5">
      <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-4">
        {inquiry.quoteStatus === 'quoted' ? 'Update Quote' : 'Submit Quote to Client'}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Price (USD) *</label>
          <div className="flex items-center border border-silver">
            <div className="px-3 py-3 bg-silver/30 border-r border-silver">
              <DollarSign size={13} className="text-steel" />
            </div>
            <input
              type="number" min="0" value={price} onChange={e => setPrice(e.target.value)}
              className="flex-1 px-3 py-3 font-inter text-sm text-navy focus:outline-none"
              placeholder="e.g. 1500"
            />
          </div>
        </div>
        <div>
          <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Delivery (Days) *</label>
          <div className="flex items-center border border-silver">
            <div className="px-3 py-3 bg-silver/30 border-r border-silver">
              <Clock size={13} className="text-steel" />
            </div>
            <input
              type="number" min="1" value={days} onChange={e => setDays(e.target.value)}
              className="flex-1 px-3 py-3 font-inter text-sm text-navy focus:outline-none"
              placeholder="e.g. 7"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Note to Client</label>
        <textarea
          value={note} onChange={e => setNote(e.target.value)} rows={3}
          className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy resize-none"
          placeholder="Explain what's included, payment instructions, etc."
        />
      </div>
      <button onClick={submit} disabled={!price || !days || saving} className="yellow-btn px-8 py-3 text-xs disabled:opacity-50">
        {saving ? 'Sending Quote...' : 'Send Quote to Client'}
      </button>
    </div>
  );
}

// Admin: payment confirmation
function AdminPaymentPanel({ inquiry, onUpdate }) {
  const [saving, setSaving] = useState(false);
  if (inquiry.paymentStatus !== 'payment_submitted') return null;

  const confirm = async () => {
    setSaving(true);
    const updated = await appClient.entities.ContactInquiry.update(inquiry.id, { paymentStatus: 'confirmed' });
    onUpdate(updated);
    setSaving(false);
  };

  return (
    <div className="border border-yellow/40 bg-yellow/5 p-5">
      <div className="flex items-start gap-3 mb-3">
        <AlertCircle size={16} className="text-yellow mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-condensed font-bold text-navy text-sm uppercase tracking-tight mb-1">Payment Submitted by Client</div>
          <p className="font-inter text-steel text-xs leading-relaxed">{inquiry.paymentDetails}</p>
          {inquiry.paymentMethod && <p className="font-mono text-[9px] text-steel mt-1 uppercase tracking-widest">Method: {inquiry.paymentMethod}</p>}
        </div>
      </div>
      <button onClick={confirm} disabled={saving} className="yellow-btn px-6 py-2.5 text-xs disabled:opacity-50">
        {saving ? 'Confirming...' : 'Confirm Payment & Start Order'}
      </button>
    </div>
  );
}

// Client: view quote and accept/decline
function ClientQuoteView({ inquiry, onUpdate }) {
  const [saving, setSaving] = useState(false);
  const [payDetails, setPayDetails] = useState('');
  const [payMethod, setPayMethod] = useState('');
  const [showPayForm, setShowPayForm] = useState(false);

  const respond = async (action) => {
    setSaving(true);
    const updated = await appClient.entities.ContactInquiry.update(inquiry.id, { quoteStatus: action });
    onUpdate(updated);
    setSaving(false);
  };

  const submitPayment = async () => {
    setSaving(true);
    const updated = await appClient.entities.ContactInquiry.update(inquiry.id, {
      paymentStatus: 'payment_submitted',
      paymentDetails: payDetails,
      paymentMethod: payMethod,
    });
    onUpdate(updated);
    setSaving(false);
  };

  if (inquiry.quoteStatus === 'pending') {
    return (
      <div className="border border-silver bg-silver/10 p-5 text-center">
        <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-2">Awaiting Quote</div>
        <p className="font-inter text-steel text-sm">Our team is reviewing your inquiry. A price and timeline will appear here shortly.</p>
      </div>
    );
  }

  if (inquiry.quoteStatus === 'declined') {
    return (
      <div className="border border-red-200 bg-red-50 p-4 flex items-center gap-3">
        <XCircle size={16} className="text-red-500 flex-shrink-0" />
        <p className="font-inter text-sm text-red-700">You declined this quote. Contact us if you'd like to discuss further.</p>
      </div>
    );
  }

  if (inquiry.quoteStatus === 'accepted' || inquiry.paymentStatus !== 'unpaid') {
    if (inquiry.paymentStatus === 'confirmed') {
      return (
        <div className="border border-green-200 bg-green-50 p-4 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
          <div>
            <div className="font-condensed font-bold text-green-800 text-sm uppercase tracking-tight">Payment Confirmed — Order Started</div>
            <p className="font-inter text-xs text-green-700 mt-0.5">Your project is now in production. Track progress in the Orders tab.</p>
          </div>
        </div>
      );
    }
    if (inquiry.paymentStatus === 'payment_submitted') {
      return (
        <div className="border border-yellow/40 bg-yellow/5 p-4 flex items-center gap-3">
          <Clock size={16} className="text-yellow flex-shrink-0" />
          <div>
            <div className="font-condensed font-bold text-navy text-sm uppercase tracking-tight">Payment Submitted — Awaiting Confirmation</div>
            <p className="font-inter text-xs text-steel mt-0.5">We'll confirm your payment and start your project shortly.</p>
          </div>
        </div>
      );
    }

    // accepted, not yet paid — show payment form
    return (
      <div className="border border-silver bg-white p-5">
        <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-4 flex items-center gap-2">
          <CreditCard size={11} /> Submit Payment Details
        </div>
        <p className="font-inter text-steel text-sm mb-4 leading-relaxed">
          Please transfer <strong className="text-navy">${inquiry.quotePrice?.toLocaleString()}</strong> using your preferred method and provide the reference below.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Payment Method</label>
            <MobileSelect
              label="Payment Method"
              value={payMethod}
              onChange={val => setPayMethod(val)}
              options={['Bank Transfer', 'Zelle', 'PayPal', 'Venmo', 'Check', 'Other'].map(m => ({ value: m, label: m }))}
              placeholder="Select method"
            />
          </div>
          <div>
            <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">Transaction Reference / Note</label>
            <input value={payDetails} onChange={e => setPayDetails(e.target.value)}
              className="w-full border border-silver px-4 py-3 font-inter text-sm text-navy focus:outline-none focus:border-navy"
              placeholder="e.g. Conf #12345 or last 4 digits" />
          </div>
        </div>
        <button onClick={submitPayment} disabled={!payDetails || !payMethod || saving}
          className="yellow-btn px-8 py-3 text-xs disabled:opacity-50">
          {saving ? 'Submitting...' : 'Submit Payment Confirmation'}
        </button>
      </div>
    );
  }

  // quoted — client can accept or decline
  return (
    <div className="border border-silver bg-white p-5">
      <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-4">Quote Received</div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-navy/5 border border-silver px-5 py-4 text-center">
          <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-1">Total Price</div>
          <div className="font-condensed font-black text-navy text-3xl">${inquiry.quotePrice?.toLocaleString()}</div>
        </div>
        <div className="bg-navy/5 border border-silver px-5 py-4 text-center">
          <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-1">Delivery Time</div>
          <div className="font-condensed font-black text-navy text-3xl">{inquiry.quoteDays} <span className="text-lg font-bold">days</span></div>
        </div>
      </div>
      {inquiry.quoteNote && (
        <div className="mb-4 p-3 bg-silver/20 border border-silver">
          <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-1">Note from Pole Barndo</div>
          <p className="font-inter text-sm text-navy leading-relaxed">{inquiry.quoteNote}</p>
        </div>
      )}
      <div className="flex gap-3">
        <button onClick={() => respond('accepted')} disabled={saving}
          className="yellow-btn px-8 py-3 text-xs flex items-center gap-2 disabled:opacity-50">
          <CheckCircle2 size={13} /> Accept & Proceed to Payment
        </button>
        <button onClick={() => respond('declined')} disabled={saving}
          className="border border-silver px-6 py-3 font-condensed font-bold text-xs uppercase tracking-wide text-steel hover:text-navy hover:border-navy transition-colors disabled:opacity-50">
          Decline
        </button>
      </div>
    </div>
  );
}

export default function QuotePanel({ inquiry, currentUser, onUpdate }) {
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="space-y-4">
      <div className="font-mono text-[9px] text-yellow tracking-widest uppercase">Quote & Payment</div>

      {/* Client's budget */}
      {inquiry.budgetRange && (
        <div className="flex items-center gap-2 text-xs text-steel">
          <span className="font-mono tracking-widest uppercase">Client Budget:</span>
          <span className="font-inter font-semibold text-navy">{inquiry.budgetRange}</span>
        </div>
      )}

      {isAdmin ? (
        <>
          <AdminQuoteForm inquiry={inquiry} onUpdate={onUpdate} />
          <AdminPaymentPanel inquiry={inquiry} onUpdate={onUpdate} />
        </>
      ) : (
        <ClientQuoteView inquiry={inquiry} onUpdate={onUpdate} />
      )}
    </div>
  );
}