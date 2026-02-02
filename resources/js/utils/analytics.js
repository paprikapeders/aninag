/**
 * Google Analytics 4 Event Tracking Utilities
 * Senior SEO Specialist Implementation
 * 
 * This module provides comprehensive tracking for all user interactions
 * with proper conversion goal measurement including device and browser information
 */

// Check if gtag is available
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

// Get device information from window (set in app.blade.php)
const getDeviceInfo = () => {
  if (typeof window === 'undefined' || !window.deviceInfo) {
    return {};
  }
  return window.deviceInfo;
};

/**
 * Core Analytics Functions
 */

// Track page views (for SPA navigation)
export const trackPageView = (url, title) => {
  if (!isGtagAvailable()) return;
  
  const deviceInfo = getDeviceInfo();
  
  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: url,
    page_path: window.location.pathname,
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system,
    screen_resolution: deviceInfo.screen_resolution,
  });
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (!isGtagAvailable()) return;
  
  const deviceInfo = getDeviceInfo();
  
  window.gtag('event', eventName, {
    ...parameters,
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Conversion Goal Tracking
 * These are the primary success metrics for Aninag
 */

// GOAL 1: Reserve Artwork (Primary Conversion)
export const trackArtworkReservation = (artworkData) => {
  if (!isGtagAvailable()) return;
  
  const gaId = window.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  const deviceInfo = getDeviceInfo();
  
  window.gtag('event', 'conversion', {
    send_to: `${gaId}/artwork_reserve`,
    event_category: 'Conversion',
    event_label: 'Reserve Artwork',
    value: artworkData.price || 0,
    currency: 'PHP',
    artwork_id: artworkData.id,
    artwork_title: artworkData.title,
    artwork_artist: artworkData.artist_name,
    gallery_name: artworkData.gallery?.name || 'Unknown',
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system,
  });
  
  // Also track as standard event
  window.gtag('event', 'reserve_artwork', {
    artwork_id: artworkData.id,
    artwork_title: artworkData.title,
    artwork_price: artworkData.price,
    artist: artworkData.artist_name,
    gallery: artworkData.gallery?.name,
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system,
  });
};

// GOAL 2: Contact Form Submission
export const trackContactSubmission = (formData) => {
  if (!isGtagAvailable()) return;
  
  const gaId = window.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  const deviceInfo = getDeviceInfo();
  
  window.gtag('event', 'conversion', {
    send_to: `${gaId}/contact_submit`,
    event_category: 'Conversion',
    event_label: 'Contact Form Submission',
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system,
  });
  
  window.gtag('event', 'generate_lead', {
    lead_type: 'contact_form',
    inquiry_type: formData.inquiry_type || 'general',
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system,
  });
};

// GOAL 3: AR Viewer Usage (High Intent Signal)
export const trackARViewerOpen = (artworkData) => {
  if (!isGtagAvailable()) return;
  
  const deviceInfo = getDeviceInfo();
  
  window.gtag('event', 'ar_viewer_open', {
    event_category: 'Engagement',
    event_label: 'AR Viewer Opened',
    artwork_id: artworkData.id,
    artwork_title: artworkData.title,
    artwork_price: artworkData.price,
    engagement_level: 'high',
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system,
  });
};

export const trackARModeSwitch = (mode) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'ar_mode_switch', {
    event_category: 'Engagement',
    event_label: `AR Mode: ${mode}`,
    ar_mode: mode, // 'camera' or 'upload'
  });
};

export const trackARImageUpload = () => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'ar_image_upload', {
    event_category: 'Engagement',
    event_label: 'User Uploaded Room Photo',
    engagement_level: 'very_high',
  });
};

// GOAL 4: Gallery Partner Inquiry
export const trackGalleryInquiry = (galleryData) => {
  if (!isGtagAvailable()) return;
  
  const gaId = window.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  
  window.gtag('event', 'conversion', {
    send_to: `${gaId}/gallery_inquiry`,
    event_category: 'Conversion',
    event_label: 'Gallery Inquiry',
    gallery_name: galleryData.name,
  });
  
  window.gtag('event', 'generate_lead', {
    lead_type: 'gallery_inquiry',
    gallery: galleryData.name,
  });
};

/**
 * Engagement Tracking
 */

// Track artwork card clicks
export const trackArtworkClick = (artworkData, position = null) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'select_item', {
    event_category: 'Engagement',
    event_label: 'Artwork Clicked',
    items: [{
      item_id: artworkData.id,
      item_name: artworkData.title,
      item_category: 'Artwork',
      price: artworkData.price,
      item_list_name: position || 'catalog',
    }],
  });
};

// Track search usage
export const trackSearch = (searchTerm, resultsCount) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Track filter usage
export const trackFilterUse = (filterType, filterValue) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'filter_use', {
    event_category: 'Engagement',
    filter_type: filterType,
    filter_value: filterValue,
  });
};

// Track social proof interactions
export const trackTestimonialView = () => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'testimonial_view', {
    event_category: 'Engagement',
    event_label: 'Testimonial Section Viewed',
  });
};

// Track FAQ interactions
export const trackFAQClick = (question) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'faq_click', {
    event_category: 'Engagement',
    event_label: question,
  });
};

// Track gallery partner views
export const trackGalleryView = (galleryName) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'gallery_view', {
    event_category: 'Engagement',
    gallery_name: galleryName,
  });
};

/**
 * Navigation Tracking
 */

export const trackNavigation = (destination, source = 'header') => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'navigation', {
    event_category: 'Navigation',
    event_label: `${source} to ${destination}`,
    destination,
    source,
  });
};

export const trackCTAClick = (ctaLabel, ctaLocation) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'cta_click', {
    event_category: 'CTA',
    event_label: ctaLabel,
    cta_location: ctaLocation,
  });
};

/**
 * Scroll Depth Tracking
 */
export const trackScrollDepth = (depth) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'scroll', {
    event_category: 'Engagement',
    event_label: `Scroll Depth: ${depth}%`,
    scroll_depth: depth,
  });
};

/**
 * Time on Page Tracking
 */
export const trackTimeOnPage = (seconds, pagePath) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'time_on_page', {
    event_category: 'Engagement',
    time_seconds: seconds,
    page_path: pagePath,
  });
};

/**
 * Error Tracking
 */
export const trackError = (errorMessage, errorLocation) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'exception', {
    description: errorMessage,
    location: errorLocation,
    fatal: false,
  });
};

/**
 * Social Sharing
 */
export const trackShare = (platform, contentType, contentId) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'share', {
    method: platform,
    content_type: contentType,
    content_id: contentId,
  });
};

/**
 * Outbound Link Tracking
 */
export const trackOutboundLink = (url, linkText) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'click', {
    event_category: 'Outbound Link',
    event_label: linkText,
    outbound_url: url,
  });
};

/**
 * E-commerce Tracking (for future monetization)
 */
export const trackBeginCheckout = (artworkData) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'begin_checkout', {
    currency: 'PHP',
    value: artworkData.price,
    items: [{
      item_id: artworkData.id,
      item_name: artworkData.title,
      price: artworkData.price,
    }],
  });
};

export const trackAddToWishlist = (artworkData) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', 'add_to_wishlist', {
    currency: 'PHP',
    value: artworkData.price,
    items: [{
      item_id: artworkData.id,
      item_name: artworkData.title,
      price: artworkData.price,
    }],
  });
};

/**
 * User Behavior Patterns
 */
export const trackUserSegment = (segment) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('set', 'user_properties', {
    user_segment: segment, // e.g., 'collector', 'interior_designer', 'casual_browser'
  });
};

// Export all tracking functions
export default {
  trackPageView,
  trackEvent,
  trackArtworkReservation,
  trackContactSubmission,
  trackARViewerOpen,
  trackARModeSwitch,
  trackARImageUpload,
  trackGalleryInquiry,
  trackArtworkClick,
  trackSearch,
  trackFilterUse,
  trackTestimonialView,
  trackFAQClick,
  trackGalleryView,
  trackNavigation,
  trackCTAClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackError,
  trackShare,
  trackOutboundLink,
  trackBeginCheckout,
  trackAddToWishlist,
  trackUserSegment,
};
