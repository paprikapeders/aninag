import { Link } from '@inertiajs/react';
import { WishlistButton } from './WishlistButton';
import { FallbackImage } from './ui/FallbackImage';

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
      </div>
      <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 bg-gradient-to-b from-white to-[#FDFCFB]">
        <h3 className="text-base sm:text-lg font-medium group-hover:text-[#0A7A7A] transition-colors">{artwork.title}</h3>
        {artwork.artist_slug ? (
          <Link 
            href={`/artists/${artwork.artist_slug}`}
            className="text-muted-foreground hover:text-[#0A7A7A] text-xs sm:text-sm transition-colors inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            {artwork.artist_name}
          </Link>
        ) : (
          <p className="text-muted-foreground text-xs sm:text-sm">{artwork.artist_name}</p>
        )}
        <p className="text-xs sm:text-sm text-muted-foreground">
          {artwork.medium} • {artwork.year}
        </p>
        {artwork.formatted_price && (
          <p className="text-sm sm:text-base font-medium text-foreground mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-border/50">
            {artwork.formatted_price}
          </p>
        )}
      </div>
    </Link>
  );
}


