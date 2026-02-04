import { Head } from '@inertiajs/react';

export function SEO({ meta = {} }) {
  const title = String(meta?.title || 'Aninag - Where Light Meets Artistry');
  const description = String(meta?.description || 'Discover curated Filipino contemporary artworks with AR preview technology.');
  const keywords = String(meta?.keywords || 'Filipino art, contemporary art Philippines, art gallery');
  const url = String(meta?.url || (typeof window !== 'undefined' ? window.location.href : 'https://www.aninag.com'));
  const image = String(meta?.image || '/images/og-default.jpg');
  const type = String(meta?.type || 'website');

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