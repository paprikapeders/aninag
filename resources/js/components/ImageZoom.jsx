import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

export function ImageZoom({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <>
      <div 
        className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden cursor-zoom-in group"
        onClick={() => setIsZoomed(true)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 rounded-full p-3">
            <ZoomIn size={24} className="text-foreground" />
          </div>
        </div>
      </div>

      {/* Zoomed Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={24} />
          </button>
          
          <div 
            className="relative max-w-7xl max-h-full overflow-hidden cursor-zoom-out"
            onMouseMove={handleMouseMove}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain"
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            Click anywhere to close
          </div>
        </div>
      )}
    </>
  );
}
