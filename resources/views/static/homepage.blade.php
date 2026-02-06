<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- SEO Meta Tags -->
    <title>{{ $meta['title'] }}</title>
    <meta name="description" content="{{ $meta['description'] }}">
    <meta name="keywords" content="{{ $meta['keywords'] }}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ $meta['url'] }}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $meta['url'] }}">
    <meta property="og:title" content="{{ $meta['title'] }}">
    <meta property="og:description" content="{{ $meta['description'] }}">
    <meta property="og:image" content="{{ $meta['image'] }}">
    <meta property="og:site_name" content="Aninag">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ $meta['url'] }}">
    <meta name="twitter:title" content="{{ $meta['title'] }}">
    <meta name="twitter:description" content="{{ $meta['description'] }}">
    <meta name="twitter:image" content="{{ $meta['image'] }}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Aninag",
        "url": "{{ $meta['url'] }}",
        "description": "{{ $meta['description'] }}",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "{{ url('/catalog') }}?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
        header { background: #1a1a1a; color: white; padding: 1rem 2rem; }
        header h1 { font-size: 1.5rem; }
        header nav { margin-top: 0.5rem; }
        header nav a { color: white; text-decoration: none; margin-right: 1.5rem; }
        main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .hero { text-align: center; padding: 3rem 0; }
        .hero h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
        .cta-button { display: inline-block; background: #1a1a1a; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 0.5rem; }
        .featured { margin-top: 3rem; }
        .featured h3 { font-size: 2rem; margin-bottom: 2rem; text-align: center; }
        .artwork-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
        .artwork-card { border: 1px solid #e0e0e0; border-radius: 0.5rem; overflow: hidden; }
        .artwork-card img { width: 100%; height: 300px; object-fit: cover; }
        .artwork-info { padding: 1rem; }
        .artwork-info h4 { font-size: 1.2rem; margin-bottom: 0.5rem; }
        .artwork-info p { color: #666; font-size: 0.9rem; }
        footer { background: #f5f5f5; padding: 2rem; text-align: center; margin-top: 4rem; color: #666; }
    </style>
</head>
<body>
    <header>
        <h1>Aninag</h1>
        <nav>
            <a href="{{ url('/') }}">Home</a>
            <a href="{{ url('/catalog') }}">Catalog</a>
            <a href="{{ url('/about') }}">About</a>
            <a href="{{ url('/contact') }}">Contact</a>
        </nav>
    </header>

    <main>
        <section class="hero">
            <h2>Gallery Art, Previewed at Home</h2>
            <p>Discover curated Filipino contemporary artworks with AR preview technology</p>
            <a href="{{ url('/catalog') }}" class="cta-button">Explore Collection</a>
        </section>

        <section class="featured">
            <h3>Featured Artworks</h3>
            <div class="artwork-grid">
                @foreach($featuredArtworks as $artwork)
                <article class="artwork-card" itemscope itemtype="https://schema.org/Product">
                    <a href="{{ url('/artwork/' . $artwork->slug) }}">
                        @if($artwork->primary_image_url)
                        <img src="{{ $artwork->primary_image_url }}" 
                             alt="{{ $artwork->title }} by {{ $artwork->artist_name }}"
                             itemprop="image">
                        @endif
                        <div class="artwork-info">
                            <h4 itemprop="name">{{ $artwork->title }}</h4>
                            <p itemprop="creator" itemscope itemtype="https://schema.org/Person">
                                <span itemprop="name">{{ $artwork->artist_name }}</span>
                            </p>
                            <p>{{ $artwork->medium }}</p>
                            <p>{{ $artwork->year }}</p>
                            @if($artwork->price)
                            <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                                <meta itemprop="price" content="{{ $artwork->price }}">
                                <meta itemprop="priceCurrency" content="{{ $artwork->currency ?? 'PHP' }}">
                                {{ $artwork->currency ?? 'PHP' }} {{ number_format($artwork->price) }}
                            </p>
                            @endif
                        </div>
                    </a>
                </article>
                @endforeach
            </div>
        </section>

        <section style="margin-top: 4rem; text-align: center; padding: 3rem; background: #f9f9f9; border-radius: 0.5rem;">
            <h3 style="font-size: 2rem; margin-bottom: 1rem;">Why Choose Aninag?</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
                <div>
                    <h4 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Curated Collection</h4>
                    <p style="color: #666;">Carefully selected Filipino contemporary artworks from premier galleries</p>
                </div>
                <div>
                    <h4 style="font-size: 1.3rem; margin-bottom: 0.5rem;">AR Preview</h4>
                    <p style="color: #666;">Visualize artworks in your space before making a purchase</p>
                </div>
                <div>
                    <h4 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Expert Guidance</h4>
                    <p style="color: #666;">Connect with galleries and receive personalized art advisory services</p>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; {{ date('Y') }} Aninag. All rights reserved.</p>
        <p style="margin-top: 0.5rem;">Your trusted art advisor for Filipino contemporary art</p>
    </footer>

    <!-- Redirect to full app after crawlers process -->
    <noscript>
        <meta http-equiv="refresh" content="0;url={{ url('/') }}">
    </noscript>
</body>
</html>
