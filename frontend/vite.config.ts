import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import path from "path";
//@ts-ignore
import { fileURLToPath } from "url";
//@ts-ignore
import { dirname } from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig(() => {
    dotenv.config({ path: path.resolve(__dirname, ".env") });
    const MODE = process.env.MODE || "production";
    return {
        plugins: [react(), tailwindcss()],
        server: {
            port: 3000,
            proxy: {
                "/api": {
                    target: MODE === "production" ? "http://tahours-backend:8000" : "http://localhost:8000",
                },
            },
            host: "0.0.0.0",
            watch: {
                usePolling: true, // Optional: helps with file system watches in certain environments
            },
        },
        preview: {
            allowedHosts: ["a53d-137-146-130-98.ngrok-free.app","42a4-137-146-130-98.ngrok-free.app", "localhost"], // Add ngrok host here
        },
        // preview: {
        //     allowedHosts: ['546f-137-146-130-98.ngrok-free.app', 'localhost']
        // },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"), // Alias @ to the src folder
            },
        },
    };
});
