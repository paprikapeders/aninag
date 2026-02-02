import { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Catalog({ artworks = [], artists = [], mediums = [], priceRanges = [] }) {
  const [artistFilter, setArtistFilter] = useState("all");
  const [mediumFilter, setMediumFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredArtworks = (Array.isArray(artworks) ? artworks : []).filter((artwork) => {
    if (artistFilter !== "all" && artwork.artist_name !== artistFilter) return false;
    if (mediumFilter !== "all" && artwork.medium !== mediumFilter) return false;
    if (priceFilter !== "all" && artwork.price) {
      const range = priceRanges.find(r => r.label === priceFilter);
      if (range) {
        if (artwork.price < range.min || artwork.price > range.max) return false;
      }
    }
    return true;
  });

  // Sort the filtered artworks
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "title-az":
        return a.title.localeCompare(b.title);
      case "artist-az":
        return a.artist_name.localeCompare(b.artist_name);
      case "newest":
      default:
        return b.year - a.year;
    }
  });

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <Head title="Collection - Aninag" />
      <Header currentPath="/catalog" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight">Collection</h1>
            <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mt-3 sm:mt-4 rounded-full" />
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Browse our complete collection of contemporary artworks. Each piece
            is carefully selected and available for acquisition.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-border relative z-10">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Artist</label>
              <Select value={artistFilter} onValueChange={setArtistFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Artists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Artists</SelectItem>
                  {artists.map((artist) => (
                    <SelectItem key={artist} value={artist}>
                      {artist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Medium</label>
              <Select value={mediumFilter} onValueChange={setMediumFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Mediums" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Mediums</SelectItem>
                  {mediums.map((medium) => (
                    <SelectItem key={medium} value={medium}>
                      {medium}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Price Range</label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setArtistFilter("all");
                setMediumFilter("all");
                setPriceFilter("all");
              }}
              className="w-full px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-muted-foreground">
            Showing {sortedArtworks.length} of {artworks.length} artworks
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <label className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Sort by:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="title-az">Title: A-Z</SelectItem>
                <SelectItem value="artist-az">Artist: A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sortedArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {sortedArtworks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No artworks found matching your filters.
            </p>
          </div>
        )}
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}


