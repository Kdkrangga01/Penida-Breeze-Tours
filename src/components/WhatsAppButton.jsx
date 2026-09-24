import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/site';

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      className="floating-wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle size={24} strokeWidth={1.5} />
      <span className="floating-wa-label">WhatsApp</span>
    </a>
  );
}
