import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Aninag";
createServer(
  (page) => createInertiaApp({
    page,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/About.jsx": () => import("./assets/About-Cy2--nHx.js"), "./Pages/ArtworkDetail.jsx": () => import("./assets/ArtworkDetail-DfBK-mb1.js"), "./Pages/Catalog.jsx": () => import("./assets/Catalog-Bs91aE6A.js"), "./Pages/Confirmation.jsx": () => import("./assets/Confirmation-CJHlJEJH.js"), "./Pages/Home.jsx": () => import("./assets/Home-B1-tgXdb.js"), "./Pages/InquiryConfirmation.jsx": () => import("./assets/InquiryConfirmation-D14Im2Al.js") })),
    setup: ({ App, props }) => ReactDOMServer.renderToString(/* @__PURE__ */ jsx(App, { ...props })),
    progress: {
      color: "#1a1a1a"
    }
  })
);
