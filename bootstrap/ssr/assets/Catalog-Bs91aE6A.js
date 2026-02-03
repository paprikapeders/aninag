import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { h as cn, H as Header } from "./Header-CC0kzd-H.js";
import { F as Footer, S as ScrollToTop } from "./ScrollToTop-CYqGEMpv.js";
import { A as ArtworkCard } from "./ArtworkCard-4rCUfwXc.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./FallbackImage-BnNSCpnd.js";
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-[100] max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md bg-white dark:bg-[#030213]",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
function Catalog({ artworks = [], artists = [], mediums = [], priceRanges = [] }) {
  const [artistFilter, setArtistFilter] = useState("all");
  const [mediumFilter, setMediumFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const filteredArtworks = (Array.isArray(artworks) ? artworks : []).filter((artwork) => {
    if (artistFilter !== "all" && artwork.artist_name !== artistFilter) return false;
    if (mediumFilter !== "all" && artwork.medium !== mediumFilter) return false;
    if (priceFilter !== "all" && artwork.price) {
      const range = priceRanges.find((r) => r.label === priceFilter);
      if (range) {
        if (artwork.price < range.min || artwork.price > range.max) return false;
      }
    }
    return true;
  });
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "title-az":
        return a.title.localeCompare(b.title);
      case "artist-az":
        return a.artist_name.localeCompare(b.artist_name);
      case "newest":
      default:
        return b.year - a.year;
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", style: { background: "linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)" }, children: [
    /* @__PURE__ */ jsx(Head, { title: "Collection" }),
    /* @__PURE__ */ jsx(Header, { currentPath: "/catalog" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 sm:mb-12 space-y-3 sm:space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-block", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight", children: "Collection" }),
          /* @__PURE__ */ jsx("div", { className: "h-1 w-16 sm:w-24 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] mt-3 sm:mt-4 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-2xl", children: "Browse our complete collection of contemporary artworks. Each piece is carefully selected and available for acquisition." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 sm:mb-8 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-border relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs sm:text-sm font-medium", children: "Artist" }),
            /* @__PURE__ */ jsxs(Select, { value: artistFilter, onValueChange: setArtistFilter, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-background", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Artists" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Artists" }),
                artists.map((artist) => /* @__PURE__ */ jsx(SelectItem, { value: artist, children: artist }, artist))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs sm:text-sm font-medium", children: "Medium" }),
            /* @__PURE__ */ jsxs(Select, { value: mediumFilter, onValueChange: setMediumFilter, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-background", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Mediums" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Mediums" }),
                mediums.map((medium) => /* @__PURE__ */ jsx(SelectItem, { value: medium, children: medium }, medium))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs sm:text-sm font-medium", children: "Price Range" }),
            /* @__PURE__ */ jsxs(Select, { value: priceFilter, onValueChange: setPriceFilter, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-background", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Prices" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Prices" }),
                priceRanges.map((range) => /* @__PURE__ */ jsx(SelectItem, { value: range.label, children: range.label }, range.label))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setArtistFilter("all");
                setMediumFilter("all");
                setPriceFilter("all");
              },
              className: "w-full px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors",
              children: "Clear Filters"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm text-muted-foreground", children: [
            "Showing ",
            sortedArtworks.length,
            " of ",
            artworks.length,
            " artworks"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs sm:text-sm text-muted-foreground whitespace-nowrap", children: "Sort by:" }),
            /* @__PURE__ */ jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-background w-full sm:w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "newest", children: "Newest First" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "price-low", children: "Price: Low to High" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "price-high", children: "Price: High to Low" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "title-az", children: "Title: A-Z" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "artist-az", children: "Artist: A-Z" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8", children: sortedArtworks.map((artwork) => /* @__PURE__ */ jsx(ArtworkCard, { artwork }, artwork.id)) }),
      sortedArtworks.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "No artworks found matching your filters." }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {})
  ] });
}
export {
  Catalog as default
};
