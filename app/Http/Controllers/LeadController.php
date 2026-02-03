<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use App\Models\Lead;
use App\Mail\LeadInquiryReceived;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Aninag Lead Controller
 * Handles buyer inquiries and lead submission
 */
class LeadController extends Controller
{
    /**
     * Store a new buyer inquiry
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'artwork_id' => ['required', 'exists:artworks,id'],
            'buyer_name' => ['required', 'string', 'max:255'],
            'buyer_email' => ['required', 'email', 'max:255'],
            'buyer_phone' => ['nullable', 'string', 'max:50'],
            'intent' => ['required', Rule::in(['personal', 'gift', 'corporate'])],
            'message' => ['nullable', 'string', 'max:1000'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Verify artwork is available
        $artwork = Artwork::findOrFail($request->artwork_id);
        
        if (!$artwork->isAvailable()) {
            return back()->with('error', 'This artwork is no longer available for inquiry.');
        }

        // Create lead
        $lead = Lead::create([
            'artwork_id' => $request->artwork_id,
            'buyer_name' => $request->buyer_name,
            'buyer_email' => $request->buyer_email,
            'buyer_phone' => $request->buyer_phone,
            'intent' => $request->intent,
            'message' => $request->message,
            'lead_status' => 'new',
            'source' => 'web',
        ]);

        // Send notification email to inquiry email
        try {
            $inquiryEmail = env('INQUIRY_EMAIL', config('mail.from.address'));
            Mail::to($inquiryEmail)->send(
                new LeadInquiryReceived([
                    'type' => 'Reserve - ' . ucfirst($request->intent),
                    'artwork_title' => $artwork->title,
                    'artist_name' => $artwork->artist->name,
                    'artwork_code' => $artwork->artwork_code,
                    'price' => $artwork->price,
                    'currency' => $artwork->currency,
                    'name' => $request->buyer_name,
                    'email' => $request->buyer_email,
                    'phone' => $request->buyer_phone,
                    'message' => $request->message,
                    'intent' => ucfirst($request->intent),
                ], session()->get('viewed_artworks', []))
            );
        } catch (\Exception $e) {
            \Log::error('Failed to send lead notification email: ' . $e->getMessage());
        }

        return redirect()->route('inquiry.confirmation', ['lead' => $lead->id]);
    }

    /**
     * Display inquiry confirmation page
     */
    public function confirmation(Request $request, Lead $lead = null): Response
    {
        // Handle direct POST from new frontend (Contact Form)
        if ($request->isMethod('post')) {
            $inquiry = $request->only(['type', 'artwork_id', 'artwork_slug', 'artwork_title', 'artwork_code', 'artist_name', 'price', 'currency', 'medium', 'name', 'email', 'phone', 'message']);
            
            // Store inquiry data in session for page refresh
            session(['last_inquiry' => $inquiry]);
            
            // Send notification email to inquiry email
            try {
                $inquiryEmail = env('INQUIRY_EMAIL', config('mail.from.address'));
                Mail::to($inquiryEmail)->send(
                    new LeadInquiryReceived($inquiry, session()->get('viewed_artworks', []))
                );
            } catch (\Exception $e) {
                \Log::error('Failed to send inquiry notification email: ' . $e->getMessage());
            }
            
            return Inertia::render('Confirmation', [
                'inquiry' => $inquiry,
            ]);
        }
        
        // Handle page refresh - get from session
        if (!$lead && session()->has('last_inquiry')) {
            return Inertia::render('Confirmation', [
                'inquiry' => session('last_inquiry'),
            ]);
        }
        
        // Handle old route with Lead model
        if ($lead) {
            $lead->load(['artwork.artist']);

            $inquiry = [
                'type' => 'inquiry',
                'artwork_slug' => $lead->artwork->slug,
                'artwork_title' => $lead->artwork->title,
                'artwork_code' => $lead->artwork->artwork_code,
                'artist_name' => $lead->artwork->artist->name,
                'price' => $lead->artwork->price,
                'currency' => $lead->artwork->currency,
                'name' => $lead->buyer_name,
                'email' => $lead->buyer_email,
                'phone' => $lead->buyer_phone,
                'message' => $lead->message,
            ];
            
            session(['last_inquiry' => $inquiry]);

            return Inertia::render('Confirmation', [
                'inquiry' => $inquiry,
            ]);
        }

        abort(404);
    }
}
