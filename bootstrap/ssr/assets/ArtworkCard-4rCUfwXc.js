import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { F as FallbackImage, W as WishlistButton } from "./FallbackImage-BnNSCpnd.js";
function ArtworkCard({ artwork }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/artwork/${artwork.slug || artwork.id}`,
      className: "group block bg-card rounded-lg overflow-hidden transition-all duration-300 border border-border hover:border-[#0A7A7A]/30 shadow-sm hover:shadow-xl hover:-translate-y-1",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "aspect-[3/4] overflow-hidden bg-muted relative", children: [
          /* @__PURE__ */ jsx(
            FallbackImage,
            {
              src: artwork.primary_image_url || artwork.image_url,
              fallback: "/images/placeholder.svg",
              alt: artwork.title,
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              onClick: (e) => e.preventDefault(),
              children: /* @__PURE__ */ jsx(WishlistButton, { artworkId: artwork.id, size: "small" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 bg-gradient-to-b from-white to-[#FDFCFB]", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium group-hover:text-[#0A7A7A] transition-colors", children: artwork.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs sm:text-sm", children: artwork.artist_name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground", children: [
            artwork.medium,
            " • ",
            artwork.year
          ] }),
          artwork.formatted_price && /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base font-medium text-foreground mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-border/50", children: artwork.formatted_price })
        ] })
      ]
    }
  );
}
export {
  ArtworkCard as A
};
