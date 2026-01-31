import { useRef, useState } from "react";
import { Head, Link } from '@inertiajs/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "@/components/Header";
import { ArtworkCard } from "@/components/ArtworkCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home({ featuredArtworks }) {
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
    <div className="min-h-screen bg-background">
      <Head title="Aninag - Discover Curated Contemporary Art" />
      <Header currentPath="/" />

      {/* Hero Section with Carousel */}
      <section className="relative h-[80vh] bg-muted">
        <Slider ref={sliderRef} {...settings} className="h-full">
          {featuredArtworks.slice(0, 4).map((artwork) => (
            <div key={artwork.id} className="relative h-[80vh]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${artwork.primary_image_url || artwork.image_url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
              </div>
              <div className="relative h-full container mx-auto px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl space-y-6 text-white">
                  <h1 className="text-5xl lg:text-6xl font-medium tracking-tight">
                    Discover Curated Contemporary Art
                  </h1>
                  <p className="text-xl text-white/90">
                    {artwork.title} by {artwork.artist_name}
                  </p>
                  <Link
                    href="/catalog"
                    className="inline-block px-8 py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Navigation Arrows */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
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

      {/* Featured Artworks */}
      <section className="py-20 container mx-auto px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl tracking-tight">Featured Artworks</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our carefully selected collection of contemporary art from
            emerging and established artists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl tracking-tight">Your Art Advisor</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Aninag bridges collectors with exceptional contemporary art.
              We work closely with established galleries to bring you a
              curated selection of museum-quality pieces. Our art advisors
              are here to guide you through the acquisition process.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2026 Aninag. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
