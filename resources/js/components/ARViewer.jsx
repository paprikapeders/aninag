import { useState, useRef, useEffect } from 'react';
import { X, RotateCw, ZoomIn, ZoomOut, Move, Camera } from 'lucide-react';

export function ARViewer({ artwork, isOpen, onClose }) {
  const [stream, setStream] = useState(null);
  const [artworkPosition, setArtworkPosition] = useState({ x: 50, y: 50 });
  const [artworkScale, setArtworkScale] = useState(0.4);
  const [artworkRotation, setArtworkRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setIsLoading(true);
    setCameraError(null);
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 }, 
          height: { ideal: 1080 } 
        },
        audio: false
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false);
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsLoading(false);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraError('Camera permission denied. Please enable camera access in your browser settings.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('No camera found on this device.');
      } else {
        setCameraError('Unable to access camera. Please try again or use a different device.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    setDragStart({
      x: e.clientX - (artworkPosition.x * rect.width / 100),
      y: e.clientY - (artworkPosition.y * rect.height / 100)
    });
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    setDragStart({
      x: touch.clientX - (artworkPosition.x * rect.width / 100),
      y: touch.clientY - (artworkPosition.y * rect.height / 100)
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - dragStart.x) / rect.width) * 100;
    const y = ((e.clientY - dragStart.y) / rect.height) * 100;

    setArtworkPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((touch.clientX - dragStart.x) / rect.width) * 100;
    const y = ((touch.clientY - dragStart.y) / rect.height) * 100;

    setArtworkPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const zoomIn = () => setArtworkScale(prev => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setArtworkScale(prev => Math.max(prev - 0.1, 0.15));
  const rotate = () => setArtworkRotation(prev => (prev + 90) % 360);
  const resetPosition = () => {
    setArtworkPosition({ x: 50, y: 50 });
    setArtworkScale(0.4);
    setArtworkRotation(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Camera Feed Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Loading State */}
        {isLoading && !cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center text-white space-y-4">
              <Camera className="w-16 h-16 mx-auto animate-pulse" />
              <p className="text-lg">Accessing camera...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="text-center text-white space-y-4 max-w-md px-6">
              <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-lg font-medium">Camera Access Error</p>
              <p className="text-sm text-white/70">{cameraError}</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Artwork Overlay - Only show when camera is ready */}
        {!isLoading && !cameraError && (
          <div
            className="absolute cursor-move touch-none transition-transform active:scale-105"
            style={{
              left: `${artworkPosition.x}%`,
              top: `${artworkPosition.y}%`,
              transform: `translate(-50%, -50%) scale(${artworkScale}) rotate(${artworkRotation}deg)`,
              transformOrigin: 'center center',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Artwork Image with Shadow */}
            <div className="relative">
              <img
                src={artwork.primary_image_url || artwork.image_url}
                alt={artwork.title}
                className="pointer-events-none shadow-2xl max-w-[70vw] max-h-[70vh] object-contain"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.6))',
                }}
                draggable={false}
              />
              
              {/* Drag Indicator Border */}
              {isDragging && (
                <div className="absolute inset-0 border-4 border-white/50 rounded pointer-events-none animate-pulse" />
              )}
              
              {/* Move Icon Hint */}
              {!isDragging && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-black/70 rounded-full p-3">
                    <Move className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions Overlay - Only show when ready */}
        {!isLoading && !cameraError && (
          <div className="absolute top-24 left-0 right-0 text-center px-4 pointer-events-none animate-fade-in">
            <div className="inline-block bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-md shadow-lg">
              <p className="font-medium">Drag to move • Use controls to adjust</p>
            </div>
          </div>
        )}
      </div>

      {/* Control Panel - Bottom */}
      {!isLoading && !cameraError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-safe">
          <div className="container mx-auto max-w-4xl">
            {/* Controls Grid */}
            <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
              <button
                onClick={zoomOut}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-4 rounded-full transition-all shadow-lg"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <button
                onClick={zoomIn}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-4 rounded-full transition-all shadow-lg"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <button
                onClick={rotate}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-4 rounded-full transition-all shadow-lg"
                title="Rotate 90°"
              >
                <RotateCw className="w-5 h-5" />
              </button>

              <button
                onClick={resetPosition}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white px-6 py-4 rounded-full transition-all shadow-lg text-sm font-medium"
              >
                Reset
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full bg-red-500/90 backdrop-blur-md hover:bg-red-600 active:scale-95 text-white py-4 rounded-full transition-all shadow-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Exit AR View
            </button>

            {/* Artwork Info */}
            <div className="text-center mt-4 text-white/90">
              <p className="text-sm font-medium">{artwork.title}</p>
              <p className="text-xs text-white/60">{artwork.artist_name} • {artwork.size}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent p-4 pt-safe">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-base font-semibold">AR View</p>
              <p className="text-xs text-white/70">Position artwork in your space</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-2 rounded-full transition-all shadow-lg"
              aria-label="Close AR View"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
