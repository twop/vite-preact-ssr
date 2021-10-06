import express from "express";
import { createPageRenderer } from "vite-plugin-ssr";
import { createServer } from "vite";

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}`;

startServer();

async function startServer() {
  const app = express();

  let viteDevServer;
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    viteDevServer = await createServer({
      root,
      server: { middlewareMode: true },
    });
    app.use(viteDevServer.middlewares);
  }

  const port = process.env.PORT || 3000;

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root });

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    const pageContextInit = { url };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    res.status(httpResponse.statusCode).send(httpResponse.body);
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
