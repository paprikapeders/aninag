import { Share2, Facebook, Twitter, Mail } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ artwork, compact = false }) {
  const [showMenu, setShowMenu] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = `${artwork.title} by ${artwork.artist_name}`;
  const text = `Check out "${artwork.title}" by ${artwork.artist_name} at Aninag Gallery`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`,
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Share2 size={16} />
          Share
        </button>
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3"
              >
                <Facebook size={16} />
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3"
              >
                <Twitter size={16} />
                Twitter
              </button>
              <button
                onClick={() => handleShare('email')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3"
              >
                <Mail size={16} />
                Email
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Share:</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleShare('facebook')}
          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          title="Share on Facebook"
        >
          <Facebook size={16} />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          title="Share on Twitter"
        >
          <Twitter size={16} />
        </button>
        <button
          onClick={() => handleShare('email')}
          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          title="Share via Email"
        >
          <Mail size={16} />
        </button>
      </div>
    </div>
  );
}
