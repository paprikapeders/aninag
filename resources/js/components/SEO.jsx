import { Head } from '@inertiajs/react';

export function SEO({ meta }) {
  const {
    title = 'Aninag - Where Light Meets Artistry',
    description = 'Discover curated Filipino contemporary artworks with AR preview technology.',
    keywords = 'Filipino art, contemporary art Philippines, art gallery',
    url = typeof window !== 'undefined' ? window.location.href : '',
    image = '/images/og-default.jpg',
    type = 'website',
    price,
    currency,
    availability,
  } = meta || {};

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.aninag.com';

  // Organization structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aninag",
    "alternateName": "Aninag Collective",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "description": "Aninag connects collectors with exceptional Filipino contemporary artworks and showcases curated pieces from premier galleries.",
    "sameAs": [
      "https://www.facebook.com/aninag",
      "https://www.instagram.com/aninag"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "info@aninag.com",
      "availableLanguage": ["English", "Filipino"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Philippines"
    }
  };

  // Website structured data with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aninag",
    "alternateName": "Aninag Collective",
    "url": baseUrl,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Aninag",
      "url": baseUrl,
      "logo": `${baseUrl}/images/logo.png`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/catalog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Product structured data for artworks
  const productSchema = type === 'product' && price ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title.split(' by ')[0] || title,
    "description": description,
    "image": image,
    "url": url,
    "category": "Fine Art",
    "brand": {
      "@type": "Brand",
      "name": "Aninag"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency || 'PHP',
      "availability": availability === 'in stock' 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Aninag"
      }
    }
  } : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Aninag" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Product Specific (for artworks) */}
      {type === 'product' && price && (
        <>
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content={currency || 'PHP'} />
          <meta property="product:availability" content={availability || 'in stock'} />
        </>
      )}
      
      {/* Organization Schema - Always include */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Website Schema - Include on main pages */}
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
      
      {/* Product Schema - Include on artwork pages */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Head>
  );
}