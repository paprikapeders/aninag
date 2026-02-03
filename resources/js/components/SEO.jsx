import { Head } from '@inertiajs/react';

export function SEO({ meta }) {
  const {
    title = 'Aninag - Where Light Meets Artistry',
    description = 'Discover curated Filipino contemporary artworks with AR preview technology.',
    keywords = 'Filipino art, contemporary art Philippines, art gallery',
    url = window.location.href,
    image = '/images/og-default.jpg',
    type = 'website',
    price,
    currency,
    availability,
  } = meta || {};

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
      
      {/* Twitter Card */}
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
      
      {/* Structured Data */}
      {type === 'product' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": title.split(' by ')[0],
            "description": description,
            "image": image,
            "url": url,
            "offers": {
              "@type": "Offer",
              "price": price,
              "priceCurrency": currency || 'PHP',
              "availability": availability === 'in stock' 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock"
            }
          })}
        </script>
      )}
      
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Aninag",
            "description": description,
            "url": url,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${window.location.origin}/catalog?search={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      )}
    </Head>
  );
}
