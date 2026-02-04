import { Head } from '@inertiajs/react';

export function SEO({ meta = {} }) {
  const title = String(meta?.title || 'Aninag');
  const description = String(meta?.description || 'Filipino Art Gallery');
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}