import { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ArtistsIndex({ artists = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // SEO meta data with ItemList schema
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.aninag.com';
  
  const itemList = (Array.isArray(artists) ? artists : []).map(artist => ({
    name: artist.name,
    url: `${baseUrl}/artists/${artist.slug}`,
    image: artist.profile_image_url || `${baseUrl}/images/default-artist.jpg`
  }));
  
  const seoMeta = {
    title: 'Filipino Contemporary Artists | Aninag Gallery',
    description: 'Browse our curated collection of talented Filipino contemporary artists. Discover unique artistic visions and exceptional artworks from established and emerging artists.',
    keywords: 'Filipino artists, contemporary artists Philippines, Philippine art, Filipino painters, emerging artists',
    url: typeof window !== 'undefined' ? window.location.href : `${baseUrl}/artists`,
    image: '/images/og-artists.jpg',
    type: 'website',
    itemList: itemList,
    itemListType: 'artists',
  };

  const filteredArtists = (Array.isArray(artists) ? artists : []).filter((artist) => {
    if (!searchQuery) return true;
    return artist.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <SEO meta={seoMeta} />
      <Head title="Artists" />
      <Header currentPath="/artists" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight">Artists</h1>
            <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mt-3 sm:mt-4 rounded-full" />
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Discover the talented artists behind our collection. Each artist brings
            their unique vision and style to create extraordinary works.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A7A]"
            />
          </div>
        </div>

        {/* Artists Grid */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No artists found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group"
              >
                <Card className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 h-full bg-white/80 backdrop-blur-sm">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    {artist.profile_image_url ? (
                      <img
                        src={artist.profile_image_url}
                        alt={artist.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A7A7A]/10 to-[#D87456]/10">
                        <User className="w-20 h-20 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 pt-4 space-y-2">
                    <h3 className="font-medium text-lg group-hover:text-[#0A7A7A] transition-colors">
                      {artist.name}
                    </h3>
                    {artist.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {artist.bio}
                      </p>
                    )}
                    {artist.artworks_count > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {artist.artworks_count} {artist.artworks_count === 1 ? 'artwork' : 'artworks'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
