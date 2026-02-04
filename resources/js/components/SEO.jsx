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
    personName,
    personBio,
    personImage,
    personEmail,
    itemList,
    itemListType,
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
    "sku": meta?.artwork_code || meta?.sku || undefined,
    "productID": meta?.artwork_id || meta?.id || undefined,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency || 'PHP',
      "availability": availability === 'in stock' 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "url": url,
      "seller": {
        "@type": "Organization",
        "name": "Aninag"
      }
    },
    "aggregateRating": meta?.rating ? {
      "@type": "AggregateRating",
      "ratingValue": meta.rating,
      "reviewCount": meta.reviewCount || 1
    } : undefined
  } : null;

  // Person structured data for artists
  const personSchema = type === 'profile' && personName ? {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personName,
    "description": personBio || description,
    "image": personImage || image,
    "url": url,
    "jobTitle": "Artist",
    "worksFor": {
      "@type": "Organization",
      "name": "Aninag"
    },
    "email": personEmail || undefined,
    "nationality": {
      "@type": "Country",
      "name": "Philippines"
    },
    "knowsAbout": ["Contemporary Art", "Filipino Art", "Visual Arts"],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Visual Artist",
      "occupationLocation": {
        "@type": "Country",
        "name": "Philippines"
      }
    }
  } : null;

  // ItemList structured data for collection pages (artists, artworks)
  const itemListSchema = itemList && Array.isArray(itemList) && itemList.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description,
    "url": url,
    "numberOfItems": itemList.length,
    "itemListElement": itemList.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": itemListType === 'artists' ? "Person" : "Product",
        "name": item.name || item.title,
        "url": item.url,
        "image": item.image,
        ...(itemListType === 'artists' ? {
          "jobTitle": "Artist",
          "nationality": { "@type": "Country", "name": "Philippines" }
        } : {
          "category": "Fine Art"
        })
      }
    }))
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
      
      {/* Person Schema - Include on artist pages */}
      {personSchema && (
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      )}
      
      {/* ItemList Schema - Include on collection pages */}
      {itemListSchema && (
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      )}
    </Head>
  );
}