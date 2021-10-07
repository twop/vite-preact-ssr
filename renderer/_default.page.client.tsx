import { hydrate } from "preact";
import { getPage } from "vite-plugin-ssr/client";
import type { PageContext } from "./types";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/types";

hydrateClient();

const counter = (() => {
  let i = 0;
  return () => i++;
})();

console.log("yo!", counter());

async function hydrateClient() {
  // For Client Routing we should use `useClientRouter()` instead of `getPage()`.
  // See https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>();
  const { Page, pageProps } = pageContext;
  hydrate(<Page {...pageProps} />, document.getElementById("page-view"));
}
