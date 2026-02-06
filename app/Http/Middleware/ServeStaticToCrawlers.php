<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Artwork;

class ServeStaticToCrawlers
{
    /**
     * List of crawler user agents to detect
     */
    private array $crawlers = [
        'googlebot',
        'bingbot',
        'slurp',
        'duckduckbot',
        'baiduspider',
        'yandexbot',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'telegrambot',
        'applebot',
        'pinterest',
    ];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only handle GET requests to the homepage
        if ($request->method() !== 'GET' || $request->path() !== '/') {
            return $next($request);
        }

        // Check if the request is from a crawler
        $userAgent = strtolower($request->userAgent() ?? '');
        $isCrawler = false;

        foreach ($this->crawlers as $crawler) {
            if (str_contains($userAgent, $crawler)) {
                $isCrawler = true;
                break;
            }
        }

        // If not a crawler, proceed normally
        if (!$isCrawler) {
            return $next($request);
        }

        // Serve static HTML for crawlers
        return $this->serveStaticHomepage();
    }

    /**
     * Generate and return static HTML for the homepage
     */
    private function serveStaticHomepage(): Response
    {
        $featuredArtworks = Artwork::featured()->limit(6)->get();
        
        $title = 'Aninag - Gallery Art, Previewed at Home | Filipino Contemporary Art Gallery';
        $description = 'Discover curated Filipino contemporary artworks with AR preview technology. Connect with premier galleries and artists. View art in your space before you buy.';
        $keywords = 'Filipino art, contemporary art Philippines, buy art online, art gallery Manila, Philippine artists, AR art preview, art collection';
        $url = url('/');
        $image = url('/images/og-home.jpg');
        
        $html = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- SEO Meta Tags -->
    <title>' . e($title) . '</title>
    <meta name="description" content="' . e($description) . '">
    <meta name="keywords" content="' . e($keywords) . '">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="' . e($url) . '">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="' . e($url) . '">
    <meta property="og:title" content="' . e($title) . '">
    <meta property="og:description" content="' . e($description) . '">
    <meta property="og:image" content="' . e($image) . '">
    <meta property="og:site_name" content="Aninag">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="' . e($url) . '">
    <meta name="twitter:title" content="' . e($title) . '">
    <meta name="twitter:description" content="' . e($description) . '">
    <meta name="twitter:image" content="' . e($image) . '">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Aninag",
        "url": "' . e($url) . '",
        "description": "' . e($description) . '",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "' . e(url('/catalog')) . '?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
        header { background: #1a1a1a; color: white; padding: 1rem 2rem; }
        header h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        header nav a { color: white; text-decoration: none; margin-right: 1.5rem; }
        main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .hero { text-align: center; padding: 3rem 0; }
        .hero h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
        .cta-button { display: inline-block; background: #1a1a1a; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 0.5rem; }
        .featured { margin-top: 3rem; }
        .featured h3 { font-size: 2rem; margin-bottom: 2rem; text-align: center; }
        .artwork-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
        .artwork-card { border: 1px solid #e0e0e0; border-radius: 0.5rem; overflow: hidden; text-decoration: none; color: inherit; display: block; }
        .artwork-card img { width: 100%; height: 300px; object-fit: cover; }
        .artwork-info { padding: 1rem; }
        .artwork-info h4 { font-size: 1.2rem; margin-bottom: 0.5rem; }
        .artwork-info p { color: #666; font-size: 0.9rem; margin: 0.25rem 0; }
        .features { margin-top: 4rem; text-align: center; padding: 3rem; background: #f9f9f9; border-radius: 0.5rem; }
        .features h3 { font-size: 2rem; margin-bottom: 2rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem; }
        .feature-item h4 { font-size: 1.3rem; margin-bottom: 0.5rem; }
        .feature-item p { color: #666; }
        footer { background: #f5f5f5; padding: 2rem; text-align: center; margin-top: 4rem; color: #666; }
    </style>
</head>
<body>
    <header>
        <h1>Aninag</h1>
        <nav>
            <a href="' . url('/') . '">Home</a>
            <a href="' . url('/catalog') . '">Catalog</a>
            <a href="' . url('/about') . '">About</a>
            <a href="' . url('/contact') . '">Contact</a>
        </nav>
    </header>

    <main>
        <section class="hero">
            <h2>Gallery Art, Previewed at Home</h2>
            <p>Discover curated Filipino contemporary artworks with AR preview technology</p>
            <a href="' . url('/catalog') . '" class="cta-button">Explore Collection</a>
        </section>

        <section class="featured">
            <h3>Featured Artworks</h3>
            <div class="artwork-grid">';
        
        foreach ($featuredArtworks as $artwork) {
            $html .= '<article class="artwork-card" itemscope itemtype="https://schema.org/Product">
                    <a href="' . url('/artwork/' . $artwork->slug) . '">';
            
            if ($artwork->primary_image_url) {
                $html .= '<img src="' . e($artwork->primary_image_url) . '" 
                             alt="' . e($artwork->title . ' by ' . $artwork->artist_name) . '"
                             itemprop="image">';
            }
            
            $html .= '<div class="artwork-info">
                            <h4 itemprop="name">' . e($artwork->title) . '</h4>
                            <p itemprop="creator" itemscope itemtype="https://schema.org/Person">
                                <span itemprop="name">' . e($artwork->artist_name) . '</span>
                            </p>
                            <p>' . e($artwork->medium) . '</p>
                            <p>' . e($artwork->year) . '</p>';
            
            if ($artwork->price) {
                $currency = $artwork->currency ?? 'PHP';
                $html .= '<p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                                <meta itemprop="price" content="' . e($artwork->price) . '">
                                <meta itemprop="priceCurrency" content="' . e($currency) . '">
                                ' . e($currency) . ' ' . number_format($artwork->price) . '
                            </p>';
            }
            
            $html .= '</div>
                    </a>
                </article>';
        }
        
        $html .= '</div>
        </section>

        <section class="features">
            <h3>Why Choose Aninag?</h3>
            <div class="features-grid">
                <div class="feature-item">
                    <h4>Curated Collection</h4>
                    <p>Carefully selected Filipino contemporary artworks from premier galleries</p>
                </div>
                <div class="feature-item">
                    <h4>AR Preview</h4>
                    <p>Visualize artworks in your space before making a purchase</p>
                </div>
                <div class="feature-item">
                    <h4>Expert Guidance</h4>
                    <p>Connect with galleries and receive personalized art advisory services</p>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; ' . date('Y') . ' Aninag. All rights reserved.</p>
        <p style="margin-top: 0.5rem;">Your trusted art advisor for Filipino contemporary art</p>
    </footer>
</body>
</html>';

        return response($html, 200, [
            'Content-Type' => 'text/html; charset=UTF-8',
            'X-Served-By' => 'Static-Crawler-Middleware',
        ]);
    }
}
