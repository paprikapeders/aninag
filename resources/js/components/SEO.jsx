import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export function SEO({ meta = {} }) {
  const title = String(meta?.title || 'Aninag - Where Light Meets Artistry');
  const description = String(meta?.description || 'Discover curated Filipino contemporary artworks with AR preview technology.');
  const keywords = String(meta?.keywords || 'Filipino art, contemporary art Philippines, art gallery');
  const url = String(meta?.url || (typeof window !== 'undefined' ? window.location.href : 'https://www.aninag.com'));
  const image = String(meta?.image || '/images/og-default.jpg');
  const type = String(meta?.type || 'website');
  const price = meta?.price ? String(meta.price) : null;
  const currency = String(meta?.currency || 'PHP');
  const availability = String(meta?.availability || 'in stock');
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.aninag.com';

  // Build Organization schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aninag",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`
  };

  // Build Product schema for artwork pages
  let productSchema = null;
  if (type === 'product' && price && price !== 'null' && price !== null && parseFloat(price) > 0) {
    const numericPrice = parseFloat(price);
    const priceValidUntil = new Date();
    priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
    
    // Determine availability URL
    let availabilityUrl = "https://schema.org/InStock";
    if (availability === 'out of stock' || availability === 'sold') {
      availabilityUrl = "https://schema.org/OutOfStock";
    } else if (availability === 'reserved') {
      availabilityUrl = "https://schema.org/PreOrder";
    }
    
    productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": title.split(' by ')[0] || title,
      "description": description || `Fine art piece available at Aninag Gallery`,
      "image": [image],
      "url": url,
      "category": "Fine Art",
      "brand": {
        "@type": "Brand",
        "name": "Aninag"
      },
      "offers": {
        "@type": "Offer",
        "price": String(numericPrice.toFixed(2)),
        "priceCurrency": currency,
        "availability": availabilityUrl,
        "url": url,
        "priceValidUntil": priceValidUntil.toISOString().split('T')[0],
        "seller": {
          "@type": "Organization",
          "name": "Aninag",
          "url": baseUrl
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": currency
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "PH"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 3,
              "maxValue": 7,
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "PH",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        }
      }
    };
    
    if (meta?.artwork_code) {
      productSchema.sku = String(meta.artwork_code);
    }
    
    if (meta?.artwork_id) {
      productSchema.productID = String(meta.artwork_id);
    }
    
    // Add aggregateRating if provided
    if (meta?.rating && meta?.reviewCount) {
      productSchema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": String(meta.rating),
        "reviewCount": String(meta.reviewCount),
        "bestRating": "5",
        "worstRating": "1"
      };
    }
    
    // Add review if provided
    if (meta?.reviews && Array.isArray(meta.reviews) && meta.reviews.length > 0) {
      productSchema.review = meta.reviews.map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": String(review.rating || 5),
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": String(review.author || "Anonymous")
        },
        "reviewBody": String(review.text || "")
      }));
    }
  }

  useEffect(() => {
    // Remove existing schema scripts on cleanup
    return () => {
      const schemas = document.querySelectorAll('script[data-schema]');
      schemas.forEach(script => script.remove());
    };
  }, []);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Aninag" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {productSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      )}
    </Head>
  );
}