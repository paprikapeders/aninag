<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecaptchaService
{
    /**
     * Verify reCAPTCHA token
     *
     * @param string $token
     * @param string|null $remoteIp
     * @return bool
     */
    public static function verify(string $token, ?string $remoteIp = null): bool
    {
        $secretKey = config('services.recaptcha.secret_key');

        if (empty($secretKey)) {
            Log::warning('reCAPTCHA secret key not configured');
            return true; // Allow if not configured (development)
        }

        if (empty($token)) {
            return false;
        }

        try {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $secretKey,
                'response' => $token,
                'remoteip' => $remoteIp ?? request()->ip(),
            ]);

            if (!$response->successful()) {
                Log::error('reCAPTCHA verification failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return false;
            }

            $result = $response->json();

            if (!isset($result['success'])) {
                Log::error('reCAPTCHA response missing success field', ['result' => $result]);
                return false;
            }

            if (!$result['success']) {
                Log::warning('reCAPTCHA verification unsuccessful', [
                    'error-codes' => $result['error-codes'] ?? [],
                ]);
            }

            return $result['success'];
        } catch (\Exception $e) {
            Log::error('reCAPTCHA verification exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return false;
        }
    }
}
