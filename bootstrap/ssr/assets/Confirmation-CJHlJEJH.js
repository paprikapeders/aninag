import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { H as Header } from "./Header-CC0kzd-H.js";
import { CheckCircle } from "lucide-react";
import "react";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function Confirmation({ inquiry }) {
  const getInquiryTypeText = () => {
    switch (inquiry?.type) {
      case "price":
        return "Price Request";
      case "reserve":
        return "Reservation Request";
      case "viewing":
        return "Viewing Appointment";
      case "corporate":
        return "Corporate Inquiry";
      default:
        return "Inquiry";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Head, { title: "Thank You" }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-8 py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-[#0A7A7A]/10 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-[#0A7A7A]" }) }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl tracking-tight", children: "Thank You for Your Inquiry" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto", children: "Your Art Advisor will contact you within 24 hours to discuss the next steps and answer any questions you may have." })
      ] }),
      inquiry && /* @__PURE__ */ jsxs("div", { className: "bg-muted/30 rounded-lg p-8 space-y-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm text-muted-foreground mb-1", children: "Inquiry Type" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg", children: getInquiryTypeText() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm text-muted-foreground mb-1", children: "Artwork" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: inquiry.artwork_title }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
            "by ",
            inquiry.artist_name
          ] }),
          inquiry.artwork_code && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
            "Code: ",
            inquiry.artwork_code
          ] }),
          inquiry.medium && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: inquiry.medium }),
          inquiry.price && /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-[#0A7A7A] mt-2", children: [
            inquiry.currency || "PHP",
            " ",
            Number(inquiry.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm text-muted-foreground mb-1", children: "Contact Information" }),
          /* @__PURE__ */ jsx("p", { children: inquiry.name }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: inquiry.email }),
          inquiry.phone && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: inquiry.phone })
        ] }),
        inquiry.message && /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm text-muted-foreground mb-1", children: "Your Message" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: inquiry.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border border-[#0A7A7A]/20 rounded-lg p-6 bg-[#0A7A7A]/5 mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2", children: "What happens next?" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("span", { className: "mr-2 mt-0.5 text-[#0A7A7A]", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: "Your dedicated Art Advisor will review your inquiry" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("span", { className: "mr-2 mt-0.5 text-[#0A7A7A]", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: "We'll contact you within 24 hours via email or phone" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("span", { className: "mr-2 mt-0.5 text-[#0A7A7A]", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: "You'll receive detailed information about the artwork and next steps" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center space-x-4", children: [
        inquiry?.artwork_slug && /* @__PURE__ */ jsx(
          Link,
          {
            href: `/artwork/${inquiry.artwork_slug}`,
            className: "inline-block px-8 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors",
            children: "Back to Artwork"
          }
        ),
        !inquiry?.artwork_slug && /* @__PURE__ */ jsx(
          Link,
          {
            href: "/",
            className: "inline-block px-8 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors",
            children: "Return Home"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/catalog",
            className: "inline-block px-8 py-3 border-2 border-[#0A7A7A] text-[#0A7A7A] rounded-lg hover:bg-[#0A7A7A] hover:text-white transition-colors",
            children: "Browse More Artworks"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "py-12 border-t border-border mt-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "© 2026 Aninag. All rights reserved." }) }) }) })
  ] });
}
export {
  Confirmation as default
};
