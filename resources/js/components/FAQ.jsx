import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AR preview feature work?",
      answer: "Simply tap 'View in Your Space' on any artwork, point your phone camera at your wall, and our AR technology will overlay the artwork in true-to-scale dimensions. No app download needed—it works right in your mobile browser."
    },
    {
      question: "Are all artworks authenticated?",
      answer: "Yes, 100%. Every artwork comes with a Certificate of Authenticity from the gallery. We only partner with verified galleries who guarantee the authenticity of their pieces."
    },
    {
      question: "What happens after I express interest?",
      answer: "A gallery representative will contact you within 24 hours to discuss details, answer questions, and arrange payment and delivery. We facilitate the connection but let galleries handle transactions directly."
    },
    {
      question: "Can I negotiate prices?",
      answer: "Pricing is set by galleries, but they may offer payment plans or negotiate on case-by-case basis. Contact them directly through our platform to discuss options."
    },
    {
      question: "Do you ship nationwide?",
      answer: "Yes! Our partner galleries coordinate professional art shipping across the Philippines. International shipping is available for select pieces—inquire with the gallery for details."
    },
    {
      question: "What's your commission structure?",
      answer: "For buyers: absolutely free. Galleries pay a small listing fee to be on our platform, but buyers pay no additional fees beyond what the gallery charges."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Everything you need to know about buying art on Aninag
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-surface/50 transition-colors"
              >
                <span className="font-medium pr-6 sm:pr-8 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown 
                  size={18} 
                  className={`sm:w-5 sm:h-5 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 sm:pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
