/**
 * Wishlist utility for managing favorite artworks
 * Uses localStorage for persistence
 */

const WISHLIST_KEY = 'aninag_wishlist';

export const wishlistUtils = {
  /**
   * Get all wishlist items
   */
  getWishlist() {
    if (typeof window === 'undefined') return [];
    try {
      const wishlist = localStorage.getItem(WISHLIST_KEY);
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      console.error('Error reading wishlist:', error);
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
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { artworkId, action: 'add' } }));
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
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { artworkId, action: 'remove' } }));
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
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { action: 'clear' } }));
  }
};
