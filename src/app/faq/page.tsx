'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-iron-black/15 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 font-serif font-bold text-base text-iron-black hover:text-wrought-copper transition-colors focus:outline-none"
      >
        <span>{question}</span>
        <span className="text-iron-black/50 ml-4">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-charcoal/80 text-xs sm:text-sm leading-relaxed pt-2 pb-4 pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const faqs = [
    {
      question: "Is the Wrought panini press dishwasher safe?",
      answer: "The swappable cast iron cooking plates (The Grille, The Lattice, The Anvil) are seasoning-care and hand-wash only. They should NEVER be washed in the dishwasher because harsh dishwasher detergents, high heat, and standing moisture will strip the protective polymerized oil seasoning layer from the iron, causing the plates to rust and lose their natural non-stick properties. Instead, scrub them under hot water with a stiff brush (no soap needed) and dry them immediately. The slide-out copper drip tray and nylon/silicone combo scraper tool are fully dishwasher-safe."
    },
    {
      question: "What is covered under the Lifetime Casting Warranty?",
      answer: "Our lifetime warranty covers structural failure of the heavy cast-iron outer cover and base shell. If they crack, warp, or split during normal home kitchen operation, we will melt the metal back down and re-cast your components for free. Modulator parts (like the electrical heating elements or hinge pivots) are warrantied for 5 years and sold at-cost for repairs thereafter."
    },
    {
      question: "Can I swap the plates while the press is hot?",
      answer: "We recommend letting the press cool completely before releasing the plates. However, if you need to swap, always wear high-temperature kitchen mitts. Lift the brass release latches on the sides of the housing, and slide the plates out using our insulated cast scraper tool handles."
    },
    {
      question: "Where do I find replacement heating cores and repair guides?",
      answer: "We publish all teardown guides, circuit diagrams, and assembly guides directly on our Repair & Sustainability page. Replacement heating element cartridges, handle bolts, and hinge replacement pins are sold directly on our parts catalog page at-cost, with free standard shipping."
    },
    {
      question: "What voltage does Wrought support?",
      answer: "Currently, Wrought is designed for US/Canada standard 110-120V outlets (1800W combined draw). Using it on 220V grids (Europe, UK, Australia) requires an active high-wattage step-down voltage converter. We are forging a international 220-240V version scheduled for release next year."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 4-7 business days depending on your US shipping zone. Each press is individually tested on our foundry calibration rigs before leaving Portland, which adds a 24-48 hour calibration window to our queue before the carrier picks it up."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-4 sm:px-6 bg-wrought-cream text-charcoal">
      
      {/* Header */}
      <div className="text-center mb-16 border-b border-iron-black/15 pb-8">
        <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Support & Teardown Help</span>
        <h1 className="font-serif text-4xl font-bold text-iron-black mt-2">Frequently Asked Questions</h1>
        <p className="text-charcoal/70 text-xs sm:text-sm mt-3">
          Got questions about our casting iron maintenance, shipping procedures, or the modular repair process? We have answers.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="flex flex-col border-t border-iron-black/15">
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      {/* Need more help? */}
      <div className="mt-16 bg-[#eae1d4]/40 border-2 border-iron-black rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex gap-4 items-start">
          <HelpCircle className="text-wrought-copper w-8 h-8 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif font-bold text-iron-black text-sm">Cannot find what you need?</h3>
            <p className="text-xs text-charcoal/70 mt-1">
              Reach out to our Portland assembly team for technical teardown advice or custom ordering requests.
            </p>
          </div>
        </div>
        <a
          href="mailto:support@wroughtpress.com"
          className="py-2.5 px-6 border border-iron-black bg-iron-black text-wrought-cream hover:bg-wrought-copper hover:border-wrought-copper hover:text-wrought-cream font-mono text-[10px] uppercase tracking-wider font-bold rounded transition-colors whitespace-nowrap"
        >
          Contact Technical Support
        </a>
      </div>

    </div>
  );
}
