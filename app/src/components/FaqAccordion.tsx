import { useState, type ReactNode } from 'react';
import './FaqAccordion.css';

export interface FaqItem {
  q: string;
  a: ReactNode;
}

function FaqAccordionItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-item__arrow" aria-hidden>{open ? '−' : '+'}</span>
      </button>
      <div className="faq-item__a-wrap" style={{ maxHeight: open ? 400 : 0 }}>
        <p className="faq-item__a">{a}</p>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map(item => (
        <FaqAccordionItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}
