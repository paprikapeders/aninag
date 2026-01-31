import { useState } from "react";
import { Head, Link, router } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { WishlistButton } from "@/components/WishlistButton";
import { ShareButtons } from "@/components/ShareButtons";
import { ImageZoom } from "@/components/ImageZoom";
import { ARViewer } from "@/components/ARViewer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Eye, TrendingUp, Award, Home, Camera } from "lucide-react";

export default function ArtworkDetail({ artwork, similarArtworks = [] }) {
  const [inquiryType, setInquiryType] = useState(null);
  const [showAR, setShowAR] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
        artwork_title: artwork.title,
        artist_name: artwork.artist_name,
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
    <div className="min-h-screen bg-background">
      <Head title={`${artwork.title} - Aninag`} />
      <Header />

      {/* AR Viewer Component */}
      <ARViewer 
        artwork={artwork} 
        isOpen={showAR} 
        onClose={() => setShowAR(false)} 
      />

      <div className="container mx-auto px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery with Zoom */}
          <div className="space-y-4">
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
              onClick={() => setShowAR(true)}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              <Camera size={20} />
              View in Your Space (AR)
            </button>
            <p className="text-xs text-center text-muted-foreground">
              See how this artwork looks on your wall using your camera
            </p>
          </div>

          {/* Artwork Information */}
          <div className="space-y-8">
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

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl tracking-tight mb-2">{artwork.title}</h1>
                  <Link 
                    href={`/catalog?artist=${encodeURIComponent(artwork.artist_name)}`}
                    className="text-xl text-muted-foreground hover:text-[#0A7A7A] transition-colors"
                  >
                    {artwork.artist_name}
                  </Link>
                </div>
              </div>
            </div>

            {/* Prominent Specifications */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Specifications</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Medium</p>
                  <p className="font-medium text-lg">{artwork.medium}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Year</p>
                  <p className="font-medium text-lg">{artwork.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dimensions</p>
                  <p className="font-medium text-lg">{artwork.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Gallery</p>
                  <p className="font-medium text-lg">{artwork.gallery_name || 'Modern Arts Gallery'}</p>
                </div>
              </div>
            </div>

            {/* Artist Bio */}
            {artwork.artist_bio && (
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-medium mb-3">About the Artist</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {artwork.artist_bio}
                </p>
              </div>
            )}

            <div className="border-t border-border pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {artwork.description || `A stunning contemporary piece by ${artwork.artist_name}.`}
              </p>
            </div>

            {/* Price Display with Urgency */}
            {artwork.formatted_price && (
              <div className="border-t border-border pt-6">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-3xl font-light tracking-tight">{artwork.formatted_price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#0A7A7A]">✓ Available</p>
                    <p className="text-xs text-muted-foreground">Only 1 piece</p>
                  </div>
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t border-border pt-6">
              <ShareButtons artwork={artwork} />
            </div>

            {/* CTAs - Intentional & Calm */}
            {artwork.status && (artwork.status.toLowerCase() === "available" || artwork.status.toLowerCase() === "reserved") && (
              <div className="border-t border-border pt-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg tracking-tight">Interested in this artwork?</h3>
                  <p className="text-sm text-muted-foreground">Choose how you'd like to proceed</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleOpenDialog("reserve")}
                    className="px-6 py-3.5 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all duration-200 text-sm tracking-wide"
                  >
                    Reserve Artwork
                  </button>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">Additional Options</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleOpenDialog("viewing")}
                      className="px-5 py-2.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      Book a Viewing
                    </button>
                    <button
                      onClick={() => handleOpenDialog("corporate")}
                      className="px-5 py-2.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      Inquire for Corporate
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                href={`/artwork/${similar.id}`}
                className="group block space-y-4"
              >
                <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={similar.primary_image_url}
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

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2026 Aninag. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
