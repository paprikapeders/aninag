<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- SEO Meta Tags for Aninag -->
        <meta name="description" content="Aninag - Your trusted art advisor connecting discerning collectors with exceptional contemporary artworks from premier galleries.">
        <meta name="keywords" content="art gallery, contemporary art, art advisor, buy art, art collection, Philippines art">
        <meta name="author" content="Aninag">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="@yield('title', 'Aninag - Discover Curated Contemporary Art')">
        <meta property="og:description" content="Your trusted art advisor connecting collectors with exceptional contemporary artworks.">
        <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="@yield('title', 'Aninag - Discover Curated Contemporary Art')">
        <meta property="twitter:description" content="Your trusted art advisor connecting collectors with exceptional contemporary artworks.">
        
        <!-- Favicon -->
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">

        <!-- Google Analytics 4 -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
                'send_page_view': true,
                'cookie_flags': 'SameSite=None;Secure'
            });

            // Enhanced measurement tracking
            gtag('event', 'page_view', {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': window.location.pathname
            });
        </script>

        <title inertia>{{ config('app.name', 'Aninag') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
