import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PullToRefresh from '../mobile/PullToRefresh';
import { appClient } from '@/api/appClient';
import {
  CheckCircle2, XCircle, Clock, Eye, MapPin, Building2,
  Calendar, DollarSign, Paperclip, ExternalLink, ChevronDown, ChevronUp, User
} from 'lucide-react';
import MobileSelect from '../mobile/MobileSelect';

const TABS = [
  { id: 'new', label: 'New Requests', color: 'text-blue-600' },
  { id: 'in_review', label: 'In Review', color: 'text-yellow-600' },
  { id: 'quoted', label: 'Quoted', color: 'text-purple-600' },
  { id: 'in_progress', label: 'In Progress', color: 'text-orange-600' },
  { id: 'completed', label: 'Completed', color: 'text-green-600' },
];

const STATUS_COLORS = {
  new:         'bg-blue-50 text-blue-700 border-blue-200',
  in_review:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  quoted:      'bg-purple-50 text-purple-700 border-purple-200',
  in_progress: 'bg-orange-50 text-orange-700 border-orange-200',
  completed:   'bg-green-50 text-green-700 border-green-200',
};

function OrderRow({ order, onStatusChange, saving }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="border border-silver bg-white transition-all">
      {/* Summary row */}
      <div className="p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="font-condensed font-bold text-navy text-sm uppercase tracking-tight">
              {order.projectType || 'Project Order'}
            </span>
            {order.selectedPackage && (
              <span className="font-mono text-[8px] tracking-widest uppercase bg-silver text-steel px-2 py-0.5">
                {order.selectedPackage}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-steel mb-1">
            <User size={10} className="flex-shrink-0" />
            <span className="font-semibold text-navy">{order.fullName}</span>
            <span>·</span>
            <span>{order.email}</span>
            {order.phone && <><span>·</span><span>{order.phone}</span></>}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-steel">
            {(order.city || order.state || order.country) && (
              <span className="flex items-center gap-1"><MapPin size={10} /> {[order.city, order.state, order.country].filter(Boolean).join(', ')}</span>
            )}
            {(order.buildingLength && order.buildingWidth) && (
              <span className="flex items-center gap-1"><Building2 size={10} /> {order.buildingLength}×{order.buildingWidth} ft</span>
            )}
            <span className="flex items-center gap-1"><Calendar size={10} /> {date}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setExpanded(e => !e)}
            className="p-1.5 border border-silver text-steel hover:text-navy hover:border-navy/40 transition-colors"
            title="View details"
          >
            {expanded ? <ChevronUp size={14} /> : <Eye size={14} />}
          </button>
          {order.status === 'new' && (
            <>
              <button
                onClick={() => onStatusChange(order.id, 'in_review')}
                disabled={saving === order.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white font-condensed font-bold text-xs uppercase tracking-wide hover:bg-navy/80 transition-colors disabled:opacity-50"
              >
                <CheckCircle2 size={12} /> Approve
              </button>
              <button
                onClick={() => onStatusChange(order.id, 'completed')}
                disabled={saving === order.id}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 font-condensed font-bold text-xs uppercase tracking-wide hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <XCircle size={12} /> Reject
              </button>
            </>
          )}
          {order.status !== 'new' && (
            <MobileSelect
              label="Change Status"
              value={order.status}
              onChange={val => onStatusChange(order.id, val)}
              options={TABS.map(t => ({ value: t.id, label: t.label }))}
              className="w-36 text-xs"
            />
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-silver px-4 pb-4 pt-3 space-y-3 bg-silver/10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {order.intendedUse && <Detail label="Intended Use" value={order.intendedUse} />}
            {order.roofStyle && <Detail label="Roof Style" value={order.roofStyle} />}
            {order.numberOfFloors && <Detail label="Floors" value={order.numberOfFloors} />}
            {order.buildingCode && <Detail label="Building Code" value={order.buildingCode} />}
            {order.windSpeed && <Detail label="Wind Speed" value={order.windSpeed} />}
            {order.snowLoad && <Detail label="Snow Load" value={order.snowLoad} />}
            {order.timeline && <Detail label="Timeline" value={order.timeline} />}
            {order.preferredDeadline && <Detail label="Preferred Deadline" value={order.preferredDeadline} />}
            {order.forPermitSubmission && <Detail label="For Permit" value={order.forPermitSubmission} />}
          </div>

          {order.selectedServices?.length > 0 && (
            <div>
              <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-1.5">Selected Services</div>
              <div className="flex flex-wrap gap-1.5">
                {order.selectedServices.map(s => (
                  <span key={s} className="bg-silver px-2 py-0.5 font-inter text-xs text-navy">{s}</span>
                ))}
              </div>
            </div>
          )}

          {order.projectDescription && (
            <div>
              <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-1">Message</div>
              <p className="font-inter text-xs text-steel leading-relaxed">{order.projectDescription}</p>
            </div>
          )}

          {order.uploadedFileUrls?.length > 0 && (
            <div>
              <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-1.5">Attached Files</div>
              <div className="flex flex-wrap gap-2">
                {order.uploadedFileUrls.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-steel hover:text-navy border border-silver px-2.5 py-1 hover:border-navy/30 bg-white transition-colors">
                    <Paperclip size={9} />
                    {order.uploadedFileNames?.[i] || `File ${i + 1}`}
                    <ExternalLink size={8} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[8px] text-steel tracking-widest uppercase mb-0.5">{label}</div>
      <div className="font-inter text-xs text-navy">{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeStatus, setActiveStatus] = useState('new');
  const [saving, setSaving] = useState(null);
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => appClient.entities.ProjectOrder.list('-created_date'),
  });

  const handleStatusChange = async (orderId, newStatus) => {
    setSaving(orderId);
    const patch = { status: newStatus };
    if (newStatus === 'in_review') patch.designStage = 'in_review';
    // Optimistic update
    queryClient.setQueryData(['admin-orders'], (prev = []) =>
      prev.map(o => o.id === orderId ? { ...o, ...patch } : o)
    );
    try {
      await appClient.entities.ProjectOrder.update(orderId, patch);
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    } catch {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    }
    setSaving(null);
  };

  const filtered = orders.filter(o => o.status === activeStatus);
  const counts = Object.fromEntries(
    TABS.map(t => [t.id, orders.filter(o => o.status === t.id).length])
  );

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div>
      <div className="mb-6">
        <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight">Admin Dashboard</h2>
        <p className="font-inter text-steel text-sm mt-0.5">Review and manage all project requests</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveStatus(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 border font-condensed font-bold text-xs uppercase tracking-wide transition-colors ${
              activeStatus === tab.id
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-steel border-silver hover:border-navy/40 hover:text-navy'
            }`}
          >
            {tab.label}
            {counts[tab.id] > 0 && (
              <span className={`text-[9px] px-1.5 py-0.5 font-mono font-bold rounded-sm ${
                activeStatus === tab.id ? 'bg-yellow text-navy' : 'bg-silver text-steel'
              }`}>
                {counts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-7 h-7 border-4 border-silver border-t-navy rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-silver">
          <Clock size={20} className="text-silver mx-auto mb-3" />
          <p className="font-condensed font-bold text-steel text-sm uppercase tracking-wide">No {TABS.find(t => t.id === activeStatus)?.label}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(order => (
            <OrderRow
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
              saving={saving}
            />
          ))}
        </div>
      )}
    </div>
    </PullToRefresh>
  );
}