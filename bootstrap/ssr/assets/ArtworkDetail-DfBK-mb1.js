import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Head, Link as Link$1, router } from "@inertiajs/react";
import { t as trackARModeSwitch, a as trackARImageUpload, H as Header, D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, L as Label, I as Input, T as Textarea, e as trackArtworkClick, f as trackARViewerOpen, g as trackArtworkReservation } from "./Header-CC0kzd-H.js";
import { F as Footer, S as ScrollToTop } from "./ScrollToTop-CYqGEMpv.js";
import { F as FallbackImage, W as WishlistButton } from "./FallbackImage-BnNSCpnd.js";
import { Share2, Facebook, Twitter, Mail, Link, ZoomIn, X, Camera, Image, Upload, Move, ZoomOut, RotateCw, Home, ChevronRight, TrendingUp, Eye, Award, Shield, CheckCircle2, Heart } from "lucide-react";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function ShareButtons({ artwork, compact = false }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = `${artwork.title} by ${artwork.artist_name}`;
  const text = `Check out "${artwork.title}" by ${artwork.artist_name} at Aninag Gallery`;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + " " + url)}`
  };
  const handleShare = (platform) => {
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } else {
      window.open(shareLinks[platform], "_blank", "width=600,height=400");
    }
    setShowMenu(false);
  };
  if (compact) {
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setShowMenu(!showMenu),
          className: "inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors",
          children: [
            /* @__PURE__ */ jsx(Share2, { size: 16 }),
            "Share"
          ]
        }
      ),
      showMenu && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 z-40",
            onClick: () => setShowMenu(false)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleShare("facebook"),
              className: "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx(Facebook, { size: 16 }),
                "Facebook"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleShare("twitter"),
              className: "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx(Twitter, { size: 16 }),
                "Twitter"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleShare("email"),
              className: "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx(Mail, { size: 16 }),
                "Email"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleShare("copy"),
              className: "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx(Link, { size: 16 }),
                copied ? "Copied!" : "Copy Link"
              ]
            }
          )
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Share:" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleShare("facebook"),
          className: "w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors",
          title: "Share on Facebook",
          children: /* @__PURE__ */ jsx(Facebook, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleShare("twitter"),
          className: "w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors",
          title: "Share on Twitter",
          children: /* @__PURE__ */ jsx(Twitter, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleShare("email"),
          className: "w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors",
          title: "Share via Email",
          children: /* @__PURE__ */ jsx(Mail, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleShare("copy"),
          className: "w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors",
          title: copied ? "Copied!" : "Copy Link",
          children: /* @__PURE__ */ jsx(Link, { size: 16 })
        }
      )
    ] })
  ] });
}
function ImageZoom({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    setMousePosition({ x, y });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative aspect-[4/5] bg-muted rounded-lg overflow-hidden cursor-zoom-in group",
        onClick: () => setIsZoomed(true),
        onMouseMove: handleMouseMove,
        children: [
          /* @__PURE__ */ jsx(
            FallbackImage,
            {
              src,
              fallback: "/images/placeholder.svg",
              alt,
              className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 rounded-full p-3", children: /* @__PURE__ */ jsx(ZoomIn, { size: 24, className: "text-foreground" }) }) })
        ]
      }
    ),
    isZoomed && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4",
        onClick: () => setIsZoomed(false),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsZoomed(false),
              className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10",
              children: /* @__PURE__ */ jsx(X, { size: 24 })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "relative max-w-7xl max-h-full overflow-hidden cursor-zoom-out",
              onMouseMove: handleMouseMove,
              children: /* @__PURE__ */ jsx(
                FallbackImage,
                {
                  src,
                  fallback: "/images/placeholder.svg",
                  alt,
                  className: "max-w-full max-h-[90vh] object-contain",
                  style: {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full", children: "Click anywhere to close" })
        ]
      }
    )
  ] });
}
function ARViewer({ artwork, isOpen, onClose }) {
  const [stream, setStream] = useState(null);
  const [mode, setMode] = useState("camera");
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
      if (mode === "camera") {
        startCamera();
      } else {
        setIsLoading(false);
      }
    } else {
      stopCamera();
      setUploadedImage(null);
      setMode("camera");
    }
    return () => stopCamera();
  }, [isOpen, mode]);
  const startCamera = async () => {
    setIsLoading(true);
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
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
      console.error("Error accessing camera:", error);
      setIsLoading(false);
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setCameraError("Camera permission denied. Please enable camera access in your browser settings.");
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        setCameraError("No camera found on this device.");
      } else {
        setCameraError("Unable to access camera. Please try again or use a different device.");
      }
    }
  };
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setIsLoading(false);
        trackARImageUpload();
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
    trackARModeSwitch(newMode);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setDragStart({
      x: e.clientX - artworkPosition.x * rect.width / 100,
      y: e.clientY - artworkPosition.y * rect.height / 100
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
      x: touch.clientX - artworkPosition.x * rect.width / 100,
      y: touch.clientY - artworkPosition.y * rect.height / 100
    });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - dragStart.x) / rect.width * 100;
    const y = (e.clientY - dragStart.y) / rect.height * 100;
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
    const x = (touch.clientX - dragStart.x) / rect.width * 100;
    const y = (touch.clientY - dragStart.y) / rect.height * 100;
    setArtworkPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    });
  };
  const handleMouseUp = () => setIsDragging(false);
  const zoomIn = () => setArtworkScale((prev) => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setArtworkScale((prev) => Math.max(prev - 0.1, 0.15));
  const rotate = () => setArtworkRotation((prev) => (prev + 90) % 360);
  const resetPosition = () => {
    setArtworkPosition({ x: 50, y: 50 });
    setArtworkScale(0.4);
    setArtworkRotation(0);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] bg-black", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: containerRef,
        className: "relative w-full h-full overflow-hidden select-none",
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleMouseUp,
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/50 to-transparent", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => switchMode("camera"),
                className: `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === "camera" ? "bg-white text-gray-900 shadow-lg" : "bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"}`,
                title: "Live Camera",
                children: [
                  /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Camera" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => switchMode("upload"),
                className: `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === "upload" ? "bg-white text-gray-900 shadow-lg" : "bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"}`,
                title: "Upload Photo",
                children: [
                  /* @__PURE__ */ jsx(Image, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Upload" })
                ]
              }
            ),
            mode === "upload" && uploadedImage && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => fileInputRef.current?.click(),
                className: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all",
                title: "Change Photo",
                children: [
                  /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Change" })
                ]
              }
            )
          ] }) }) }),
          mode === "camera" && /* @__PURE__ */ jsx(
            "video",
            {
              ref: videoRef,
              autoPlay: true,
              playsInline: true,
              muted: true,
              className: "absolute inset-0 w-full h-full object-cover"
            }
          ),
          mode === "upload" && uploadedImage && /* @__PURE__ */ jsx(
            "img",
            {
              src: uploadedImage,
              alt: "Your room",
              className: "absolute inset-0 w-full h-full object-contain bg-black"
            }
          ),
          mode === "upload" && !uploadedImage && !isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-white space-y-6 max-w-md px-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto bg-[#0A7A7A]/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Image, { className: "w-10 h-10 text-[#0A7A7A]" }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xl font-medium", children: "Upload Your Room Photo" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: "Choose a photo of your wall where you'd like to see the artwork" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                onChange: handleImageUpload,
                className: "hidden"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => fileInputRef.current?.click(),
                className: "px-8 py-4 bg-[#0A7A7A] hover:bg-[#086060] rounded-lg transition-all font-medium flex items-center gap-3 mx-auto",
                children: [
                  /* @__PURE__ */ jsx(Upload, { size: 20 }),
                  "Choose Photo"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => switchMode("camera"),
                className: "text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 mx-auto",
                children: [
                  /* @__PURE__ */ jsx(Camera, { size: 16 }),
                  "Use Camera Instead"
                ]
              }
            )
          ] }) }),
          isLoading && !cameraError && mode === "camera" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-white space-y-4", children: [
            /* @__PURE__ */ jsx(Camera, { className: "w-16 h-16 mx-auto animate-pulse" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Accessing camera..." })
          ] }) }),
          cameraError && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-white space-y-4 max-w-md px-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(X, { className: "w-8 h-8 text-red-500" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Camera Access Error" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: cameraError }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors",
                children: "Close"
              }
            )
          ] }) }),
          (!isLoading && !cameraError && mode === "camera" || mode === "upload" && uploadedImage) && /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute cursor-move touch-none transition-transform active:scale-105",
              style: {
                left: `${artworkPosition.x}%`,
                top: `${artworkPosition.y}%`,
                transform: `translate(-50%, -50%) scale(${artworkScale}) rotate(${artworkRotation}deg)`,
                transformOrigin: "center center"
              },
              onMouseDown: handleMouseDown,
              onTouchStart: handleTouchStart,
              children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  FallbackImage,
                  {
                    src: artwork.primary_image_url || artwork.image_url,
                    fallback: "/images/placeholder.svg",
                    alt: artwork.title,
                    className: "pointer-events-none shadow-2xl max-w-[70vw] max-h-[70vh] object-contain",
                    style: {
                      filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.6))"
                    },
                    draggable: false
                  }
                ),
                isDragging && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-4 border-white/50 rounded pointer-events-none animate-pulse" }),
                !isDragging && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx("div", { className: "bg-black/70 rounded-full p-3", children: /* @__PURE__ */ jsx(Move, { className: "w-6 h-6 text-white" }) }) })
              ] })
            }
          ),
          (!isLoading && !cameraError && mode === "camera" || mode === "upload" && uploadedImage) && /* @__PURE__ */ jsx("div", { className: "absolute top-24 left-0 right-0 text-center px-4 pointer-events-none animate-fade-in", children: /* @__PURE__ */ jsx("div", { className: "inline-block bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-md shadow-lg", children: /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Drag to move • Use controls to adjust" }) }) })
        ]
      }
    ),
    !isLoading && !cameraError && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-safe", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 flex-wrap mb-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: zoomOut,
            className: "bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-4 rounded-full transition-all shadow-lg",
            title: "Zoom Out",
            children: /* @__PURE__ */ jsx(ZoomOut, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: zoomIn,
            className: "bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-4 rounded-full transition-all shadow-lg",
            title: "Zoom In",
            children: /* @__PURE__ */ jsx(ZoomIn, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: rotate,
            className: "bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-4 rounded-full transition-all shadow-lg",
            title: "Rotate 90°",
            children: /* @__PURE__ */ jsx(RotateCw, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: resetPosition,
            className: "bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white px-6 py-4 rounded-full transition-all shadow-lg text-sm font-medium",
            children: "Reset"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onClose,
          className: "w-full bg-red-500/90 backdrop-blur-md hover:bg-red-600 active:scale-95 text-white py-4 rounded-full transition-all shadow-lg text-sm font-medium flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }),
            "Exit AR View"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center mt-4 text-white/90", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: artwork.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/60", children: [
          artwork.artist_name,
          " • ",
          artwork.size
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent p-4 pt-safe", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-4xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
        /* @__PURE__ */ jsx("p", { className: "text-base font-semibold", children: "AR View" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: "Position artwork in your space" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 text-white p-2 rounded-full transition-all shadow-lg",
          "aria-label": "Close AR View",
          children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
        }
      )
    ] }) }) })
  ] });
}
function ArtworkDetail({ artwork, similarArtworks = [] }) {
  const [inquiryType, setInquiryType] = useState(null);
  const [showAR, setShowAR] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const handleAROpen = () => {
    setShowAR(true);
    trackARViewerOpen(artwork);
  };
  const handleReserveClick = () => {
    setInquiryType("reservation");
    trackArtworkReservation(artwork);
  };
  if (!artwork) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Head, { title: "Artwork Not Found - Aninag" }),
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8 py-20 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl mb-4", children: "Artwork Not Found" }),
        /* @__PURE__ */ jsx(Link$1, { href: "/catalog", className: "text-[#0A7A7A] hover:underline", children: "Return to Catalog" })
      ] })
    ] });
  }
  const handleOpenDialog = (type) => {
    setInquiryType(type);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.visit("/confirmation", {
      method: "post",
      data: {
        type: inquiryType,
        artwork_id: artwork.id,
        artwork_slug: artwork.slug,
        artwork_title: artwork.title,
        artwork_code: artwork.artwork_code,
        artist_name: artwork.artist_name,
        price: artwork.price,
        currency: artwork.currency,
        medium: artwork.medium,
        ...formData
      }
    });
  };
  const getDialogTitle = () => {
    switch (inquiryType) {
      case "reserve":
        return "Reserve This Artwork";
      case "viewing":
        return "Book a Private Viewing";
      case "corporate":
        return "Corporate Inquiry";
      default:
        return "Inquiry";
    }
  };
  const getDialogDescription = () => {
    switch (inquiryType) {
      case "reserve":
        return "Express your interest to reserve this artwork. Our team will contact you to discuss next steps.";
      case "viewing":
        return "Schedule a private viewing at the gallery. We'll coordinate a time that works for you.";
      case "corporate":
        return "Interested in this piece for your corporate collection? Let us know your requirements.";
      default:
        return "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", style: { background: "linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)" }, children: [
    /* @__PURE__ */ jsx(Head, { title: `${artwork.title}` }),
    /* @__PURE__ */ jsx(Header, { currentPath: "/artwork" }),
    /* @__PURE__ */ jsx(
      ARViewer,
      {
        artwork,
        isOpen: showAR,
        onClose: () => setShowAR(false)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12", children: [
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 lg:mb-8 overflow-x-auto whitespace-nowrap", children: [
        /* @__PURE__ */ jsxs(Link$1, { href: "/", className: "hover:text-[#0A7A7A] transition-colors flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Home, { size: 14 }),
          "Home"
        ] }),
        /* @__PURE__ */ jsx(ChevronRight, { size: 14 }),
        /* @__PURE__ */ jsx(Link$1, { href: "/catalog", className: "hover:text-[#0A7A7A] transition-colors", children: "Collection" }),
        /* @__PURE__ */ jsx(ChevronRight, { size: 14 }),
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: artwork.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              ImageZoom,
              {
                src: artwork.primary_image_url || artwork.image_url,
                alt: artwork.title
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ jsx(WishlistButton, { artworkId: artwork.id }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleAROpen(),
              className: "w-full py-3 sm:py-3.5 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base",
              children: [
                /* @__PURE__ */ jsx(Camera, { size: 18, className: "sm:w-5 sm:h-5" }),
                "View in Your Space (AR)"
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-muted-foreground px-2", children: "See how this artwork looks on your wall using your camera" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 sm:space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A7A7A]/10 text-[#0A7A7A] rounded-full text-xs font-medium", children: [
              /* @__PURE__ */ jsx(TrendingUp, { size: 14 }),
              "Popular"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs", children: [
              /* @__PURE__ */ jsx(Eye, { size: 14 }),
              "Recently Viewed"
            ] }),
            artwork.price >= 1e5 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-xs font-medium", children: [
              /* @__PURE__ */ jsx(Award, { size: 14 }),
              "Premium Collection"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground border-l-2 border-[#0A7A7A] pl-3 sm:pl-4 py-2 sm:py-3 bg-gradient-to-r from-[#0A7A7A]/10 to-transparent rounded-r-lg", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Shield, { size: 16, className: "text-[#0A7A7A]" }),
              "Authenticity Guaranteed"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 16, className: "text-[#0A7A7A]" }),
              "Verified Gallery"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-3 sm:gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-2", children: artwork.title }),
            /* @__PURE__ */ jsx(
              Link$1,
              {
                href: `/catalog?artist=${encodeURIComponent(artwork.artist_name)}`,
                className: "text-base sm:text-lg lg:text-xl text-muted-foreground hover:text-[#0A7A7A] transition-colors",
                children: artwork.artist_name
              }
            )
          ] }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-md border border-border", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide", children: "Specifications" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mb-1", children: "Medium" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base lg:text-lg", children: artwork.medium })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mb-1", children: "Year" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base lg:text-lg", children: artwork.year })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mb-1", children: "Dimensions" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base lg:text-lg", children: artwork.size })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mb-1", children: "Gallery" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base lg:text-lg", children: artwork.gallery_name || "Modern Arts Gallery" })
              ] })
            ] })
          ] }),
          artwork.artist_bio && /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-4 sm:pt-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium mb-2 sm:mb-3", children: "About the Artist" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed", children: artwork.artist_bio })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-border pt-4 sm:pt-6", children: /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed", children: artwork.description || `A stunning contemporary piece by ${artwork.artist_name}.` }) }),
          artwork.formatted_price && /* @__PURE__ */ jsx("div", { className: "border-t border-border pt-4 sm:pt-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white to-[#FBF9F7] rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-lg border border-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Investment Price" }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl sm:text-3xl font-light tracking-tight", children: artwork.formatted_price })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-left sm:text-right", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-medium text-[#0A7A7A]", children: "✓ Available" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Only 1 piece" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-3 sm:pt-4 space-y-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-medium", children: "What's Included:" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-xs sm:text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "text-[#0A7A7A]" }),
                  "Certificate of Authenticity"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "text-[#0A7A7A]" }),
                  "Professional packaging & shipping coordination"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "text-[#0A7A7A]" }),
                  "Direct gallery support"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "text-[#0A7A7A]" }),
                  "Flexible payment options available"
                ] })
              ] })
            ] }),
            artwork.status && (artwork.status.toLowerCase() === "available" || artwork.status.toLowerCase() === "reserved") && /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-4 mt-4", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    handleOpenDialog("reserve");
                    handleReserveClick();
                  },
                  className: "group relative w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all duration-200 overflow-hidden text-sm sm:text-base font-medium",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-center gap-2", children: [
                      /* @__PURE__ */ jsx(Heart, { size: 18, className: "sm:w-5 sm:h-5" }),
                      /* @__PURE__ */ jsx("span", { children: "Reserve This Artwork" }),
                      /* @__PURE__ */ jsx(ChevronRight, { size: 18, className: "sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#086060] to-[#0A7A7A] opacity-0 group-hover:opacity-100 transition-opacity" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-muted-foreground mt-2", children: "No payment required • Gallery will contact you within 24 hours" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-border pt-4 sm:pt-6", children: /* @__PURE__ */ jsx(ShareButtons, { artwork }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: inquiryType !== null, onOpenChange: () => setInquiryType(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-lg", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: getDialogTitle() }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2", children: getDialogDescription() })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              required: true,
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "Enter your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              placeholder: "your@email.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone (optional)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "phone",
              type: "tel",
              value: formData.phone,
              onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
              placeholder: "+63 9XX-XXX-XXXX",
              pattern: "^(\\+63|0)?[0-9]{10}$"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Format: +63 9XX-XXX-XXXX or 09XX-XXX-XXXX" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "message", children: "Message (optional)" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "message",
              value: formData.message,
              onChange: (e) => setFormData({ ...formData, message: e.target.value }),
              placeholder: "Any additional information...",
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setInquiryType(null),
              className: "flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "flex-1 px-4 py-2 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors",
              children: "Submit Inquiry"
            }
          )
        ] })
      ] })
    ] }) }),
    similarArtworks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8 py-16 mt-20 border-t border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl tracking-tight mb-2", children: "Similar Works" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Explore more artworks you might like" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: similarArtworks.map((similar) => /* @__PURE__ */ jsxs(
        Link$1,
        {
          href: `/artwork/${similar.slug || similar.id}`,
          onClick: () => trackArtworkClick(similar, "similar_artworks"),
          className: "group block space-y-4",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/5] bg-muted rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
              FallbackImage,
              {
                src: similar.primary_image_url,
                fallback: "/images/placeholder.svg",
                alt: similar.title,
                className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-medium group-hover:text-[#0A7A7A] transition-colors", children: similar.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: similar.artist_name }),
              similar.formatted_price && /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: similar.formatted_price })
            ] })
          ]
        },
        similar.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    artwork.status && (artwork.status.toLowerCase() === "available" || artwork.status.toLowerCase() === "reserved") && /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-2xl lg:hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate", children: artwork.title }),
        artwork.formatted_price && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: artwork.formatted_price })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleOpenDialog("reserve"),
          className: "flex-shrink-0 px-6 py-2.5 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all font-medium text-sm shadow-lg flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx(Heart, { size: 16 }),
            "Reserve"
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  ArtworkDetail as default
};
