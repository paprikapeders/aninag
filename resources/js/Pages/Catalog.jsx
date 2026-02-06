import { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Catalog({ artworks = [], artists = [], mediums = [], priceRanges = [], total = 0, filters = {} }) {
  const artistFilter = filters.artist || 'all';
  const mediumFilter = filters.medium || 'all';
  const priceFilter = filters.price || 'all';
  const sizeFilter = filters.size || 'all';
  const sortBy = filters.sort || 'recommended';
  const searchQuery = filters.search || '';
  const [searchInput, setSearchInput] = useState(searchQuery);
  
  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams();
    
    // Preserve search
    if (searchQuery) params.set('search', searchQuery);
    
    // Build params based on which filter changed
    const filters = {
      artist: artistFilter,
      medium: mediumFilter,
      price: priceFilter,
      size: sizeFilter,
      sort: sortBy
    };
    
    // Update the changed filter
    filters[filterType] = value;
    
    // Add all non-'all' filters to params
    Object.entries(filters).forEach(([key, val]) => {
      if (key === 'sort') {
        params.set('sort', val);
      } else if (val !== 'all') {
        params.set(key, val);
      }
    });
    
    window.location.href = `/catalog?${params.toString()}`;
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchInput.trim()) params.set('search', searchInput.trim());
    if (artistFilter !== 'all') params.set('artist', artistFilter);
    if (mediumFilter !== 'all') params.set('medium', mediumFilter);
    if (priceFilter !== 'all') params.set('price', priceFilter);
    if (sizeFilter !== 'all') params.set('size', sizeFilter);
    if (sortBy !== 'recommended') params.set('sort', sortBy);
    
    window.location.href = `/catalog?${params.toString()}`;
  };
  
  const handleClearFilters = () => {
    setSearchInput('');
    window.location.href = '/catalog';
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <Head title="Collection" />
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

        {/* Search Bar */}
        <div className="mb-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by title or artist..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7A7A] focus:border-transparent transition-all text-sm sm:text-base"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    if (searchQuery) {
                      const params = new URLSearchParams();
                      if (artistFilter !== 'all') params.set('artist', artistFilter);
                      if (mediumFilter !== 'all') params.set('medium', mediumFilter);
                      if (priceFilter !== 'all') params.set('price', priceFilter);
                      if (sizeFilter !== 'all') params.set('size', sizeFilter);
                      if (sortBy !== 'recommended') params.set('sort', sortBy);
                      
                      const queryString = params.toString();
                      window.location.href = queryString ? `/catalog?${queryString}` : '/catalog';
                    }
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-border relative z-10">
            
            {/* Price Range - FIRST (Buyer Priority) */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Price Range</label>
              <Select value={priceFilter} onValueChange={(value) => handleFilterChange('price', value)}>
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
            
            {/* Size - SECOND (AR compatibility) */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Size</label>
              <Select value={sizeFilter} onValueChange={(value) => handleFilterChange('size', value)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small (&lt; 60cm)</SelectItem>
                  <SelectItem value="medium">Medium (60-120cm)</SelectItem>
                  <SelectItem value="large">Large (&gt; 120cm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Medium - THIRD */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Medium</label>
              <Select value={mediumFilter} onValueChange={(value) => handleFilterChange('medium', value)}>
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
            
            {/* Artist - FOURTH */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Artist</label>
              <Select value={artistFilter} onValueChange={(value) => handleFilterChange('artist', value)}>
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

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

        {/* Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {total > 0 ? `${total} artwork${total !== 1 ? 's' : ''} available` : 'No artworks found'}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <label className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Sort by:</label>
            <Select value={sortBy} onValueChange={(value) => handleFilterChange('sort', value)}>
              <SelectTrigger className="bg-background w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="most-viewed">Most Popular</SelectItem>
                <SelectItem value="best-for-ar">Best for AR Preview</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {artworks.length === 0 && (
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


