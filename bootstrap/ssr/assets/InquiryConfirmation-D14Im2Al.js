import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function GuestLayout({ children, title }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50", children: [
      /* @__PURE__ */ jsx("nav", { className: "bg-white shadow-sm sticky top-0 z-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-20", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "text-2xl font-bold tracking-tight text-purple-700 hover:text-purple-800 transition", children: "ANINAG" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-8", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: "text-sm font-medium text-gray-700 hover:text-purple-700 transition",
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/catalog",
              className: "text-sm font-medium text-gray-700 hover:text-purple-700 transition",
              children: "Collection"
            }
          )
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("main", { children }),
      /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white mt-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-amber-400", children: "ANINAG" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 leading-relaxed", children: "Your trusted art advisor, connecting discerning collectors with exceptional contemporary artworks." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold tracking-wide mb-4 text-amber-400", children: "EXPLORE" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/catalog", className: "text-sm text-gray-300 hover:text-white transition", children: "View Collection" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold tracking-wide mb-4 text-amber-400", children: "CONTACT" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-300 leading-relaxed", children: [
              "For inquiries, please reach out through",
              /* @__PURE__ */ jsx("br", {}),
              "our artwork inquiry forms."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-800", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 text-center", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Aninag. All rights reserved."
        ] }) })
      ] }) })
    ] })
  ] });
}
function InquiryConfirmation({ lead }) {
  return /* @__PURE__ */ jsx(GuestLayout, { title: "Inquiry Received - Aninag", children: /* @__PURE__ */ jsx("div", { className: "min-h-[60vh] flex items-center justify-center py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8", children: /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-10 h-10 text-white",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M5 13l4 4L19 7"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-light tracking-wide text-gray-900 mb-6", children: [
      "Thank You, ",
      lead.buyer_name
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-600 font-light mb-8 leading-relaxed", children: [
      "Your inquiry for ",
      /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: lead.artwork_title }),
      " by",
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: lead.artist_name }),
      " has been received."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-8 mb-8 text-left", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-light tracking-wide mb-4 text-center", children: "WHAT HAPPENS NEXT" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm text-gray-600 font-light", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium mr-3", children: "1." }),
          /* @__PURE__ */ jsx("span", { children: "Your Art Advisor will review your inquiry and the artwork details" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium mr-3", children: "2." }),
          /* @__PURE__ */ jsx("span", { children: "We will contact you within 24 hours to discuss your interest" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium mr-3", children: "3." }),
          /* @__PURE__ */ jsx("span", { children: "Your advisor will provide detailed information, pricing, and arrange next steps" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/catalog",
          className: "inline-block bg-gray-900 text-white px-12 py-4 text-sm tracking-wider font-light hover:bg-gray-800 transition",
          children: "CONTINUE BROWSING"
        }
      ),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/",
          className: "inline-block text-gray-600 hover:text-gray-900 text-sm font-light transition",
          children: "Return to Home"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-200", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 font-light", children: [
      "Inquiry Reference: #",
      lead.id
    ] }) })
  ] }) }) });
}
export {
  InquiryConfirmation as default
};
