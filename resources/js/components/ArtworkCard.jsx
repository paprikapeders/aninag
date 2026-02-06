import { Link } from '@inertiajs/react';
import { WishlistButton } from './WishlistButton';
import { FallbackImage } from './ui/FallbackImage';
import { Camera } from 'lucide-react';

export function ArtworkCard({ artwork }) {
  return (
    <Link
      href={`/artwork/${artwork.slug || artwork.id}`}
      className="group block bg-card rounded-lg overflow-hidden transition-all duration-300 border border-border hover:border-[#0A7A7A]/30 shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
        <FallbackImage
          src={artwork.primary_image_url || artwork.image_url}
          fallback="/images/placeholder.svg"
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Wishlist button overlay */}
        <div 
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => e.preventDefault()}
        >
          <WishlistButton artworkId={artwork.id} size="small" />
        </div>
        
        {/* AR CTA on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-4 py-2 bg-[#0A7A7A]/90 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
            <Camera size={16} />
            <span>View in your space</span>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 bg-gradient-to-b from-white to-[#FDFCFB]">
        <h3 className="text-base sm:text-lg font-medium group-hover:text-[#0A7A7A] transition-colors line-clamp-2">{artwork.title}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm">{artwork.artist_name}</p>
        
        {/* Dimensions - Prominently displayed */}
        {artwork.size && (
          <p className="text-xs sm:text-sm text-foreground/70 font-medium">
            {artwork.size}
          </p>
        )}
        
        <p className="text-xs sm:text-sm text-muted-foreground">
          {artwork.medium} {artwork.year && `• ${artwork.year}`}
        </p>
        
        {/* Price - More prominent */}
        {artwork.formatted_price && (
          <p className="text-base sm:text-lg font-semibold text-foreground mt-2 sm:mt-3 pt-2 sm:pt-3 border-t-2 border-[#0A7A7A]/10">
            {artwork.formatted_price}
          </p>
        )}
      </div>
    </Link>
  );
}


