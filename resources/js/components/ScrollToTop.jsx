import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 lg:bottom-6 left-6 p-3 bg-background border-2 border-border rounded-full shadow-lg hover:shadow-xl hover:border-[#0A7A7A] hover:bg-[#0A7A7A] hover:text-white transition-all z-40 mb-16 lg:mb-0"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}


