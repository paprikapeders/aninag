<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display the about page
     */
    public function index()
    {
        return Inertia::render('About', [
            'meta' => [
                'title' => 'About Aninag - Your Trusted Filipino Art Advisor',
                'description' => 'Learn about Aninag Collective, your trusted Filipino art advisor connecting collectors with exceptional contemporary artworks. Discover our mission, values, and AR technology.',
                'keywords' => 'about Aninag, Filipino art advisor, contemporary art Philippines, art collection service, AR art preview',
                'url' => url('/about'),
                'image' => asset('images/og-about.jpg'),
            ],
        ]);
    }
}
