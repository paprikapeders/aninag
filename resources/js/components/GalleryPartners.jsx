import { CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export function GalleryPartners() {
  const galleries = [
    {
      name: "Modern Arts Gallery",
      location: "Makati, Metro Manila",
      established: "2015",
      artworks: "150+",
      verified: true
    },
    {
      name: "Contemporary Art Space",
      location: "BGC, Taguig",
      established: "2018",
      artworks: "200+",
      verified: true
    },
    {
      name: "Filipino Heritage Gallery",
      location: "Intramuros, Manila",
      established: "2012",
      artworks: "180+",
      verified: true
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4">
            Our Gallery Partners
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with verified galleries across the Philippines to bring you authenticated, curated artwork
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {galleries.map((gallery, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-surface to-white rounded-2xl p-6 sm:p-8 border border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Logo Placeholder */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0A7A7A]/10 to-[#0A7A7A]/5 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl font-light text-[#0A7A7A]">
                  {gallery.name.charAt(0)}
                </div>
              </div>

              {/* Gallery Info */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-[#0A7A7A] transition-colors">
                    {gallery.name}
                  </h3>
                  {gallery.verified && (
                    <CheckCircle2 size={18} className="sm:w-5 sm:h-5 text-[#0A7A7A] flex-shrink-0" />
                  )}
                </div>

                <p className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                  {gallery.location}
                </p>

                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground pt-2">
                  <span>Est. {gallery.established}</span>
                  <span>•</span>
                  <span>{gallery.artworks} artworks</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* For Galleries CTA */}
        <div className="text-center bg-gradient-to-br from-[#0A7A7A]/5 to-[#086060]/5 rounded-2xl p-8 sm:p-12 border border-[#0A7A7A]/20">
          <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4">Are you a gallery owner?</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
            Join Aninag and reach more art collectors with our AR technology and curated platform
          </p>
          <button
            data-contact-button
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all shadow-lg font-medium text-sm sm:text-base"
          >
            Partner With Us
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}


