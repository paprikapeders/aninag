import { Link } from '@inertiajs/react';
import { WishlistButton } from './WishlistButton';

export function ArtworkCard({ artwork }) {
  return (
    <Link
      href={`/artwork/${artwork.id}`}
      className="group block bg-card rounded-lg overflow-hidden transition-transform hover:scale-[1.02] border border-transparent hover:border-[#0A7A7A]/20"
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
        <img
          src={artwork.primary_image_url || artwork.image_url || 'https://via.placeholder.com/400x533'}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Wishlist button overlay */}
        <div 
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
        >
          <WishlistButton artworkId={artwork.id} size="small" />
        </div>
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-lg">{artwork.title}</h3>
        <p className="text-muted-foreground text-sm">{artwork.artist_name}</p>
        <p className="text-sm text-muted-foreground">
          {artwork.medium} • {artwork.year}
        </p>
        {artwork.formatted_price && (
          <p className="text-base font-medium text-foreground mt-2">
            {artwork.formatted_price}
          </p>
        )}
      </div>
    </Link>
  );
}
