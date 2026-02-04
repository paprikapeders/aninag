<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeadInquiryReceived extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public array $inquiry,
        public array $viewedArtworks = []
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        // Extract last name from full name
        $name = $this->inquiry['name'] ?? 'Unknown';
        $nameParts = explode(' ', trim($name));
        $lastName = count($nameParts) > 1 ? end($nameParts) : $name;
        
        // Build subject with last name
        $type = $this->inquiry['type'] ?? 'General Contact';
        $subject = "New Inquiry - {$type} - {$lastName}";
        
        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.lead-inquiry',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
