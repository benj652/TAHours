import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import path from "path";
//@ts-ignore
import { fileURLToPath } from "url";
//@ts-ignore
import { dirname } from "path";
import { defineConfig } from "vite";
const __dirname = dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8000",
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // Alias @ to the src folder
        },
    },
});
