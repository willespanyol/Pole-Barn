import { useState } from 'react';
import { appClient } from '@/api/appClient';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { AdminPricingPanel } from './AdminPricingPanel';
import AdminDeliveryUpload from './AdminDeliveryUpload';

const STAGES = [
  { id: 'request_received',       label: 'Request Received' },
  { id: 'in_review',              label: 'In Review' },
  { id: 'drafting',               label: 'Drafting' },
  { id: 'structural_calculation', label: 'Structural Calculation' },
  { id: 'client_revision',        label: 'Client Revision' },
  { id: 'final_delivery',         label: 'Final Delivery' },
];

const STATUS_OPTIONS = [
  { id: 'new',         label: 'New' },
  { id: 'in_review',   label: 'In Review' },
  { id: 'quoted',      label: 'Quoted' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed',   label: 'Completed' },
];

export default function AdminOrderControls({ order, onUpdate }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentStageIndex = STAGES.findIndex(s => s.id === (order.designStage || 'request_received'));

  const update = async (patch) => {
    setSaving(true);
    const updated = await appClient.entities.ProjectOrder.update(order.id, patch);
    onUpdate(updated);
    // Send email notification on status or stage change
    try {
      if (patch.status) {
        await appClient.functions.invoke('sendStatusNotification', {
          entityType: 'order', entityId: order.id,
          newStatus: patch.status, clientEmail: order.email, clientName: order.fullName,
        });
      }
      if (patch.designStage) {
        await appClient.functions.invoke('sendStatusNotification', {
          entityType: 'order', entityId: order.id,
          newStage: patch.designStage, clientEmail: order.email, clientName: order.fullName,
        });
      }
    } catch (_) {}
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="border border-yellow/40 bg-yellow/5 p-4 space-y-4">
      <div className="font-mono text-[9px] text-yellow tracking-widest uppercase flex items-center justify-between">
        <span>Admin Controls</span>
        {saved && <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={10} /> Saved</span>}
      </div>

      {/* Order status */}
      <div>
        <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-2">Order Status</label>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => update({ status: opt.id })}
              disabled={saving}
              className={`px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase font-bold border transition-colors disabled:opacity-50 ${
                order.status === opt.id
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-steel border-silver hover:border-navy hover:text-navy'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing & payment */}
      <AdminPricingPanel order={order} onUpdate={onUpdate} />

      {/* Deliver files to client */}
      <AdminDeliveryUpload order={order} onUpdate={onUpdate} />

      {/* Design stage */}
      <div>
        <label className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-2">Design Stage</label>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => update({ designStage: stage.id })}
              disabled={saving}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase font-bold border transition-colors disabled:opacity-50 ${
                order.designStage === stage.id
                  ? 'bg-yellow text-navy border-yellow'
                  : i < currentStageIndex
                  ? 'bg-navy/5 text-navy border-navy/20'
                  : 'bg-white text-steel border-silver hover:border-navy hover:text-navy'
              }`}
            >
              {i < currentStageIndex && <CheckCircle2 size={9} />}
              {i === currentStageIndex && <ChevronRight size={9} />}
              {stage.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}