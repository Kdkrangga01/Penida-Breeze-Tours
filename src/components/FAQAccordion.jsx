import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQItem({ item, isOpen, onToggle, index = 0 }) {
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span>{item.question}</span>
        <ChevronDown size={18} strokeWidth={2} className="faq-chevron" aria-hidden="true" />
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className={`faq-answer-collapse ${isOpen ? 'is-open' : ''}`}
        role="region"
        aria-labelledby={`faq-q-${item.id}`}
      >
        <div className="faq-answer-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items, limit }) {
  const [openId, setOpenId] = useState(null);
  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="faq-accordion">
      {displayItems.map((item, idx) => (
        <FAQItem
          key={item.id}
          item={item}
          index={idx}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
