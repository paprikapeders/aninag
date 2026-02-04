import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Link, Head } from "@inertiajs/react";
import Slider from "react-slick";
import { H as Header } from "./Header-CC0kzd-H.js";
import { F as Footer, S as ScrollToTop } from "./ScrollToTop-CYqGEMpv.js";
import { A as ArtworkCard } from "./ArtworkCard-4rCUfwXc.js";
import { Shield, Users, Award, TrendingUp, Sparkles, CheckCircle2, ArrowRight, Camera, Search, MessageCircle, Truck, Quote, Star, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./FallbackImage-BnNSCpnd.js";
function TrustBar() {
  return /* @__PURE__ */ jsx("div", { className: "border-y border-border bg-white/50 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3", children: /* @__PURE__ */ jsx(Shield, { size: 20, className: "sm:w-6 sm:h-6 text-[#0A7A7A]" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-light mb-1", children: "100%" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Authenticated Artworks" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3", children: /* @__PURE__ */ jsx(Users, { size: 20, className: "sm:w-6 sm:h-6 text-[#0A7A7A]" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-light mb-1", children: "5+" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Verified Galleries" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3", children: /* @__PURE__ */ jsx(Award, { size: 20, className: "sm:w-6 sm:h-6 text-[#0A7A7A]" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-light mb-1", children: "500+" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Curated Pieces" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0A7A7A]/10 rounded-full mb-2 sm:mb-3", children: /* @__PURE__ */ jsx(TrendingUp, { size: 20, className: "sm:w-6 sm:h-6 text-[#0A7A7A]" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-light mb-1", children: "24hrs" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: "Gallery Response Time" })
    ] })
  ] }) }) });
}
function ARShowcase() {
  return /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#0A7A7A] to-[#086060] text-white overflow-hidden relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 14, className: "sm:w-4 sm:h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Revolutionary AR Technology" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight", children: [
          "See Art in ",
          /* @__PURE__ */ jsx("span", { className: "italic", children: "Your Space" }),
          /* @__PURE__ */ jsx("br", {}),
          "Before You Buy"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-white/90 leading-relaxed", children: "Our augmented reality feature lets you visualize any artwork on your actual walls using your phone camera. Make confident decisions about size, color, and placement—no guesswork needed." }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 12, className: "sm:w-3.5 sm:h-3.5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base", children: "True-to-Scale Visualization" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-white/80", children: "See exact dimensions in your room" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 12, className: "sm:w-3.5 sm:h-3.5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base", children: "Works on Any Smartphone" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-white/80", children: "No app download required" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 12, className: "sm:w-3.5 sm:h-3.5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base", children: "Save & Share" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-white/80", children: "Get family approval before purchasing" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/catalog",
            className: "inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0A7A7A] rounded-lg hover:bg-white/90 transition-all shadow-xl font-medium text-sm sm:text-base lg:text-lg group",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Try AR Now" }),
              /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-8 lg:mt-0", children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-full max-w-xs sm:max-w-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[9/19] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-[#0A7A7A]/20 to-[#086060]/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Camera, { size: 48, className: "text-white/30" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-6 sm:top-8 left-4 sm:left-8 right-4 sm:right-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-black/40 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white text-xs sm:text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Living Room View" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: "Move phone to place artwork" })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl", children: /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-medium", children: "✨ AR-Ready" }) })
      ] }) })
    ] }) })
  ] });
}
function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Browse Curated Collection",
      description: "Explore authenticated artworks from verified Philippine galleries",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Camera,
      title: "Preview with AR",
      description: "See how the artwork looks on your wall using your phone camera",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Connect with Gallery",
      description: "Express interest and speak directly with gallery representatives",
      color: "from-[#0A7A7A] to-[#086060]"
    },
    {
      icon: Truck,
      title: "Gallery Handles Rest",
      description: "Payment, authentication, shipping—coordinated by trusted galleries",
      color: "from-amber-500 to-amber-600"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 lg:py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4", children: "How Aninag Works" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto", children: "From discovery to delivery, we make buying art simple and secure" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8", children: steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      index < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-surface to-white rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 border border-border hover:shadow-xl transition-all duration-300 group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-[#0A7A7A] text-white rounded-full flex items-center justify-center font-medium shadow-lg text-sm sm:text-base", children: index + 1 }),
        /* @__PURE__ */ jsx("div", { className: `inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform`, children: /* @__PURE__ */ jsx(step.icon, { size: 24, className: "sm:w-7 sm:h-7" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-medium", children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground leading-relaxed", children: step.description })
      ] })
    ] }, index)) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-12 sm:mt-16", children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: "/catalog",
        className: "inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all shadow-lg hover:shadow-xl font-medium text-sm sm:text-base lg:text-lg",
        children: [
          "Start Browsing Collection",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "sm:w-5 sm:h-5" })
        ]
      }
    ) })
  ] }) });
}
function Testimonials() {
  const testimonials = [
    {
      name: "Maria Santos",
      role: "Interior Designer",
      location: "Makati",
      quote: "The AR feature saved me so much time. I could show my client exactly how the artwork would look in their space before making the purchase.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Art Collector",
      location: "BGC",
      quote: "Direct connection with galleries means I got expert advice and better pricing. The authentication guarantee gave me complete peace of mind.",
      rating: 5
    },
    {
      name: "Sofia Rodriguez",
      role: "Corporate Buyer",
      location: "Ortigas",
      quote: "We purchased 12 pieces for our office. The process was seamless, and the gallery handled everything professionally. Highly recommended!",
      rating: 5
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-surface to-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4", children: "Trusted by Art Lovers" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl text-muted-foreground", children: "See what collectors and designers say about Aninag" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 space-y-4 sm:space-y-6",
        children: [
          /* @__PURE__ */ jsx(Quote, { size: 28, className: "sm:w-8 sm:h-8 text-[#0A7A7A]/20" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...Array(testimonial.rating)].map((_, i) => /* @__PURE__ */ jsx(Star, { size: 14, className: "sm:w-4 sm:h-4 fill-amber-400 text-amber-400" }, i)) }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed", children: [
            '"',
            testimonial.quote,
            '"'
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0A7A7A] to-[#086060] rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base", children: testimonial.name.charAt(0) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm sm:text-base", children: testimonial.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground", children: [
                testimonial.role,
                " • ",
                testimonial.location
              ] })
            ] })
          ] })
        ]
      },
      index
    )) })
  ] }) });
}
function GalleryPartners() {
  const galleries = [
    {
      name: "Modern Arts Gallery",
      location: "Makati, Metro Manila",
      established: "2015",
      artworks: "150+",
      verified: true
    },
    {
      name: "Contemporary Art Space",
      location: "BGC, Taguig",
      established: "2018",
      artworks: "200+",
      verified: true
    },
    {
      name: "Filipino Heritage Gallery",
      location: "Intramuros, Manila",
      established: "2012",
      artworks: "180+",
      verified: true
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 lg:py-24 bg-white border-y border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4", children: "Our Gallery Partners" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto", children: "We partner with verified galleries across the Philippines to bring you authenticated, curated artwork" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16", children: galleries.map((gallery, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group bg-gradient-to-br from-surface to-white rounded-2xl p-6 sm:p-8 border border-border hover:shadow-xl transition-all duration-300",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0A7A7A]/10 to-[#0A7A7A]/5 rounded-xl flex items-center justify-center mb-4 sm:mb-6", children: /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl font-light text-[#0A7A7A]", children: gallery.name.charAt(0) }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-medium group-hover:text-[#0A7A7A] transition-colors", children: gallery.name }),
              gallery.verified && /* @__PURE__ */ jsx(CheckCircle2, { size: 18, className: "sm:w-5 sm:h-5 text-[#0A7A7A] flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-xs sm:text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 12, className: "sm:w-3.5 sm:h-3.5" }),
              gallery.location
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground pt-2", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Est. ",
                gallery.established
              ] }),
              /* @__PURE__ */ jsx("span", { children: "•" }),
              /* @__PURE__ */ jsxs("span", { children: [
                gallery.artworks,
                " artworks"
              ] })
            ] })
          ] })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center bg-gradient-to-br from-[#0A7A7A]/5 to-[#086060]/5 rounded-2xl p-8 sm:p-12 border border-[#0A7A7A]/20", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-light mb-3 sm:mb-4", children: "Are you a gallery owner?" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto", children: "Join Aninag and reach more art collectors with our AR technology and curated platform" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          "data-contact-button": true,
          className: "inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all shadow-lg font-medium text-sm sm:text-base",
          children: [
            "Partner With Us",
            /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "sm:w-5 sm:h-5" })
          ]
        }
      )
    ] })
  ] }) });
}
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "How does the AR preview feature work?",
      answer: "Simply tap 'View in Your Space' on any artwork, point your phone camera at your wall, and our AR technology will overlay the artwork in true-to-scale dimensions. No app download needed—it works right in your mobile browser."
    },
    {
      question: "Are all artworks authenticated?",
      answer: "Yes, 100%. Every artwork comes with a Certificate of Authenticity from the gallery. We only partner with verified galleries who guarantee the authenticity of their pieces."
    },
    {
      question: "What happens after I express interest?",
      answer: "A gallery representative will contact you within 24 hours to discuss details, answer questions, and arrange payment and delivery. We facilitate the connection but let galleries handle transactions directly."
    },
    {
      question: "Can I negotiate prices?",
      answer: "Pricing is set by galleries, but they may offer payment plans or negotiate on case-by-case basis. Contact them directly through our platform to discuss options."
    },
    {
      question: "Do you ship nationwide?",
      answer: "Yes! Our partner galleries coordinate professional art shipping across the Philippines. International shipping is available for select pieces—inquire with the gallery for details."
    },
    {
      question: "What's your commission structure?",
      answer: "For buyers: absolutely free. Galleries pay a small listing fee to be on our platform, but buyers pay no additional fees beyond what the gallery charges."
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl text-muted-foreground", children: "Everything you need to know about buying art on Aninag" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all",
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenIndex(openIndex === index ? null : index),
              className: "w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-surface/50 transition-colors",
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium pr-6 sm:pr-8 text-sm sm:text-base", children: faq.question }),
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    size: 18,
                    className: `sm:w-5 sm:h-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          openIndex === index && /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 sm:pt-4", children: faq.answer })
        ]
      },
      index
    )) })
  ] }) });
}
function SEO({ meta }) {
  const {
    title = "Aninag - Where Light Meets Artistry",
    description = "Discover curated Filipino contemporary artworks with AR preview technology.",
    keywords = "Filipino art, contemporary art Philippines, art gallery",
    url = window.location.href,
    image = "/images/og-default.jpg",
    type = "website",
    price,
    currency,
    availability
  } = meta || {};
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    type === "product" && price && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("meta", { property: "product:price:amount", content: price }),
      /* @__PURE__ */ jsx("meta", { property: "product:price:currency", content: currency || "PHP" }),
      /* @__PURE__ */ jsx("meta", { property: "product:availability", content: availability || "in stock" })
    ] }),
    type === "product" && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": title.split(" by ")[0],
      "description": description,
      "image": image,
      "url": url,
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": currency || "PHP",
        "availability": availability === "in stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    }) }),
    type === "website" && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Aninag",
      "description": description,
      "url": url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/catalog?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }) })
  ] });
}
function Home({ featuredArtworks, meta }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4e3,
    fade: true,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next)
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", style: { background: "linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)" }, children: [
    /* @__PURE__ */ jsx(SEO, { meta }),
    /* @__PURE__ */ jsx(Head, { title: "Aninag - Filipino Art Marketplace with AR Preview" }),
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-[#0A7A7A] to-[#086060] text-white py-2 px-4 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-medium", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
    ] }) }) }),
    /* @__PURE__ */ jsx(Header, { currentPath: "/" }),
    /* @__PURE__ */ jsxs("section", { id: "home", className: "relative h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-muted", children: [
      /* @__PURE__ */ jsx(Slider, { ref: sliderRef, ...settings, className: "h-full", children: featuredArtworks.slice(0, 4).map((artwork) => /* @__PURE__ */ jsxs("div", { className: "relative h-[60vh] sm:h-[70vh] lg:h-[80vh]", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center",
            style: { backgroundImage: `url(${artwork.primary_image_url || artwork.image_url})` },
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl space-y-4 sm:space-y-6 text-white", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm mb-3 sm:mb-6 animate-fade-in", children: [
            /* @__PURE__ */ jsx(Camera, { size: 14, className: "sm:w-4 sm:h-4" }),
            /* @__PURE__ */ jsx("span", { children: "See art in your space with AR • Direct gallery connection" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-tight", children: "Where Light Meets Artistry" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4", children: "Discover Philippine art—curated, contextualized, and viewed in your space." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-10 text-white/80 text-xs sm:text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "sm:w-[18px] sm:h-[18px] text-[#0A7A7A]" }),
              /* @__PURE__ */ jsx("span", { children: "500+ Curated Artworks" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "sm:w-[18px] sm:h-[18px] text-[#0A7A7A]" }),
              /* @__PURE__ */ jsx("span", { children: "Verified Galleries" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "sm:w-[18px] sm:h-[18px] text-[#0A7A7A]" }),
              /* @__PURE__ */ jsx("span", { children: "AR Room Preview" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/catalog",
                className: "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all hover:shadow-lg hover:scale-105 text-sm sm:text-base lg:text-lg font-medium",
                children: /* @__PURE__ */ jsx("span", { children: "View AR-Enabled Collection" })
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: `/artwork/${artwork.slug || artwork.id}`,
                className: "inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base lg:text-lg font-medium",
                children: [
                  /* @__PURE__ */ jsx(Camera, { size: 18, className: "sm:w-5 sm:h-5" }),
                  /* @__PURE__ */ jsx("span", { children: "See This Artwork" })
                ]
              }
            )
          ] })
        ] }) })
      ] }, artwork.id)) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => sliderRef.current?.slickPrev(),
          className: "absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-colors",
          "aria-label": "Previous slide",
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 sm:w-6 sm:h-6" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => sliderRef.current?.slickNext(),
          className: "absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-colors",
          "aria-label": "Next slide",
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 sm:w-6 sm:h-6" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10", children: featuredArtworks.slice(0, 4).map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => sliderRef.current?.slickGoTo(index),
          className: `w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"}`
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "trust", children: /* @__PURE__ */ jsx(TrustBar, {}) }),
    /* @__PURE__ */ jsx("div", { id: "ar-preview", children: /* @__PURE__ */ jsx(ARShowcase, {}) }),
    /* @__PURE__ */ jsx("div", { id: "how-it-works", children: /* @__PURE__ */ jsx(HowItWorks, {}) }),
    /* @__PURE__ */ jsxs("section", { id: "collection", className: "py-12 sm:py-16 lg:py-20 container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-block", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent", children: "Featured Artworks" }),
          /* @__PURE__ */ jsx("div", { className: "h-1 w-20 sm:w-24 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mx-auto mt-3 sm:mt-4 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4", children: "Explore our carefully selected collection of contemporary art from emerging and established artists" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12", children: featuredArtworks.slice(0, 3).map((artwork) => /* @__PURE__ */ jsx(ArtworkCard, { artwork }, artwork.id)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          href: "/catalog",
          className: "inline-block px-8 py-3 border-2 border-[#0A7A7A] text-[#0A7A7A] rounded-lg hover:bg-[#0A7A7A] hover:text-white transition-colors",
          children: "View All Artworks"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "galleries", children: /* @__PURE__ */ jsx(GalleryPartners, {}) }),
    /* @__PURE__ */ jsx("div", { id: "testimonials", children: /* @__PURE__ */ jsx(Testimonials, {}) }),
    /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16 lg:py-20 relative overflow-hidden", style: { background: "linear-gradient(135deg, #FBF9F7 0%, #F5F3F0 100%)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#0A7A7A]/5 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#D87456]/5 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 shadow-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-light tracking-tight", children: "Your Art Advisor" }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-muted-foreground leading-relaxed", children: "Aninag bridges collectors with exceptional contemporary art. We work closely with established galleries to bring you a curated selection of museum-quality pieces. Our art advisors are here to guide you through the acquisition process." }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/about",
            className: "inline-block px-6 sm:px-8 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] hover:shadow-xl transition-all mt-4 sm:mt-6 hover:-translate-y-1 text-sm sm:text-base",
            children: "Learn More About Us"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "faq", children: /* @__PURE__ */ jsx(FAQ, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {})
  ] });
}
export {
  Home as default
};
