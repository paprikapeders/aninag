import { useRef, useState } from "react";
import { Head, Link } from '@inertiajs/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ArtworkCard } from "@/components/ArtworkCard";
import { TrustBar } from "@/components/TrustBar";
import { ARShowcase } from "@/components/ARShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { GalleryPartners } from "@/components/GalleryPartners";
import { FAQ } from "@/components/FAQ";
import { SEO } from "@/components/SEO";
import { ChevronLeft, ChevronRight, Sparkles, Camera, CheckCircle2 } from "lucide-react";

export default function Home({ featuredArtworks, meta }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <SEO meta={meta} />
      <Head title="Aninag - Filipino Art Marketplace with AR Preview" />
      
      <Header currentPath="/" />

      {/* Enhanced Hero Section with Value Proposition */}
      <section id="home" className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-muted">
        <Slider ref={sliderRef} {...settings} className="h-full">
          {featuredArtworks.slice(0, 4).map((artwork) => (
            <div key={artwork.id} className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${artwork.primary_image_url || artwork.image_url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
              </div>
              <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
                <div className="max-w-4xl space-y-4 sm:space-y-6 text-white">
                  {/* USP Badge */}
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm mb-3 sm:mb-6 animate-fade-in">
                    <Camera size={14} className="sm:w-4 sm:h-4" />
                    <span>See art in your space with AR • Direct gallery connection</span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-tight">
                    Where Light Meets Artistry
                  </h1>
                  
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
                    Discover Philippine art—curated, contextualized, and viewed in your space.
                  </p>

                  {/* Social Proof */}
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-10 text-white/80 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 size={14} className="sm:w-[18px] sm:h-[18px] text-[#0A7A7A]" />
                      <span>500+ Curated Artworks</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 size={14} className="sm:w-[18px] sm:h-[18px] text-[#0A7A7A]" />
                      <span>Verified Galleries</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 size={14} className="sm:w-[18px] sm:h-[18px] text-[#0A7A7A]" />
                      <span>AR Room Preview</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center">
                    <Link
                      href="/catalog"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all hover:shadow-lg hover:scale-105 text-sm sm:text-base lg:text-lg font-medium"
                    >
                      <span>View AR-Enabled Collection</span>
                    </Link>
                    <Link
                      href={`/artwork/${artwork.slug || artwork.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base lg:text-lg font-medium"
                    >
                      <Camera size={18} className="sm:w-5 sm:h-5" />
                      <span>See This Artwork</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Navigation Arrows */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {featuredArtworks.slice(0, 4).map((_, index) => (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      {/* <div id="trust">
        <TrustBar />
      </div> */}

      {/* AR Feature Showcase - Your #1 Differentiator */}
      <div id="ar-preview">
        <ARShowcase />
      </div>

      {/* How It Works */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Featured Artworks */}
      <section id="collection" className="py-12 sm:py-16 lg:py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Featured Artworks</h2>
            <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mx-auto mt-3 sm:mt-4 rounded-full" />
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our carefully selected collection of contemporary art from
            emerging and established artists
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {featuredArtworks.slice(0, 3).map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/catalog"
            className="inline-block px-8 py-3 border-2 border-[#0A7A7A] text-[#0A7A7A] rounded-lg hover:bg-[#0A7A7A] hover:text-white transition-colors"
          >
            View All Artworks
          </Link>
        </div>
      </section>

      {/* Gallery Partners */}
      <div id="galleries">
        <GalleryPartners />
      </div>

      {/* Testimonials */}
      {/* <div id="testimonials">
        <Testimonials />
      </div> */}

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FBF9F7 0%, #F5F3F0 100%)' }}>
        {/* Decorative elements for depth */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#0A7A7A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#D87456]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">Your Art Advisor</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Aninag bridges collectors with exceptional contemporary art.
              We work closely with established galleries to bring you a
              curated selection of museum-quality pieces. Our art advisors
              are here to guide you through the acquisition process.
            </p>
            <Link
              href="/about"
              className="inline-block px-6 sm:px-8 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] hover:shadow-xl transition-all mt-4 sm:mt-6 hover:-translate-y-1 text-sm sm:text-base"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq">
        <FAQ />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}


