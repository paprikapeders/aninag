import { useState, useRef, useEffect } from 'react';
import { X, RotateCw, ZoomIn, ZoomOut, Move, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { FallbackImage } from './ui/FallbackImage';

export function ARViewer({ artwork, isOpen, onClose }) {
  const [stream, setStream] = useState(null);
  const [mode, setMode] = useState('camera'); // 'camera' or 'upload'
  const [uploadedImage, setUploadedImage] = useState(null);
  const [artworkPosition, setArtworkPosition] = useState({ x: 50, y: 50 });
  const [artworkScale, setArtworkScale] = useState(0.4);
  const [artworkRotation, setArtworkRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'camera') {
        startCamera();
      } else {
        setIsLoading(false);
      }
    } else {
      stopCamera();
      setUploadedImage(null);
      setMode('camera');
    }

    return () => stopCamera();
  }, [isOpen, mode]);

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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const switchMode = (newMode) => {
    stopCamera();
    setUploadedImage(null);
    setIsLoading(true);
    setMode(newMode);
    resetPosition();
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
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {/* Mode Toggle Buttons */}
              <button
                onClick={() => switchMode('camera')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === 'camera'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm'
                }`}
                title="Live Camera"
              >
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Camera</span>
              </button>
              <button
                onClick={() => switchMode('upload')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === 'upload'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm'
                }`}
                title="Upload Photo"
              >
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </button>
              {/* Change Photo Button - Only show when in upload mode with an image */}
              {mode === 'upload' && uploadedImage && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
                  title="Change Photo"
                >
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Change</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Video Background */}
        {mode === 'camera' && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Uploaded Image Background */}
        {mode === 'upload' && uploadedImage && (
          <img
            src={uploadedImage}
            alt="Your room"
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        )}

        {/* Upload Prompt */}
        {mode === 'upload' && !uploadedImage && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="text-center text-white space-y-6 max-w-md px-6">
              <div className="w-20 h-20 mx-auto bg-[#0A7A7A]/20 rounded-full flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-[#0A7A7A]" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-medium">Upload Your Room Photo</p>
                <p className="text-sm text-white/70">
                  Choose a photo of your wall where you'd like to see the artwork
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-4 bg-[#0A7A7A] hover:bg-[#086060] rounded-lg transition-all font-medium flex items-center gap-3 mx-auto"
              >
                <Upload size={20} />
                Choose Photo
              </button>
              <button
                onClick={() => switchMode('camera')}
                className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 mx-auto"
              >
                <Camera size={16} />
                Use Camera Instead
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !cameraError && mode === 'camera' && (
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

        {/* Artwork Overlay - Only show when camera is ready OR image is uploaded */}
        {((!isLoading && !cameraError && mode === 'camera') || (mode === 'upload' && uploadedImage)) && (
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
              <FallbackImage
                src={artwork.primary_image_url || artwork.image_url}
                fallback="/images/placeholder.svg"
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
        {((!isLoading && !cameraError && mode === 'camera') || (mode === 'upload' && uploadedImage)) && (
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
