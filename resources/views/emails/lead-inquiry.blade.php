<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #0A7A7A;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-top: none;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .inquiry-type {
            display: inline-block;
            background-color: #0A7A7A;
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            text-transform: capitalize;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-weight: 600;
            color: #0A7A7A;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .section-content {
            background-color: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        .field {
            margin-bottom: 12px;
        }
        .field-label {
            font-weight: 600;
            color: #666;
            font-size: 13px;
            margin-bottom: 4px;
        }
        .field-value {
            color: #333;
            font-size: 15px;
        }
        .artwork-item {
            padding: 12px;
            background-color: white;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            margin-bottom: 10px;
        }
        .artwork-title {
            font-weight: 600;
            color: #333;
            font-size: 15px;
        }
        .artwork-artist {
            color: #666;
            font-size: 14px;
            font-style: italic;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #999;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎨 New Inquiry from Aninag</h1>
    </div>

    <div class="content">
        <span class="inquiry-type">{{ $inquiry['type'] ?? 'General' }}</span>

        <!-- Contact Information -->
        <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="section-content">
                <div class="field">
                    <div class="field-label">Name</div>
                    <div class="field-value">{{ $inquiry['name'] }}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value">
                        <a href="mailto:{{ $inquiry['email'] }}" style="color: #0A7A7A; text-decoration: none;">
                            {{ $inquiry['email'] }}
                        </a>
                    </div>
                </div>
                @if(!empty($inquiry['phone']))
                <div class="field">
                    <div class="field-label">Phone</div>
                    <div class="field-value">{{ $inquiry['phone'] }}</div>
                </div>
                @endif
            </div>
        </div>

        <!-- Artwork Interest -->
        @if(!empty($inquiry['artwork_title']))
        <div class="section">
            <div class="section-title">Interested Artwork</div>
            <div class="section-content">
                <div class="artwork-title">{{ $inquiry['artwork_title'] }}</div>
                @if(!empty($inquiry['artist_name']))
                <div class="artwork-artist">by {{ $inquiry['artist_name'] }}</div>
                @endif
            </div>
        </div>
        @endif

        <!-- Message -->
        @if(!empty($inquiry['message']))
        <div class="section">
            <div class="section-title">Message</div>
            <div class="section-content">
                <div class="field-value">{{ $inquiry['message'] }}</div>
            </div>
        </div>
        @endif

        <!-- Viewed Artworks -->
        @if(!empty($viewedArtworks) && count($viewedArtworks) > 0)
        <div class="section">
            <div class="section-title">Recently Viewed Artworks ({{ count($viewedArtworks) }})</div>
            <div class="section-content">
                <p style="color: #666; font-size: 13px; margin-top: 0; margin-bottom: 15px;">
                    The visitor browsed these artworks during their session:
                </p>
                @foreach($viewedArtworks as $artwork)
                <div class="artwork-item">
                    <div class="artwork-title">{{ $artwork['title'] }}</div>
                    <div class="artwork-artist">by {{ $artwork['artist_name'] }}</div>
                    @if(!empty($artwork['medium']))
                    <div style="color: #999; font-size: 13px; margin-top: 4px;">
                        {{ $artwork['medium'] }} • {{ $artwork['year'] }}
                    </div>
                    @endif
                </div>
                @endforeach
            </div>
        </div>
        @endif

        <div class="footer">
            <p>This inquiry was submitted through the Aninag website on {{ date('F j, Y \a\t g:i A') }}</p>
            <p style="margin-top: 10px;">
                <strong>Aninag Gallery</strong><br>
                Contemporary Art Collection
            </p>
        </div>
    </div>
</body>
</html>
