import { Head } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <Head title="About - Aninag Collective" />
      <Header currentPath="/about" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Main Title */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl tracking-tight font-light">
                About Aninag Collective
              </h1>
              <div className="h-1 w-20 sm:w-32 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mt-3 sm:mt-4 rounded-full" />
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Aninag Collective is a digital art platform created to connect art enthusiasts with galleries across the Philippines.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8 sm:space-y-12">
            {/* Introduction */}
            <section className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                Rooted in the richness of Filipino creativity, <em className="text-[#0A7A7A] font-medium">aninag</em>—meaning reflection or glimpse—represents our purpose: to offer meaningful encounters with art and the stories behind it. We aim to make Filipino artworks more visible, approachable, and thoughtfully presented, while honoring the role of galleries in shaping and protecting artistic practice.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                Currently, Aninag Collective functions as a curated online catalog, featuring selected works from our partner gallery. Visitors may explore artworks, express interest, and send inquiries through the platform. Each inquiry is handled personally—allowing us to facilitate direct, intentional conversations between collectors and galleries, rather than automated transactions.
              </p>
              
              <p className="text-lg leading-relaxed text-foreground/90">
                To further bridge the physical and digital experience, we've introduced an Augmented Reality (AR) viewing feature, enabling viewers to see how an artwork might live within their own space. This helps collectors better appreciate scale, context, and presence—bringing the gallery experience closer to home.
              </p>
              
              <p className="text-lg leading-relaxed text-foreground/90">
                Aninag Collective is in its early stage, with our first gallery partnership marking the beginning of a growing network dedicated to Filipino art.
              </p>
            </section>

            {/* Vision Section */}
            <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-border">
              <h2 className="text-2xl sm:text-3xl tracking-tight">Our Vision</h2>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                We envision Aninag Collective as a trusted bridge between Filipino artists, galleries, and collectors—both locally and internationally.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                Our long-term goal is to build a platform that:
              </p>
              
              <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-foreground/90 pl-4 sm:pl-6">
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full">
                  Elevates Filipino art through careful curation and storytelling
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full">
                  Supports galleries as cultural stewards, not just marketplaces
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full">
                  Encourages deeper, more personal connections between people and art
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full">
                  Uses technology thoughtfully to enhance, not replace, the human experience
                </li>
              </ul>
              
              <p className="text-lg leading-relaxed text-foreground/90">
                As we grow, we hope to expand our partnerships, introduce new ways of engaging with art, and create opportunities that allow Filipino creativity to be seen, valued, and collected with intention.
              </p>
            </section>
          </div>

          {/* Call to Action */}
          <div className="pt-12 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-8 space-y-4">
              <h3 className="text-2xl tracking-tight">Interested in partnering with us?</h3>
              <p className="text-muted-foreground">
                We're always looking to connect with galleries and artists who share our vision of making Filipino art more accessible.
              </p>
              <button
                onClick={() => document.querySelector('[data-contact-button]')?.click()}
                className="px-6 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
