import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { X, Cookie } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    
    // Enable analytics/tracking if you have any
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    
    // Disable analytics/tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white border border-border rounded-xl shadow-2xl p-4 sm:p-6 relative">
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center pr-8">
            {/* Icon */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="w-12 h-12 rounded-full bg-[#0A7A7A]/10 flex items-center justify-center">
                <Cookie size={24} className="text-[#0A7A7A]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <h3 className="font-medium text-base sm:text-lg">We value your privacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept", you consent to our use of cookies. You can manage your preferences anytime.{' '}
                <Link href="/privacy" className="text-[#0A7A7A] hover:underline font-medium">
                  Learn more
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto sm:flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors order-2 sm:order-1"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-colors shadow-sm order-1 sm:order-2"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
