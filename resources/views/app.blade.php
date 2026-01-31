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
