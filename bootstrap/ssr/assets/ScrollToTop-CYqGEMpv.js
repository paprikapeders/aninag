import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { Instagram, Facebook, Mail, MapPin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-surface mt-12 sm:mt-16 lg:mt-20 pb-20 lg:pb-0", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "py-8 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl tracking-tight", children: "Aninag" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-muted-foreground leading-relaxed", children: "Connecting Filipino art with collectors worldwide. Curating meaningful encounters between artists, galleries, and art lovers." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://instagram.com/aninagcollective",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-10 h-10 rounded-full border border-border hover:border-[#0A7A7A] hover:bg-[#0A7A7A]/5 flex items-center justify-center transition-all",
              "aria-label": "Instagram",
              children: /* @__PURE__ */ jsx(Instagram, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://facebook.com/aninagcollective",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-10 h-10 rounded-full border border-border hover:border-[#0A7A7A] hover:bg-[#0A7A7A]/5 flex items-center justify-center transition-all",
              "aria-label": "Facebook",
              children: /* @__PURE__ */ jsx(Facebook, { size: 18 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-3 sm:mb-4 text-sm sm:text-base", children: "Explore" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 sm:space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/catalog", className: "text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors", children: "View Collection" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/catalog?featured=true", className: "text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors", children: "Featured Works" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/catalog?recent=true", className: "text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors", children: "New Arrivals" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-3 sm:mb-4 text-sm sm:text-base", children: "About" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 sm:space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/about", className: "text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors", children: "Our Story" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/#how-it-works", className: "text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors", children: "How It Works" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/#galleries", className: "text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors", children: "For Galleries" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-3 sm:mb-4 text-sm sm:text-base", children: "Get in Touch" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 sm:space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:hello@aninag.com",
              className: "text-sm text-muted-foreground hover:text-[#0A7A7A] transition-colors flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Mail, { size: 14 }),
                "hello@aninag.com"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("li", { className: "text-sm text-muted-foreground flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 14, className: "mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Metro Manila, Philippines" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "py-4 sm:py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground text-center sm:text-left", children: [
        "© ",
        currentYear,
        " Aninag Collective. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-[#0A7A7A] transition-colors", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-[#0A7A7A] transition-colors", children: "Terms of Service" })
      ] })
    ] })
  ] }) });
}
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: scrollToTop,
      className: "fixed bottom-6 lg:bottom-6 left-6 p-3 bg-background border-2 border-border rounded-full shadow-lg hover:shadow-xl hover:border-[#0A7A7A] hover:bg-[#0A7A7A] hover:text-white transition-all z-40 mb-16 lg:mb-0",
      "aria-label": "Scroll to top",
      children: /* @__PURE__ */ jsx(ArrowUp, { size: 20 })
    }
  );
}
export {
  Footer as F,
  ScrollToTop as S
};
