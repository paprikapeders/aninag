import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { CheckCircle } from "lucide-react";

export default function Confirmation({ inquiry }) {
  const getInquiryTypeText = () => {
    switch (inquiry?.type) {
      case "price":
        return "Price Request";
      case "reserve":
        return "Reservation Request";
      case "viewing":
        return "Viewing Appointment";
      case "corporate":
        return "Corporate Inquiry";
      default:
        return "Inquiry";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Head title="Thank You - Aninag" />
      <Header />

      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#0A7A7A]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#0A7A7A]" />
              </div>
            </div>
            <h1 className="text-4xl tracking-tight">
              Thank You for Your Inquiry
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your Art Advisor will contact you within 24 hours to discuss the
              next steps and answer any questions you may have.
            </p>
          </div>

          {inquiry && (
            <div className="bg-muted/30 rounded-lg p-8 space-y-6 mb-8">
              <div>
                <h2 className="text-sm text-muted-foreground mb-1">
                  Inquiry Type
                </h2>
                <p className="text-lg">{getInquiryTypeText()}</p>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-sm text-muted-foreground mb-1">Artwork</h2>
                <p className="text-lg font-medium">{inquiry.artwork_title}</p>
                <p className="text-muted-foreground">by {inquiry.artist_name}</p>
                {inquiry.artwork_code && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Code: {inquiry.artwork_code}
                  </p>
                )}
                {inquiry.medium && (
                  <p className="text-sm text-muted-foreground">
                    {inquiry.medium}
                  </p>
                )}
                {inquiry.price && (
                  <p className="text-lg font-semibold text-[#0A7A7A] mt-2">
                    {inquiry.currency || 'PHP'} {Number(inquiry.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-sm text-muted-foreground mb-1">
                  Contact Information
                </h2>
                <p>{inquiry.name}</p>
                <p className="text-muted-foreground">{inquiry.email}</p>
                {inquiry.phone && (
                  <p className="text-muted-foreground">{inquiry.phone}</p>
                )}
              </div>

              {inquiry.message && (
                <div className="border-t border-border pt-6">
                  <h2 className="text-sm text-muted-foreground mb-1">
                    Your Message
                  </h2>
                  <p className="text-muted-foreground">{inquiry.message}</p>
                </div>
              )}
            </div>
          )}

          <div className="border border-[#0A7A7A]/20 rounded-lg p-6 bg-[#0A7A7A]/5 mb-8">
            <h3 className="mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5 text-[#0A7A7A]">•</span>
                <span>
                  Your dedicated Art Advisor will review your inquiry
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5 text-[#0A7A7A]">•</span>
                <span>
                  We'll contact you within 24 hours via email or phone
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5 text-[#0A7A7A]">•</span>
                <span>
                  You'll receive detailed information about the artwork and next steps
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center space-x-4">
            {inquiry?.artwork_slug && (
              <Link
                href={`/artwork/${inquiry.artwork_slug}`}
                className="inline-block px-8 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors"
              >
                Back to Artwork
              </Link>
            )}
            {!inquiry?.artwork_slug && (
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors"
              >
                Return Home
              </Link>
            )}
            <Link
              href="/catalog"
              className="inline-block px-8 py-3 border-2 border-[#0A7A7A] text-[#0A7A7A] rounded-lg hover:bg-[#0A7A7A] hover:text-white transition-colors"
            >
              Browse More Artworks
            </Link>
          </div>
        </div>
      </div>

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


