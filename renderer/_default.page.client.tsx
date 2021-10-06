import { hydrate } from "preact";
import { getPage } from "vite-plugin-ssr/client";
import type { PageContext } from "./types";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/types";

hydrateClient();

console.log("yo");
async function hydrateClient() {
  // For Client Routing we should use `useClientRouter()` instead of `getPage()`.
  // See https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>();
  const { Page, pageProps } = pageContext;
  hydrate(<Page {...pageProps} />, document.getElementById("page-view"));
}
