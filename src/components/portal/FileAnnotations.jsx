import { useState, useEffect } from 'react';
import { appClient } from '@/api/appClient';
import { Paperclip, ExternalLink, MessageSquare, Send, ChevronDown, ChevronUp } from 'lucide-react';

function AnnotationThread({ inquiryId, fileUrl, fileName, currentUser }) {
  const [annotations, setAnnotations] = useState([]);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    if (!open) return;
    appClient.entities.FileAnnotation.filter({ inquiryId, fileUrl }, 'created_date').then(setAnnotations);
  }, [open, inquiryId, fileUrl]);

  const submit = async () => {
    if (!text.trim()) return;
    setSaving(true);
    const created = await appClient.entities.FileAnnotation.create({
      inquiryId,
      fileUrl,
      fileName,
      comment: text.trim(),
      senderRole: isAdmin ? 'admin' : 'client',
      senderName: currentUser?.full_name || (isAdmin ? 'Pole Barndo' : 'Client'),
    });
    setAnnotations(prev => [...prev, created]);
    setText('');
    setSaving(false);
  };

  return (
    <div className="border border-silver bg-white">
      {/* File header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-silver/10">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Paperclip size={11} className="text-steel flex-shrink-0" />
          <span className="font-inter text-xs text-navy truncate">{fileName}</span>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-steel hover:text-navy transition-colors">
            <ExternalLink size={10} />
          </a>
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 ml-3 font-mono text-[8px] tracking-widest uppercase text-steel hover:text-navy transition-colors flex-shrink-0"
        >
          <MessageSquare size={10} />
          Comments
          {open ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
      </div>

      {open && (
        <div className="p-3 space-y-2">
          {annotations.length === 0 && (
            <p className="font-inter text-xs text-steel/60 text-center py-2">No comments on this file yet.</p>
          )}
          {annotations.map(a => (
            <div key={a.id} className={`flex ${a.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-3 py-2 ${
                a.senderRole === 'admin' ? 'bg-navy text-white' : 'bg-silver/40 text-navy border border-silver'
              }`}>
                <div className={`font-mono text-[7px] tracking-widest uppercase mb-1 ${a.senderRole === 'admin' ? 'text-yellow/70' : 'text-steel'}`}>
                  {a.senderRole === 'admin' ? 'Pole Barndo' : a.senderName}
                </div>
                <p className="font-inter text-xs leading-relaxed whitespace-pre-wrap">{a.comment}</p>
                <div className="font-mono text-[7px] mt-1 opacity-50 text-right">
                  {new Date(a.created_date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
              placeholder="Add a comment on this file…"
              className="flex-1 border border-silver px-3 py-2 font-inter text-xs text-navy focus:outline-none focus:border-navy transition-colors"
            />
            <button
              onClick={submit}
              disabled={!text.trim() || saving}
              className="yellow-btn px-3 py-2 text-xs flex-shrink-0 disabled:opacity-40"
            >
              <Send size={11} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FileAnnotations({ inquiry, currentUser }) {
  const files = inquiry.file_urls || [];
  const names = (inquiry.file_name || '').split(', ').filter(Boolean);

  if (!files.length) return null;

  return (
    <div>
      <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-2 flex items-center gap-1.5">
        <Paperclip size={10} /> Uploaded Files & Comments
      </div>
      <div className="space-y-2">
        {files.map((url, i) => (
          <AnnotationThread
            key={url}
            inquiryId={inquiry.id}
            fileUrl={url}
            fileName={names[i] || `File ${i + 1}`}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}