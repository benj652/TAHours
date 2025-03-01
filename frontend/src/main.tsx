import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocketContextProvider } from "./context";

const clientId = import.meta.env.VITE_OAUTH_CLIENT as string;
// console.log(clientId);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <SocketContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SocketContextProvider>
        </GoogleOAuthProvider>
    </StrictMode>,
);
