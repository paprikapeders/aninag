import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
const WISHLIST_KEY = "aninag_wishlist";
const wishlistUtils = {
  /**
   * Get all wishlist items
   */
  getWishlist() {
    if (typeof window === "undefined") return [];
    try {
      const wishlist = localStorage.getItem(WISHLIST_KEY);
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      console.error("Error reading wishlist:", error);
      return [];
    }
  },
  /**
   * Check if artwork is in wishlist
   */
  isInWishlist(artworkId) {
    const wishlist = this.getWishlist();
    return wishlist.includes(artworkId);
  },
  /**
   * Add artwork to wishlist
   */
  addToWishlist(artworkId) {
    const wishlist = this.getWishlist();
    if (!wishlist.includes(artworkId)) {
      wishlist.push(artworkId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: { artworkId, action: "add" } }));
      return true;
    }
    return false;
  },
  /**
   * Remove artwork from wishlist
   */
  removeFromWishlist(artworkId) {
    let wishlist = this.getWishlist();
    const index = wishlist.indexOf(artworkId);
    if (index > -1) {
      wishlist.splice(index, 1);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: { artworkId, action: "remove" } }));
      return true;
    }
    return false;
  },
  /**
   * Toggle artwork in wishlist
   */
  toggleWishlist(artworkId) {
    if (this.isInWishlist(artworkId)) {
      this.removeFromWishlist(artworkId);
      return false;
    } else {
      this.addToWishlist(artworkId);
      return true;
    }
  },
  /**
   * Get wishlist count
   */
  getCount() {
    return this.getWishlist().length;
  },
  /**
   * Clear entire wishlist
   */
  clearWishlist() {
    localStorage.removeItem(WISHLIST_KEY);
    window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: { action: "clear" } }));
  }
};
function WishlistButton({ artworkId, size = "default", showLabel = false }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsInWishlist(wishlistUtils.isInWishlist(artworkId));
    const handleWishlistUpdate = (e) => {
      if (e.detail.artworkId === artworkId) {
        setIsInWishlist(wishlistUtils.isInWishlist(artworkId));
      }
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
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
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleToggle,
      className: `${sizeClasses[size]} inline-flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200 ${isAnimating ? "scale-110" : ""} ${isInWishlist ? "border-[#0A7A7A] bg-[#0A7A7A]/10" : ""}`,
      title: isInWishlist ? "Remove from wishlist" : "Add to wishlist",
      children: [
        /* @__PURE__ */ jsx(
          Heart,
          {
            size: iconSizes[size],
            className: `transition-all duration-200 ${isInWishlist ? "fill-[#0A7A7A] text-[#0A7A7A]" : "text-muted-foreground"}`
          }
        ),
        showLabel && /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm", children: isInWishlist ? "Saved" : "Save" })
      ]
    }
  );
}
function FallbackImage({
  src,
  fallback = "/images/placeholder.svg",
  alt = "Image",
  className = "",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: imgSrc || fallback,
      alt,
      className,
      onError: handleError,
      ...props
    }
  );
}
export {
  FallbackImage as F,
  WishlistButton as W
};
