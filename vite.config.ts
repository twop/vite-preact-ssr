import ssr from "vite-plugin-ssr/plugin";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact(), ssr()],
});
