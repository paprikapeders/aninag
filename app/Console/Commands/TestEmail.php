<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\LeadInquiryReceived;

class TestEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email sending functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing email functionality...');
        
        $inquiryEmail = env('INQUIRY_EMAIL', config('mail.from.address'));
        $this->info("Sending test email to: {$inquiryEmail}");
        
        try {
            Mail::to($inquiryEmail)->send(
                new LeadInquiryReceived([
                    'type' => 'Test Email',
                    'artwork_title' => 'Sample Artwork Title',
                    'artist_name' => 'Test Artist',
                    'artwork_code' => 'TEST-001',
                    'price' => 50000,
                    'currency' => 'PHP',
                    'name' => 'Test User',
                    'email' => 'test@example.com',
                    'phone' => '+63 917 123 4567',
                    'message' => 'This is a test inquiry message to verify email functionality.',
                    'intent' => 'Personal Collection',
                ])
            );
            
            $this->info('✅ Test email sent successfully!');
            $this->info("Check your inbox at: {$inquiryEmail}");
            
        } catch (\Exception $e) {
            $this->error('❌ Failed to send test email');
            $this->error('Error: ' . $e->getMessage());
            return 1;
        }
        
        return 0;
    }
}
