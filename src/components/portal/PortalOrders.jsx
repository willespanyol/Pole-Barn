import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PullToRefresh from '../mobile/PullToRefresh';
import { appClient } from '@/api/appClient';
import { Link } from 'react-router-dom';
import { FolderOpen, ChevronDown, ChevronUp, Calendar, MapPin, Layers, Download, FileText, ExternalLink } from 'lucide-react';
import DesignProgressTracker from './DesignProgressTracker';
import AdminOrderControls from './AdminOrderControls';
import { ClientOrderPaymentView } from './AdminPricingPanel';

const STATUS_CONFIG = {
  new:         { label: 'New',         color: 'bg-blue-50 text-blue-700 border-blue-200' },
  in_review:   { label: 'In Review',   color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  quoted:      { label: 'Quoted',      color: 'bg-purple-50 text-purple-700 border-purple-200' },
  in_progress: { label: 'In Progress', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  completed:   { label: 'Completed',   color: 'bg-green-50 text-green-700 border-green-200' },
};

function ConsultationBanner({ date }) {
  if (!date) return null;
  const d = new Date(date);
  const isPast = d < new Date();
  const formatted = d.toLocaleString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
  return (
    <div className={`flex items-center gap-3 px-4 py-3 border ${isPast ? 'bg-silver/30 border-silver text-steel' : 'bg-yellow/10 border-yellow/40 text-navy'}`}>
      <Calendar size={14} className={isPast ? 'text-steel' : 'text-yellow'} />
      <div>
        <span className="font-mono text-[8px] tracking-widest uppercase mr-2">{isPast ? 'Consultation held' : 'Consultation scheduled'}</span>
        <span className="font-inter text-xs font-semibold">{formatted}</span>
      </div>
    </div>
  );
}

function DeliveredFiles({ names = [], urls = [] }) {
  if (!names.length) return null;
  return (
    <div>
      <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-3 flex items-center gap-2">
        <Download size={11} /> Delivered Files
      </div>
      <div className="space-y-2">
        {names.map((name, i) => (
          <a
            key={i}
            href={urls[i] || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border border-silver px-4 py-2.5 bg-white hover:bg-silver/20 hover:border-navy/30 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <FileText size={13} className="text-steel flex-shrink-0" />
              <span className="font-inter text-sm text-navy group-hover:text-navy truncate max-w-xs">{name}</span>
            </div>
            <div className="flex items-center gap-1 text-steel group-hover:text-navy transition-colors flex-shrink-0 ml-3">
              <Download size={12} />
              <ExternalLink size={11} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order: initialOrder, isAdmin }) {
  const [order, setOrder] = useState(initialOrder);
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.new;
  const date = new Date(order.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const hasDeliveredFiles = order.deliveredFileNames?.length > 0;

  return (
    <div className="border border-silver bg-white hover:border-navy/20 transition-colors">
      {/* Consultation banner — always visible */}
      <ConsultationBanner date={order.consultationDate} />

      <div
        className="flex items-start justify-between gap-4 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 border font-mono text-[9px] tracking-widest uppercase font-bold ${status.color}`}>
              {status.label}
            </span>
            {hasDeliveredFiles && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-green-200 bg-green-50 font-mono text-[9px] tracking-widest uppercase font-bold text-green-700">
                <Download size={9} /> Files Ready
              </span>
            )}
            <span className="font-condensed font-bold text-navy text-sm uppercase tracking-tight">
              {order.projectType}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-steel">
            {(order.city || order.state || order.country) && (
              <span className="flex items-center gap-1.5">
                <MapPin size={11} /> {[order.city, order.state, order.country].filter(Boolean).join(', ')}
              </span>
            )}
            {(order.buildingLength && order.buildingWidth) && (
              <span className="flex items-center gap-1.5">
                <Layers size={11} /> {order.buildingLength}×{order.buildingWidth} ft
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar size={11} /> Submitted {date}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 text-steel mt-0.5">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-silver px-5 pb-6 pt-4 space-y-5">
          {/* Admin controls */}
          {isAdmin && <AdminOrderControls order={order} onUpdate={setOrder} />}

          {/* Client: quote & payment view */}
          {!isAdmin && order.quoteStatus && order.quoteStatus !== 'pending' && (
            <ClientOrderPaymentView order={order} onUpdate={setOrder} />
          )}

          {/* Progress tracker */}
          <DesignProgressTracker designStage={order.designStage} />

          {/* Delivered files */}
          <DeliveredFiles names={order.deliveredFileNames} urls={order.deliveredFileUrls} />

          {/* Order details */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.intendedUse && <Detail label="Intended Use" value={order.intendedUse} />}
            {order.roofStyle && <Detail label="Roof Style" value={order.roofStyle} />}
            {order.numberOfFloors && <Detail label="Floors" value={order.numberOfFloors} />}
            {order.selectedPackage && <Detail label="Package" value={order.selectedPackage} />}
            {order.timeline && <Detail label="Timeline" value={order.timeline} />}
            {order.buildingCode && <Detail label="Building Code" value={order.buildingCode} />}
          </div>

          {order.selectedServices?.length > 0 && (
            <div>
              <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-2">Selected Services</div>
              <div className="flex flex-wrap gap-1.5">
                {order.selectedServices.map(s => (
                  <span key={s} className="bg-silver px-2.5 py-1 font-inter text-xs text-navy">{s}</span>
                ))}
              </div>
            </div>
          )}

          {order.projectDescription && (
            <div>
              <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-2">Project Description</div>
              <p className="font-inter text-sm text-steel leading-relaxed">{order.projectDescription}</p>
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
      <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-0.5">{label}</div>
      <div className="font-inter text-sm text-navy">{value}</div>
    </div>
  );
}

export default function PortalOrders({ currentUser }) {
  const isAdmin = currentUser?.role === 'admin';
  const queryClient = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['portal-orders'],
    queryFn: () => appClient.entities.ProjectOrder.list('-created_date'),
  });

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['portal-orders'] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-7 h-7 border-4 border-silver border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 bg-silver flex items-center justify-center mx-auto mb-4">
          <FolderOpen size={20} className="text-steel" />
        </div>
        <h3 className="font-condensed font-bold text-navy text-xl uppercase tracking-tight mb-2">No Orders Yet</h3>
        <p className="font-inter text-steel text-sm mb-6">You haven't submitted any project orders yet.</p>
        <Link to="/order" className="yellow-btn px-8 py-3 text-sm inline-block">Start My Design Order</Link>
      </div>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'completed');
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight">Project Orders</h2>
            <p className="font-inter text-steel text-sm mt-0.5">
              {activeOrders.length} active · {completedOrders.length} completed
            </p>
          </div>
          <Link to="/order" className="yellow-btn px-5 py-2.5 text-xs">+ New Order</Link>
        </div>
        <div className="space-y-3">
          {orders.map(order => <OrderCard key={order.id} order={order} isAdmin={isAdmin} />)}
        </div>
      </div>
    </PullToRefresh>
  );
}