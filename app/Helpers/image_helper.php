<?php

if (!function_exists('proxy_image_url')) {
    /**
     * Convert a Notion image URL to a proxied URL
     */
    function proxy_image_url(?string $url): ?string
    {
        if (empty($url)) {
            return null;
        }

        // If it's already a local URL, return as is
        if (str_starts_with($url, '/') || str_starts_with($url, config('app.url'))) {
            return $url;
        }

        // If it's a Notion or AWS S3 URL, proxy it
        if (str_contains($url, 'notion.so') || str_contains($url, 'notion.site') || str_contains($url, 'amazonaws.com')) {
            return route('image.proxy') . '?url=' . urlencode($url);
        }

        return $url;
    }
}
