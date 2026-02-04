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

  useEffect(() => {
    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[data-schema]');
    existingSchemas.forEach(script => script.remove());

    // Add Organization schema
    const orgSchema = document.createElement('script');
    orgSchema.type = 'application/ld+json';
    orgSchema.setAttribute('data-schema', 'organization');
    orgSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Aninag",
      "url": baseUrl,
      "logo": `${baseUrl}/images/logo.png`
    });
    document.head.appendChild(orgSchema);

    // Add Product schema for artwork pages
    if (type === 'product' && price && price !== 'null' && price !== null && parseFloat(price) > 0) {
      const productSchema = document.createElement('script');
      productSchema.type = 'application/ld+json';
      productSchema.setAttribute('data-schema', 'product');
      
      const numericPrice = parseFloat(price);
      const priceValidUntil = new Date();
      priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
      
      const productData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": title.split(' by ')[0] || title,
        "description": description,
        "image": [image],
        "url": url,
        "category": "Fine Art",
        "brand": {
          "@type": "Brand",
          "name": "Aninag"
        },
        "offers": {
          "@type": "Offer",
          "price": numericPrice.toFixed(2),
          "priceCurrency": currency,
          "availability": availability === 'in stock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "url": url,
          "priceValidUntil": priceValidUntil.toISOString().split('T')[0],
          "seller": {
            "@type": "Organization",
            "name": "Aninag"
          }
        }
      };
      
      if (meta?.artwork_code) {
        productData.sku = String(meta.artwork_code);
      }
      
      if (meta?.artwork_id) {
        productData.productID = String(meta.artwork_id);
      }
      
      productSchema.textContent = JSON.stringify(productData);
      document.head.appendChild(productSchema);
    }

    return () => {
      // Cleanup on unmount
      const schemas = document.querySelectorAll('script[data-schema]');
      schemas.forEach(script => script.remove());
    };
  }, [title, description, url, image, type, price, currency, availability, baseUrl, meta?.artwork_code]);

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
    </Head>
  );
}