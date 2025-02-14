import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
