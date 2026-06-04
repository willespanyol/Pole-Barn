import { CheckCircle2, Clock, Circle } from 'lucide-react';

const STAGES = [
  { id: 'request_received',     label: 'Request Received',      desc: 'Your project request has been submitted and logged.' },
  { id: 'in_review',            label: 'In Review',             desc: 'Our team is reviewing your project scope and requirements.' },
  { id: 'drafting',             label: 'Drafting',              desc: 'Architectural floor plans and layout drawings are being prepared.' },
  { id: 'structural_calculation', label: 'Structural Calculation', desc: 'Structural loads, member sizing, and foundation design are being calculated.' },
  { id: 'client_revision',      label: 'Client Revision',       desc: 'Revisions based on your feedback are being incorporated.' },
  { id: 'final_delivery',       label: 'Final Delivery',        desc: 'Your complete permit-ready drawing package has been delivered.' },
];

export default function DesignProgressTracker({ designStage }) {
  const currentIndex = STAGES.findIndex(s => s.id === (designStage || 'request_received'));

  return (
    <div>
      <div className="font-mono text-[9px] text-yellow tracking-widest uppercase mb-4">Design Progress</div>
      {/* Horizontal progress bar */}
      <div className="flex items-center mb-6">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0
                ${i < currentIndex ? 'bg-navy' : i === currentIndex ? 'bg-yellow' : 'bg-white border-2 border-silver'}`}>
                {i < currentIndex
                  ? <CheckCircle2 size={13} className="text-white" />
                  : i === currentIndex
                  ? <Clock size={13} className="text-navy" />
                  : <Circle size={11} className="text-silver" />
                }
              </div>
              <span className={`mt-1.5 font-mono text-[8px] tracking-wide text-center leading-tight max-w-[64px] hidden sm:block
                ${i === currentIndex ? 'text-navy font-bold' : i < currentIndex ? 'text-steel' : 'text-silver'}`}>
                {stage.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`flex-1 h-px mx-1 ${i < currentIndex ? 'bg-navy' : 'bg-silver'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Current stage callout */}
      {currentIndex >= 0 && (
        <div className={`flex items-start gap-3 p-3 border ${
          STAGES[currentIndex].id === 'final_delivery'
            ? 'bg-green-50 border-green-200'
            : 'bg-yellow/10 border-yellow/30'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
            STAGES[currentIndex].id === 'final_delivery' ? 'bg-green-500' : 'bg-yellow'
          }`} />
          <div>
            <div className="font-condensed font-bold text-navy text-sm uppercase tracking-tight">
              {STAGES[currentIndex].label}
            </div>
            <p className="font-inter text-xs text-steel mt-0.5 leading-relaxed">
              {STAGES[currentIndex].desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}