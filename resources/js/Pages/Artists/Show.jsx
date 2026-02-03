import { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, MapPin, Palette, ChevronLeft } from "lucide-react";

export default function ArtistShow({ artist, artworks = [] }) {
  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Head title="Artist Not Found" />
        <Header />
        <div className="container mx-auto px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl mb-4">Artist Not Found</h1>
          <Link href="/artists" className="text-[#0A7A7A] hover:underline">
            Return to Artists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <Head title={`${artist.name} - Artist`} />
      <Header currentPath="/artists" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Back Button */}
        <Link
          href="/artists"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0A7A7A] mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Artists
        </Link>

        {/* Artist Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
              <div className="aspect-square relative bg-muted">
                {artist.profile_image_url ? (
                  <img
                    src={artist.profile_image_url}
                    alt={artist.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A7A7A]/10 to-[#D87456]/10">
                    <User className="w-32 h-32 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Artist Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-4">
                {artist.name}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] rounded-full" />
            </div>

            {/* Bio */}
            {artist.bio && (
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {artist.bio}
                </p>
              </div>
            )}

            {/* Description (if different from bio) */}
            {artist.description && artist.description !== artist.bio && (
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {artist.description}
                </p>
              </div>
            )}

            {/* Tags/Metadata */}
            <div className="space-y-4">
              {artist.mediums && artist.mediums.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Mediums</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.mediums.map((medium, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#0A7A7A]/10 text-[#0A7A7A] hover:bg-[#0A7A7A]/20">
                        {medium}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {artist.styles && artist.styles.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Styles</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.styles.map((style, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#D87456]/10 text-[#D87456] hover:bg-[#D87456]/20">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {artist.subjects && artist.subjects.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {artist.genres && artist.genres.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.genres.map((genre, index) => (
                      <Badge key={index} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            {artist.contact_info && (
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#0A7A7A] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Contact</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {artist.contact_info}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Artworks Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight">Artworks</h2>
                <div className="h-0.5 w-16 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mt-2 rounded-full" />
              </div>
              {artist.artworks_count > 0 && (
                <p className="text-sm text-muted-foreground">
                  {artist.artworks_count} {artist.artworks_count === 1 ? 'piece' : 'pieces'}
                </p>
              )}
            </div>

            {artworks && artworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            ) : (
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8 sm:p-12 text-center">
                  <Palette className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-lg text-muted-foreground">
                    No artworks currently available from this artist.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
