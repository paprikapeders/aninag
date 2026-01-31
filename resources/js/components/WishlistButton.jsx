import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { wishlistUtils } from "@/utils/wishlist";

export function WishlistButton({ artworkId, size = "default", showLabel = false }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistUtils.isInWishlist(artworkId));

    const handleWishlistUpdate = (e) => {
      if (e.detail.artworkId === artworkId) {
        setIsInWishlist(wishlistUtils.isInWishlist(artworkId));
      }
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [artworkId]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    wishlistUtils.toggleWishlist(artworkId);
  };

  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-12 h-12"
  };

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24
  };

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses[size]} inline-flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200 ${
        isAnimating ? 'scale-110' : ''
      } ${isInWishlist ? 'border-[#0A7A7A] bg-[#0A7A7A]/10' : ''}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={iconSizes[size]}
        className={`transition-all duration-200 ${
          isInWishlist ? 'fill-[#0A7A7A] text-[#0A7A7A]' : 'text-muted-foreground'
        }`}
      />
      {showLabel && (
        <span className="ml-2 text-sm">
          {isInWishlist ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
