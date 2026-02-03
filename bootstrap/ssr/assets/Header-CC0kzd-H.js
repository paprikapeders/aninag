import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive from "@radix-ui/react-label";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      ref,
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ref,
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border bg-white dark:bg-[#030213] p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", children: [
            /* @__PURE__ */ jsx(XIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const isGtagAvailable = () => typeof window !== "undefined" && typeof window.gtag === "function";
const getDeviceInfo = () => {
  if (typeof window === "undefined" || !window.deviceInfo) {
    return {};
  }
  return window.deviceInfo;
};
const trackArtworkReservation = (artworkData) => {
  if (!isGtagAvailable()) return;
  const gaId = window.GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
  const deviceInfo = getDeviceInfo();
  window.gtag("event", "conversion", {
    send_to: `${gaId}/artwork_reserve`,
    event_category: "Conversion",
    event_label: "Reserve Artwork",
    value: artworkData.price || 0,
    currency: "PHP",
    artwork_id: artworkData.id,
    artwork_title: artworkData.title,
    artwork_artist: artworkData.artist_name,
    gallery_name: artworkData.gallery?.name || "Unknown",
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system
  });
  window.gtag("event", "reserve_artwork", {
    artwork_id: artworkData.id,
    artwork_title: artworkData.title,
    artwork_price: artworkData.price,
    artist: artworkData.artist_name,
    gallery: artworkData.gallery?.name,
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system
  });
};
const trackContactSubmission = (formData) => {
  if (!isGtagAvailable()) return;
  const gaId = window.GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
  const deviceInfo = getDeviceInfo();
  window.gtag("event", "conversion", {
    send_to: `${gaId}/contact_submit`,
    event_category: "Conversion",
    event_label: "Contact Form Submission",
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system
  });
  window.gtag("event", "generate_lead", {
    lead_type: "contact_form",
    inquiry_type: formData.inquiry_type || "general",
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system
  });
};
const trackARViewerOpen = (artworkData) => {
  if (!isGtagAvailable()) return;
  const deviceInfo = getDeviceInfo();
  window.gtag("event", "ar_viewer_open", {
    event_category: "Engagement",
    event_label: "AR Viewer Opened",
    artwork_id: artworkData.id,
    artwork_title: artworkData.title,
    artwork_price: artworkData.price,
    engagement_level: "high",
    device_type: deviceInfo.device_type,
    browser: deviceInfo.browser,
    operating_system: deviceInfo.operating_system
  });
};
const trackARModeSwitch = (mode) => {
  if (!isGtagAvailable()) return;
  window.gtag("event", "ar_mode_switch", {
    event_category: "Engagement",
    event_label: `AR Mode: ${mode}`,
    ar_mode: mode
    // 'camera' or 'upload'
  });
};
const trackARImageUpload = () => {
  if (!isGtagAvailable()) return;
  window.gtag("event", "ar_image_upload", {
    event_category: "Engagement",
    event_label: "User Uploaded Room Photo",
    engagement_level: "very_high"
  });
};
const trackArtworkClick = (artworkData, position = null) => {
  if (!isGtagAvailable()) return;
  window.gtag("event", "select_item", {
    event_category: "Engagement",
    event_label: "Artwork Clicked",
    items: [{
      item_id: artworkData.id,
      item_name: artworkData.title,
      item_category: "Artwork",
      price: artworkData.price,
      item_list_name: position || "catalog"
    }]
  });
};
function Header({ currentPath = "/" }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    trackContactSubmission(formData);
    router.visit("/confirmation", {
      method: "post",
      data: {
        type: "contact",
        ...formData
      },
      onSuccess: () => {
        setIsContactOpen(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-border bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 sticky top-0 z-50 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-16 sm:h-20 items-center justify-between", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center space-x-2 group", children: /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl tracking-tight font-light group-hover:text-[#0A7A7A] transition-colors", children: "Aninag" }) }),
        /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center space-x-8", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: `text-sm font-medium transition-all hover:text-[#0A7A7A] relative ${currentPath === "/" ? "text-[#0A7A7A] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#0A7A7A]" : "text-foreground/70"}`,
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/catalog",
              className: `text-sm font-medium transition-all hover:text-[#0A7A7A] relative ${currentPath === "/catalog" ? "text-[#0A7A7A] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#0A7A7A]" : "text-foreground/70"}`,
              children: "Collection"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/about",
              className: `text-sm font-medium transition-all hover:text-[#0A7A7A] relative ${currentPath === "/about" ? "text-[#0A7A7A] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#0A7A7A]" : "text-foreground/70"}`,
              children: "About"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsContactOpen(true),
            className: "hidden md:block px-6 py-2.5 bg-[#0A7A7A] text-white text-sm font-medium rounded-lg hover:bg-[#086060] transition-all hover:shadow-lg hover:-translate-y-0.5",
            "data-contact-button": true,
            children: "Get in Touch"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "md:hidden p-2 hover:bg-muted rounded-lg transition-colors",
            "aria-label": "Toggle menu",
            children: mobileMenuOpen ? /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
          }
        )
      ] }),
      mobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden border-t border-border py-4 space-y-2 animate-in slide-in-from-top-2", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/",
            className: "block px-4 py-2.5 text-base font-medium rounded-lg transition-colors hover:bg-muted",
            onClick: () => setMobileMenuOpen(false),
            children: "Home"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/catalog",
            className: "block px-4 py-2.5 text-base font-medium rounded-lg transition-colors hover:bg-muted",
            onClick: () => setMobileMenuOpen(false),
            children: "Collection"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/about",
            className: "block px-4 py-2.5 text-base font-medium rounded-lg transition-colors hover:bg-muted",
            onClick: () => setMobileMenuOpen(false),
            children: "About"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setMobileMenuOpen(false);
              setIsContactOpen(true);
            },
            className: "w-full text-left px-4 py-2.5 text-base font-medium bg-[#0A7A7A] text-white rounded-lg transition-all hover:bg-[#086060] mt-2",
            children: "Get in Touch"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isContactOpen, onOpenChange: setIsContactOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-lg", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Get in Touch" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Have a question or inquiry? Fill out the form below and we'll respond within 24 hours." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "contact-name", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "contact-name",
              required: true,
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "Enter your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "contact-email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "contact-email",
              type: "email",
              required: true,
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              placeholder: "your@email.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "contact-phone", children: "Phone (optional)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "contact-phone",
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
          /* @__PURE__ */ jsx(Label, { htmlFor: "contact-message", children: "Message" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "contact-message",
              required: true,
              value: formData.message,
              onChange: (e) => setFormData({ ...formData, message: e.target.value }),
              placeholder: "Tell us how we can help...",
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsContactOpen(false),
              className: "flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "flex-1 px-4 py-2 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors",
              children: "Send Message"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Dialog as D,
  Header as H,
  Input as I,
  Label as L,
  Textarea as T,
  trackARImageUpload as a,
  DialogContent as b,
  DialogHeader as c,
  DialogTitle as d,
  trackArtworkClick as e,
  trackARViewerOpen as f,
  trackArtworkReservation as g,
  cn as h,
  trackARModeSwitch as t
};
