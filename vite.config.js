import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import dynamicImport from "vite-plugin-dynamic-import";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact(), dynamicImport()],
    build: {
        rollupOptions: {
            input: ["app.jsx", "admin.js"],
        },
    },
    base: "/dev/",
    root: "./assets",
    resolve: {
        alias: {
            "/@": resolve(__dirname, "assets/"),
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
        },
    },
});
