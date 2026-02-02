import { Shield, Award, Users, TrendingUp } from 'lucide-react';

export function TrustBar() {
  return (
    <div className="border-y border-border bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3">
              <Shield size={20} className="sm:w-6 sm:h-6 text-[#0A7A7A]" />
            </div>
            <p className="text-xl sm:text-2xl font-light mb-1">100%</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Authenticated Artworks</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3">
              <Users size={20} className="sm:w-6 sm:h-6 text-[#0A7A7A]" />
            </div>
            <p className="text-xl sm:text-2xl font-light mb-1">5+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Verified Galleries</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3">
              <Award size={20} className="sm:w-6 sm:h-6 text-[#0A7A7A]" />
            </div>
            <p className="text-xl sm:text-2xl font-light mb-1">500+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Curated Pieces</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3">
              <TrendingUp size={20} className="sm:w-6 sm:h-6 text-[#0A7A7A]" />
            </div>
            <p className="text-xl sm:text-2xl font-light mb-1">24hrs</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Gallery Response Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}


