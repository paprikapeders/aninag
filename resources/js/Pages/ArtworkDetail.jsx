import { useState } from "react";
import { Head, Link, router } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WishlistButton } from "@/components/WishlistButton";
import { ShareButtons } from "@/components/ShareButtons";
import { ImageZoom } from "@/components/ImageZoom";
import { ARViewer } from "@/components/ARViewer";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Eye, TrendingUp, Award, Home, Camera, Shield, Heart, CheckCircle2, MessageCircle } from "lucide-react";
import { trackArtworkReservation, trackARViewerOpen, trackArtworkClick } from "@/utils/analytics";

export default function ArtworkDetail({ artwork, similarArtworks = [] }) {
  const [inquiryType, setInquiryType] = useState(null);
  const [showAR, setShowAR] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Track AR viewer open
  const handleAROpen = () => {
    setShowAR(true);
    trackARViewerOpen(artwork);
  };

  // Track reserve button click
  const handleReserveClick = () => {
    setInquiryType("reservation");
    trackArtworkReservation(artwork);
  };

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background">
        <Head title="Artwork Not Found - Aninag" />
        <Header />
        <div className="container mx-auto px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl mb-4">Artwork Not Found</h1>
          <Link href="/catalog" className="text-[#0A7A7A] hover:underline">
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleOpenDialog = (type) => {
    setInquiryType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to confirmation page with inquiry data
    router.visit('/confirmation', {
      method: 'post',
      data: {
        type: inquiryType,
        artwork_id: artwork.id,
        artwork_slug: artwork.slug,
        artwork_title: artwork.title,
        artwork_code: artwork.artwork_code,
        artist_name: artwork.artist_name,
        price: artwork.price,
        currency: artwork.currency,
        medium: artwork.medium,
        ...formData,
      },
    });
  };

  const getDialogTitle = () => {
    switch (inquiryType) {
      case "reserve":
        return "Reserve This Artwork";
      case "viewing":
        return "Book a Private Viewing";
      case "corporate":
        return "Corporate Inquiry";
      default:
        return "Inquiry";
    }
  };

  const getDialogDescription = () => {
    switch (inquiryType) {
      case "reserve":
        return "Express your interest to reserve this artwork. Our team will contact you to discuss next steps.";
      case "viewing":
        return "Schedule a private viewing at the gallery. We'll coordinate a time that works for you.";
      case "corporate":
        return "Interested in this piece for your corporate collection? Let us know your requirements.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <Head title={`${artwork.title} - Aninag`} />
      <Header currentPath="/artwork" />

      {/* AR Viewer Component */}
      <ARViewer 
        artwork={artwork} 
        isOpen={showAR} 
        onClose={() => setShowAR(false)} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 lg:mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#0A7A7A] transition-colors flex items-center gap-1">
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/catalog" className="hover:text-[#0A7A7A] transition-colors">
            Collection
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{artwork.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image Gallery with Zoom */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative">
              <ImageZoom 
                src={artwork.primary_image_url || artwork.image_url}
                alt={artwork.title}
              />
              {/* Wishlist button overlay */}
              <div className="absolute top-4 right-4 z-10">
                <WishlistButton artworkId={artwork.id} />
              </div>
            </div>
            
            {/* AR View Button */}
            <button
              onClick={() => handleAROpen()}
              className="w-full py-3 sm:py-3.5 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Camera size={18} className="sm:w-5 sm:h-5" />
              View in Your Space (AR)
            </button>
            <p className="text-xs text-center text-muted-foreground px-2">
              See how this artwork looks on your wall using your camera
            </p>
          </div>

          {/* Artwork Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Social Proof Badges */}
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A7A7A]/10 text-[#0A7A7A] rounded-full text-xs font-medium">
                <TrendingUp size={14} />
                Popular
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs">
                <Eye size={14} />
                Recently Viewed
              </span>
              {artwork.price >= 100000 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-xs font-medium">
                  <Award size={14} />
                  Premium Collection
                </span>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground border-l-2 border-[#0A7A7A] pl-3 sm:pl-4 py-2 sm:py-3 bg-gradient-to-r from-[#0A7A7A]/10 to-transparent rounded-r-lg">
              <span className="flex items-center gap-1.5">
                <Shield size={16} className="text-[#0A7A7A]" />
                Authenticity Guaranteed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#0A7A7A]" />
                Verified Gallery
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-2">{artwork.title}</h1>
                  <Link 
                    href={`/catalog?artist=${encodeURIComponent(artwork.artist_name)}`}
                    className="text-base sm:text-lg lg:text-xl text-muted-foreground hover:text-[#0A7A7A] transition-colors">
                    {artwork.artist_name}
                  </Link>
                </div>
              </div>
            </div>

            {/* Prominent Specifications */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-md border border-border">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Medium</p>
                  <p className="font-medium text-sm sm:text-base lg:text-lg">{artwork.medium}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Year</p>
                  <p className="font-medium text-sm sm:text-base lg:text-lg">{artwork.year}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Dimensions</p>
                  <p className="font-medium text-sm sm:text-base lg:text-lg">{artwork.size}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Gallery</p>
                  <p className="font-medium text-sm sm:text-base lg:text-lg">{artwork.gallery_name || 'Modern Arts Gallery'}</p>
                </div>
              </div>
            </div>

            {/* Artist Bio */}
            {artwork.artist_bio && (
              <div className="border-t border-border pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">About the Artist</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {artwork.artist_bio}
                </p>
              </div>
            )}

            <div className="border-t border-border pt-4 sm:pt-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {artwork.description || `A stunning contemporary piece by ${artwork.artist_name}.`}
              </p>
            </div>

            {/* Enhanced Price Display */}
            {artwork.formatted_price && (
              <div className="border-t border-border pt-4 sm:pt-6">
                <div className="bg-gradient-to-br from-white to-[#FBF9F7] rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-lg border border-border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Investment Price</p>
                      <p className="text-2xl sm:text-3xl font-light tracking-tight">{artwork.formatted_price}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm font-medium text-[#0A7A7A]">✓ Available</p>
                      <p className="text-xs text-muted-foreground">Only 1 piece</p>
                    </div>
                  </div>
                  
                  {/* What's Included */}
                  <div className="border-t border-border pt-3 sm:pt-4 space-y-2">
                    <p className="text-xs sm:text-sm font-medium">What's Included:</p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#0A7A7A]" />
                        Certificate of Authenticity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#0A7A7A]" />
                        Professional packaging & shipping coordination
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#0A7A7A]" />
                        Direct gallery support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#0A7A7A]" />
                        Flexible payment options available
                      </li>
                    </ul>
                  </div>
                  
                  {/* Immediate CTA after price */}
                  {artwork.status && (artwork.status.toLowerCase() === "available" || artwork.status.toLowerCase() === "reserved") && (
                    <div className="border-t border-border pt-4 mt-4">
                      <button
                        onClick={() => { handleOpenDialog("reserve"); handleReserveClick(); }}
                        className="group relative w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all duration-200 overflow-hidden text-sm sm:text-base font-medium"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <Heart size={18} className="sm:w-5 sm:h-5" />
                          <span>Reserve This Artwork</span>
                          <ChevronRight size={18} className="sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#086060] to-[#0A7A7A] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        No payment required • Gallery will contact you within 24 hours
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t border-border pt-4 sm:pt-6">
              <ShareButtons artwork={artwork} />
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Dialog */}
      <Dialog open={inquiryType !== null} onOpenChange={() => setInquiryType(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {getDialogDescription()}
            </p>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+63 9XX-XXX-XXXX"
                pattern="^(\+63|0)?[0-9]{10}$"
              />
              <p className="text-xs text-muted-foreground">
                Format: +63 9XX-XXX-XXXX or 09XX-XXX-XXXX
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Any additional information..."
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setInquiryType(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Similar Artworks */}
      {similarArtworks.length > 0 && (
        <div className="container mx-auto px-6 lg:px-8 py-16 mt-20 border-t border-border">
          <div className="mb-12">
            <h2 className="text-3xl tracking-tight mb-2">Similar Works</h2>
            <p className="text-muted-foreground">Explore more artworks you might like</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarArtworks.map((similar) => (
              <Link
                key={similar.id}
                href={`/artwork/${similar.slug || similar.id}`}
                onClick={() => trackArtworkClick(similar, 'similar_artworks')}
                className="group block space-y-4"
              >
                <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
                  <FallbackImage
                    src={similar.primary_image_url}
                    fallback="/images/placeholder.svg"
                    alt={similar.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium group-hover:text-[#0A7A7A] transition-colors">
                    {similar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{similar.artist_name}</p>
                  {similar.formatted_price && (
                    <p className="text-sm font-medium">{similar.formatted_price}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTop />

      {/* Sticky Bottom CTA Bar */}
      {artwork.status && (artwork.status.toLowerCase() === "available" || artwork.status.toLowerCase() === "reserved") && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-2xl lg:hidden">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{artwork.title}</p>
                {artwork.formatted_price && (
                  <p className="text-xs text-muted-foreground">{artwork.formatted_price}</p>
                )}
              </div>
              <button
                onClick={() => handleOpenDialog("reserve")}
                className="flex-shrink-0 px-6 py-2.5 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all font-medium text-sm shadow-lg flex items-center gap-2"
              >
                <Heart size={16} />
                Reserve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


