// components/FAQSection2.tsx
'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Do I pay before delivery or when the item gets to me?',
      answer: 'You do not pay anything upfront. We offer 100% secure Pay On Delivery. You only pay the delivery courier via cash or bank transfer after the package has been handed over to you and you have verified it.',
    },
    {
      question: 'How long will it take to reach my house?',
      answer: 'Deliveries within Lagos and abuja take 24 to 48 hours. Deliveries to Maiduguri, Owerri, Port Harcourt, and other major state capitals take 3 to 5 business days. You will receive a tracking phone call from our dispatch partner before delivery.',
    },
    {
      question: 'What happens if it gets damaged during delivery or doesn’t work?',
      answer: 'Every ScentMason package is protected by our zero-risk replacement policy. If your device arrives damaged or experiences any technical issue within 30 days of delivery, simply contact us and we will ship out a brand new replacement unit completely free of charge.',
    },
    {
      question: 'How long does the fragrance oil last, and can I get refills later?',
      answer: 'A standard bottle of our premium fragrance oil lasts between 4 to 6 weeks with regular daily use. We stock ample refill options, and you can easily order extra oils directly from our customer support team or our website whenever you need a top-up.',
    },

     {
      question: 'What types of frgrance oil do you have?',
      answer: 'All our oils are essential oils. We have Gardenia, Lavender, Shangrila, Hilton and White Peach Oolong'
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-2xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Got questions? We have clear answers right here.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl bg-white transition-all duration-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 hover:bg-gray-50/70 transition-colors gap-4"
              >
                <span className="text-base sm:text-lg font-semibold">{faq.question}</span>
                <span className={`transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                  <svg 
                    className="w-5 h-5 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px] border-t border-gray-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="p-5 text-gray-600 text-base leading-relaxed sm:text-lg bg-gray-50/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}