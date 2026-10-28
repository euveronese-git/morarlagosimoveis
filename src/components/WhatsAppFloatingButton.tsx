import React, { useEffect, useRef, useState } from 'react';
import { CONSULTANTS, getWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2"
    >
      {open && (
        <div className="w-[min(16.5rem,calc(100vw-2rem))] rounded-2xl bg-white shadow-card border border-border p-2">
          {CONSULTANTS.map((consultant) => (
            <a
              key={consultant.id}
              href={getWhatsAppUrl(undefined, consultant.number)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-primary hover:bg-bg-alt min-h-11"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="w-4 h-4 text-whatsapp fill-current shrink-0" />
              <span>{consultant.menuLabel}</span>
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-14 h-14 min-w-14 min-h-14 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105 animate-whatsapp-pulse"
        aria-label="Escolher consultor no WhatsApp"
        aria-expanded={open}
        title="Falar no WhatsApp"
      >
        {open ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7 fill-current" />}
      </button>
    </div>
  );
};
