import renderToString from "preact-render-to-string";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import type { PageContext, PageProps } from "./types";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

export { render, onBeforeRender };

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname"];

async function onBeforeRender(pageContext: PageContext) {
  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.

  console.log("onBeforeRender", pageContext);

  const productName = "Server Product Name";

  // We make `movies` available as `pageContext.pageProps.movies`
  const pageProps = { productName };
  return {
    pageContext: {
      pageProps,
    },
  };
}

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const { Page, pageProps } = pageContext;

  console.log(pageProps);
  const pageHtml = renderToString(Page(pageProps));

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>Hello!</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
