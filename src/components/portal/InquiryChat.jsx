import { useState, useEffect, useRef } from 'react';
import { appClient } from '@/api/appClient';
import { Send } from 'lucide-react';

export default function InquiryChat({ inquiry, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const load = () =>
      appClient.entities.InquiryMessage.filter({ inquiryId: inquiry.id }, 'created_date').then(setMessages);
    load();
    const unsub = appClient.entities.InquiryMessage.subscribe(e => {
      if (e.data?.inquiryId === inquiry.id) load();
    });
    return unsub;
  }, [inquiry.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!text.trim()) return;
    const optimistic = {
      id: `temp-${Date.now()}`,
      inquiryId: inquiry.id,
      senderRole: isAdmin ? 'admin' : 'client',
      senderName: currentUser?.full_name || 'Client',
      text: text.trim(),
      created_date: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);
    setText('');
    setSending(true);
    await appClient.entities.InquiryMessage.create({
      inquiryId: optimistic.inquiryId,
      senderRole: optimistic.senderRole,
      senderName: optimistic.senderName,
      text: optimistic.text,
    });
    setSending(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="flex flex-col border border-silver bg-white">
      <div className="px-4 py-3 border-b border-silver bg-silver/20">
        <div className="font-mono text-[9px] text-steel tracking-widest uppercase">Project Chat</div>
        <div className="font-condensed font-bold text-navy text-sm uppercase tracking-tight">
          {inquiry.buildingType || 'General Inquiry'} — {inquiry.name}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[360px]">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="font-inter text-steel text-xs">No messages yet. Start the conversation below.</p>
          </div>
        )}
        {messages.map(msg => {
          const isMine = isAdmin ? msg.senderRole === 'admin' : msg.senderRole === 'client';
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-3.5 py-2.5 ${
                isMine
                  ? 'bg-navy text-white'
                  : 'bg-silver/40 text-navy border border-silver'
              }`}>
                {!isMine && (
                  <div className="font-mono text-[8px] tracking-widest uppercase mb-1 opacity-60">
                    {msg.senderRole === 'admin' ? 'Pole Barndo' : msg.senderName}
                  </div>
                )}
                <p className="font-inter text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div className={`font-mono text-[8px] mt-1.5 opacity-50 ${isMine ? 'text-right' : ''}`}>
                  {new Date(msg.created_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-silver p-3 flex gap-2">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          rows={2}
          placeholder="Type a message… (Enter to send)"
          className="flex-1 border border-silver px-3 py-2 font-inter text-sm text-navy resize-none focus:outline-none focus:border-navy transition-colors"
        />
        <button
          onClick={send}
          disabled={!text.trim() || sending}
          className="yellow-btn px-4 py-2 text-xs flex-shrink-0 self-end disabled:opacity-40"
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}