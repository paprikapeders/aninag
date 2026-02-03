<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- Dynamic SEO Meta Tags -->
        @inertiaHead
        
        <!-- Fallback Meta Tags for Aninag -->
        <meta name="description" content="Aninag - Your trusted art advisor connecting discerning collectors with exceptional Filipino contemporary artworks from premier galleries.">
        <meta name="keywords" content="Filipino art, contemporary art Philippines, art gallery Manila, buy art online, art collection, Philippine artists">
        <meta name="author" content="Aninag Collective">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ url()->current() }}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="Aninag">
        <meta property="og:locale" content="en_PH">
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@aninagcollective">
        <meta name="twitter:creator" content="@aninagcollective">
        
        <!-- Favicons -->
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Google Analytics 4 -->
        @if(config('services.google_analytics.id'))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('services.google_analytics.id') }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            window.GA_MEASUREMENT_ID = '{{ config('services.google_analytics.id') }}';
            
            // Detect device type
            function getDeviceType() {
                const ua = navigator.userAgent;
                if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                    return "Tablet";
                }
                if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                    return "Mobile";
                }
                return "Desktop";
            }
            
            // Get browser information
            function getBrowserInfo() {
                const ua = navigator.userAgent;
                let browser = "Unknown";
                if (ua.indexOf("Firefox") > -1) browser = "Firefox";
                else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
                else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
                else if (ua.indexOf("Trident") > -1) browser = "Internet Explorer";
                else if (ua.indexOf("Edge") > -1) browser = "Edge";
                else if (ua.indexOf("Chrome") > -1) browser = "Chrome";
                else if (ua.indexOf("Safari") > -1) browser = "Safari";
                return browser;
            }
            
            // Get operating system
            function getOS() {
                const ua = navigator.userAgent;
                if (ua.indexOf("Win") > -1) return "Windows";
                if (ua.indexOf("Mac") > -1) return "MacOS";
                if (ua.indexOf("Linux") > -1) return "Linux";
                if (ua.indexOf("Android") > -1) return "Android";
                if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) return "iOS";
                return "Unknown";
            }
            
            // Store device info for use in other tracking events
            window.deviceInfo = {
                device_type: getDeviceType(),
                browser: getBrowserInfo(),
                operating_system: getOS(),
                screen_resolution: window.screen.width + 'x' + window.screen.height,
                viewport_size: window.innerWidth + 'x' + window.innerHeight,
                user_agent: navigator.userAgent
            };
            
            gtag('config', window.GA_MEASUREMENT_ID, {
                'send_page_view': true,
                'cookie_flags': 'SameSite=None;Secure',
                'custom_map': {
                    'dimension1': 'device_type',
                    'dimension2': 'browser',
                    'dimension3': 'operating_system'
                }
            });

            // Enhanced measurement tracking with device info
            gtag('event', 'page_view', {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': window.location.pathname,
                'device_type': window.deviceInfo.device_type,
                'browser': window.deviceInfo.browser,
                'operating_system': window.deviceInfo.operating_system,
                'screen_resolution': window.deviceInfo.screen_resolution,
                'viewport_size': window.deviceInfo.viewport_size
            });
            
            // Track user session with device details
            gtag('event', 'session_start', {
                'device_type': window.deviceInfo.device_type,
                'browser': window.deviceInfo.browser,
                'operating_system': window.deviceInfo.operating_system,
                'user_agent': window.deviceInfo.user_agent
            });
        </script>
        @endif

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
