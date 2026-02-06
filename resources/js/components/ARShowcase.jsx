import { Camera, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

export function ARShowcase() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#0A7A7A] to-[#086060] text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm">
              <Sparkles size={14} className="sm:w-4 sm:h-4" />
              <span>AR Preview</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
              See Art in <span className="italic">Your Space</span><br />
              Before You Buy
            </h2>
            
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              Visualize any artwork on your actual walls using your phone camera. Make confident decisions about size, color, and placement before you buy.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">Works on Any Smartphone</p>
                  <p className="text-xs sm:text-sm text-white/80">No app download required</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">True-to-Scale Visualization</p>
                  <p className="text-xs sm:text-sm text-white/80">See exact dimensions in your room</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">Save & Share</p>
                  <p className="text-xs sm:text-sm text-white/80">Share with family before purchasing</p>
                </div>
              </li>
            </ul>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0A7A7A] rounded-lg hover:bg-white/90 transition-all shadow-xl font-medium text-sm sm:text-base lg:text-lg group"
            >
              <span>Try AR Now</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Visual Demo */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
              <div className="aspect-[9/19] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                  {/* Placeholder for AR demo */}
                  <div className="w-full h-full bg-gradient-to-br from-[#0A7A7A]/20 to-[#086060]/20 flex items-center justify-center">
                    <Camera size={48} className="text-white/30" />
                  </div>
                  {/* AR UI overlay */}
                  <div className="absolute top-6 sm:top-8 left-4 sm:left-8 right-4 sm:right-8">
                    <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white text-xs sm:text-sm">
                      <p className="font-medium">Living Room View</p>
                      <p className="text-xs text-white/70">Move phone to place artwork</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl">
                <p className="text-xs sm:text-sm font-medium">✨ AR-Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


