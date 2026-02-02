import { Link } from '@inertiajs/react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-12 sm:mt-16 lg:mt-20 pb-20 lg:pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl tracking-tight">Aninag</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Connecting Filipino art with collectors worldwide. Curating meaningful encounters between artists, galleries, and art lovers.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://instagram.com/aninagcollective" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border hover:border-[#0A7A7A] hover:bg-[#0A7A7A]/5 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com/aninagcollective"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border hover:border-[#0A7A7A] hover:bg-[#0A7A7A]/5 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Explore</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/catalog" className="text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors">
                  View Collection
                </Link>
              </li>
              <li>
                <Link href="/catalog?featured=true" className="text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors">
                  Featured Works
                </Link>
              </li>
              <li>
                <Link href="/catalog?recent=true" className="text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">About</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#galleries" className="text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors">
                  For Galleries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Get in Touch</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="mailto:hello@aninag.ph" 
                  className="text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  hello@aninag.ph
                </a>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>Metro Manila, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Aninag Collective. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-[#0A7A7A] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#0A7A7A] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


