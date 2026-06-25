import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

/**
 * Accordion — premium animated Q&A accordion
 * items: Array<{ q: string, a: string }>
 */
export default function Accordion({ items = [], className = '' }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={`accordion-container ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="accordion-item">
          <button
            type="button"
            className="accordion-button"
            onClick={() => toggle(i)}
          >
            <span className={`accordion-question ${openIndex === i ? 'accordion-question-active' : 'accordion-question-inactive'}`}>
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`accordion-icon ${openIndex === i ? 'accordion-icon-active' : 'accordion-icon-inactive'}`}
            >
              <ChevronDown size={18} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{    height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="accordion-content"
              >
                <div className="accordion-answer-container">
                  <p className="accordion-answer">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
