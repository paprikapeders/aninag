import { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/Header";
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
    <div className="min-h-screen bg-background">
      <Head title="Collection - Aninag" />
      <Header currentPath="/catalog" />

      <div className="container mx-auto px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl tracking-tight">Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our complete collection of contemporary artworks. Each piece
            is carefully selected and available for acquisition.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-lg relative z-10">
            <div className="space-y-2">
              <label className="text-sm">Artist</label>
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
              <label className="text-sm">Medium</label>
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
            <label className="text-sm">Price Range</label>
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
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {sortedArtworks.length} of {artworks.length} artworks
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">Sort by:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background w-[180px]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
