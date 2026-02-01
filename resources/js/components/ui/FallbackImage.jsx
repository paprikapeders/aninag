import { useState } from 'react';

/**
 * Image component with fallback support for broken images
 * 
 * @param {string} src - Primary image source
 * @param {string} fallback - Fallback image URL (optional, uses default if not provided)
 * @param {string} alt - Alt text for the image
 * @param {string} className - CSS classes
 * @param {object} ...props - Additional props to pass to the img element
 */
export function FallbackImage({ 
  src, 
  fallback = '/images/placeholder.svg', 
  alt = 'Image', 
  className = '',
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

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
