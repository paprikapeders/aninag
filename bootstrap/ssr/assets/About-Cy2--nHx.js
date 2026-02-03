import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { H as Header } from "./Header-CC0kzd-H.js";
import { F as Footer, S as ScrollToTop } from "./ScrollToTop-CYqGEMpv.js";
import "react";
import "@radix-ui/react-dialog";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", style: { background: "linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)" }, children: [
    /* @__PURE__ */ jsx(Head, { title: "About" }),
    /* @__PURE__ */ jsx(Header, { currentPath: "/about" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-block", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl lg:text-6xl tracking-tight font-light", children: "About Aninag Collective" }),
          /* @__PURE__ */ jsx("div", { className: "h-1 w-20 sm:w-32 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mt-3 sm:mt-4 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed", children: "Aninag Collective is a digital art platform created to connect art enthusiasts with galleries across the Philippines." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 sm:space-y-12", children: [
        /* @__PURE__ */ jsxs("section", { className: "space-y-4 sm:space-y-6", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg leading-relaxed text-foreground/90", children: [
            "Rooted in the richness of Filipino creativity, ",
            /* @__PURE__ */ jsx("em", { className: "text-[#0A7A7A] font-medium", children: "aninag" }),
            "—meaning reflection or glimpse—represents our purpose: to offer meaningful encounters with art and the stories behind it. We aim to make Filipino artworks more visible, approachable, and thoughtfully presented, while honoring the role of galleries in shaping and protecting artistic practice."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg leading-relaxed text-foreground/90", children: "Currently, Aninag Collective functions as a curated online catalog, featuring selected works from our partner gallery. Visitors may explore artworks, express interest, and send inquiries through the platform. Each inquiry is handled personally—allowing us to facilitate direct, intentional conversations between collectors and galleries, rather than automated transactions." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-foreground/90", children: "To further bridge the physical and digital experience, we've introduced an Augmented Reality (AR) viewing feature, enabling viewers to see how an artwork might live within their own space. This helps collectors better appreciate scale, context, and presence—bringing the gallery experience closer to home." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-foreground/90", children: "Aninag Collective is in its early stage, with our first gallery partnership marking the beginning of a growing network dedicated to Filipino art." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-border", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl tracking-tight", children: "Our Vision" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg leading-relaxed text-foreground/90", children: "We envision Aninag Collective as a trusted bridge between Filipino artists, galleries, and collectors—both locally and internationally." }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg leading-relaxed text-foreground/90", children: "Our long-term goal is to build a platform that:" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 sm:space-y-4 text-base sm:text-lg text-foreground/90 pl-4 sm:pl-6", children: [
            /* @__PURE__ */ jsx("li", { className: "relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full", children: "Elevates Filipino art through careful curation and storytelling" }),
            /* @__PURE__ */ jsx("li", { className: "relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full", children: "Supports galleries as cultural stewards, not just marketplaces" }),
            /* @__PURE__ */ jsx("li", { className: "relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full", children: "Encourages deeper, more personal connections between people and art" }),
            /* @__PURE__ */ jsx("li", { className: "relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:bg-[#0A7A7A] before:rounded-full", children: "Uses technology thoughtfully to enhance, not replace, the human experience" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-foreground/90", children: "As we grow, we hope to expand our partnerships, introduce new ways of engaging with art, and create opportunities that allow Filipino creativity to be seen, valued, and collected with intention." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-12 border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 rounded-lg p-8 space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl tracking-tight", children: "Interested in partnering with us?" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "We're always looking to connect with galleries and artists who share our vision of making Filipino art more accessible." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => document.querySelector("[data-contact-button]")?.click(),
            className: "px-6 py-3 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors",
            children: "Get in Touch"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {})
  ] });
}
export {
  About as default
};
