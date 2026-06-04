import { useState } from 'react';
import { appClient } from '@/api/appClient';
import { DollarSign, Clock, CheckCircle2, AlertCircle, CreditCard } from 'lucide-react';
import MobileSelect from '../mobile/MobileSelect';

// Admin sets price & confirms payment
export function AdminPricingPanel({ order, onUpdate }) {
  const [price, setPrice] = useState(order.quotePrice || '');
  const [days, setDays] = useState(order.quoteDays || '');
  const [note, setNote] = useState(order.quoteNote || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const sendQuote = async () => {
    if (!price || !days) return;
    setSaving(true);
    const updated = await appClient.entities.ProjectOrder.update(order.id, {
      quotePrice: parseFloat(price),
      quoteDays: parseInt(days),
      quoteNote: note,
      quoteStatus: 'quoted',
      status: 'quoted',
    });
    // notify client
    try {
      await appClient.functions.invoke('sendStatusNotification', {
        entityType: 'order',
        entityId: order.id,
        newStatus: 'quoted',
        clientEmail: order.email,
        clientName: order.fullName,
      });
    } catch (_) {}
    onUpdate(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const confirmPayment = async () => {
    setSaving(true);
    const updated = await appClient.entities.ProjectOrder.update(order.id, {
      paymentStatus: 'confirmed',
      status: 'in_progress',
      designStage: 'drafting',
    });
    try {
      await appClient.functions.invoke('sendStatusNotification', {
        entityType: 'order',
        entityId: order.id,
        newStatus: 'in_progress',
        clientEmail: order.email,
        clientName: order.fullName,
      });
    } catch (_) {}
    onUpdate(updated);
    setSaving(false);
  };

  return (
    <div className="border border-yellow/40 bg-yellow/5 p-4 space-y-4">
      <div className="font-mono text-[9px] text-yellow tracking-widests uppercase flex items-center justify-between">
        <span>Pricing & Payment</span>
        {saved && <span className="flex items-center gap-1 text-green-600 font-mono text-[8px]"><CheckCircle2 size={9} /> Sent</span>}
      </div>

      {/* Quote form */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="font-mono text-[8px] text-steel tracking-widest uppercase block mb-1">Price (USD)</label>
          <div className="flex items-center border border-silver bg-white">
            <div className="px-2.5 py-2.5 bg-silver/30 border-r border-silver"><DollarSign size={11} className="text-steel" /></div>
            <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)}
              className="flex-1 px-3 py-2.5 font-inter text-sm text-navy focus:outline-none" placeholder="e.g. 1500" />
          </div>
        </div>
        <div>
          <label className="font-mono text-[8px] text-steel tracking-widest uppercase block mb-1">Delivery (Days)</label>
          <div className="flex items-center border border-silver bg-white">
            <div className="px-2.5 py-2.5 bg-silver/30 border-r border-silver"><Clock size={11} className="text-steel" /></div>
            <input type="number" min="1" value={days} onChange={e => setDays(e.target.value)}
              className="flex-1 px-3 py-2.5 font-inter text-sm text-navy focus:outline-none" placeholder="e.g. 7" />
          </div>
        </div>
      </div>
      <div>
        <label className="font-mono text-[8px] text-steel tracking-widest uppercase block mb-1">Note to Client</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
          className="w-full border border-silver px-3 py-2 font-inter text-sm text-navy focus:outline-none focus:border-navy resize-none bg-white"
          placeholder="What's included, payment instructions…" />
      </div>
      <button onClick={sendQuote} disabled={!price || !days || saving}
        className="yellow-btn px-6 py-2.5 text-xs disabled:opacity-50">
        {saving ? 'Sending…' : order.quoteStatus === 'quoted' ? 'Update & Resend Quote' : 'Send Quote to Client'}
      </button>

      {/* Payment submitted alert */}
      {order.paymentStatus === 'payment_submitted' && (
        <div className="border border-yellow/60 bg-yellow/10 p-3">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle size={14} className="text-yellow mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-condensed font-bold text-navy text-xs uppercase tracking-tight">Payment Submitted by Client</div>
              {order.paymentDetails && <p className="font-inter text-xs text-steel mt-0.5">{order.paymentDetails}</p>}
              {order.paymentMethod && <p className="font-mono text-[8px] text-steel mt-0.5 uppercase tracking-widest">Method: {order.paymentMethod}</p>}
            </div>
          </div>
          <button onClick={confirmPayment} disabled={saving}
            className="yellow-btn px-5 py-2 text-xs flex items-center gap-1.5 disabled:opacity-50">
            <CheckCircle2 size={11} /> Confirm Payment & Start Order
          </button>
        </div>
      )}

      {order.paymentStatus === 'confirmed' && (
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 p-2.5">
          <CheckCircle2 size={12} className="text-green-600 flex-shrink-0" />
          <span className="font-condensed font-bold uppercase tracking-wide">Payment Confirmed — Order Active</span>
        </div>
      )}
    </div>
  );
}

// Client view of quote/payment for orders
export function ClientOrderPaymentView({ order, onUpdate }) {
  const [payDetails, setPayDetails] = useState('');
  const [payMethod, setPayMethod] = useState('');
  const [saving, setSaving] = useState(false);

  const accept = async () => {
    setSaving(true);
    const updated = await appClient.entities.ProjectOrder.update(order.id, { quoteStatus: 'accepted' });
    onUpdate(updated);
    setSaving(false);
  };

  const decline = async () => {
    setSaving(true);
    const updated = await appClient.entities.ProjectOrder.update(order.id, { quoteStatus: 'declined' });
    onUpdate(updated);
    setSaving(false);
  };

  const submitPayment = async () => {
    setSaving(true);
    const updated = await appClient.entities.ProjectOrder.update(order.id, {
      paymentStatus: 'payment_submitted',
      paymentDetails: payDetails,
      paymentMethod: payMethod,
    });
    onUpdate(updated);
    setSaving(false);
  };

  if (!order.quoteStatus || order.quoteStatus === 'pending') return null;

  if (order.quoteStatus === 'declined') {
    return (
      <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700 font-inter">
        You declined this quote. Contact us to discuss further.
      </div>
    );
  }

  if (order.paymentStatus === 'confirmed') {
    return (
      <div className="border border-green-200 bg-green-50 p-3 flex items-center gap-2">
        <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
        <div>
          <div className="font-condensed font-bold text-green-800 text-xs uppercase tracking-tight">Payment Confirmed — Project Started</div>
          <p className="font-inter text-xs text-green-700 mt-0.5">Our team is now working on your drawings.</p>
        </div>
      </div>
    );
  }

  if (order.paymentStatus === 'payment_submitted') {
    return (
      <div className="border border-yellow/40 bg-yellow/5 p-3 flex items-center gap-2">
        <Clock size={14} className="text-yellow flex-shrink-0" />
        <div className="font-condensed font-bold text-navy text-xs uppercase tracking-tight">Payment Submitted — Awaiting Confirmation</div>
      </div>
    );
  }

  if (order.quoteStatus === 'quoted') {
    return (
      <div className="border border-silver bg-white p-4 space-y-3">
        <div className="font-mono text-[9px] text-yellow tracking-widest uppercase">Quote Received</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-navy/5 border border-silver px-4 py-3 text-center">
            <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-1">Price</div>
            <div className="font-condensed font-black text-navy text-2xl">${order.quotePrice?.toLocaleString()}</div>
          </div>
          <div className="bg-navy/5 border border-silver px-4 py-3 text-center">
            <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-1">Delivery</div>
            <div className="font-condensed font-black text-navy text-2xl">{order.quoteDays} <span className="text-base font-bold">days</span></div>
          </div>
        </div>
        {order.quoteNote && (
          <div className="p-3 bg-silver/20 border border-silver font-inter text-xs text-navy leading-relaxed">{order.quoteNote}</div>
        )}
        <div className="flex gap-2">
          <button onClick={accept} disabled={saving} className="yellow-btn px-6 py-2.5 text-xs flex items-center gap-1.5 disabled:opacity-50">
            <CheckCircle2 size={11} /> Accept Quote
          </button>
          <button onClick={decline} disabled={saving} className="border border-silver px-4 py-2.5 font-condensed font-bold text-xs uppercase tracking-wide text-steel hover:text-navy hover:border-navy transition-colors disabled:opacity-50">
            Decline
          </button>
        </div>
      </div>
    );
  }

  // accepted, not paid yet
  return (
    <div className="border border-silver bg-white p-4 space-y-3">
      <div className="font-mono text-[9px] text-yellow tracking-widest uppercase flex items-center gap-1.5"><CreditCard size={10} /> Submit Payment</div>
      <p className="font-inter text-sm text-steel">
        Transfer <strong className="text-navy">${order.quotePrice?.toLocaleString()}</strong> and enter the reference below to start your project.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="font-mono text-[8px] text-steel tracking-widest uppercase block mb-1">Payment Method</label>
          <MobileSelect
            label="Payment Method"
            value={payMethod}
            onChange={val => setPayMethod(val)}
            options={['Bank Transfer', 'Zelle', 'PayPal', 'Venmo', 'Check', 'Other'].map(m => ({ value: m, label: m }))}
            placeholder="Select…"
          />
        </div>
        <div>
          <label className="font-mono text-[8px] text-steel tracking-widest uppercase block mb-1">Reference / Note</label>
          <input value={payDetails} onChange={e => setPayDetails(e.target.value)}
            className="w-full border border-silver px-3 py-2.5 font-inter text-sm text-navy focus:outline-none focus:border-navy"
            placeholder="e.g. Conf #12345" />
        </div>
      </div>
      <button onClick={submitPayment} disabled={!payDetails || !payMethod || saving}
        className="yellow-btn px-6 py-2.5 text-xs disabled:opacity-50">
        {saving ? 'Submitting…' : 'Submit Payment Confirmation'}
      </button>
    </div>
  );
}