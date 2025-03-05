import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import { SocketContextProvider } from "./context";
import "./index.css";

const clientId = import.meta.env.VITE_OAUTH_CLIENT as string;
// console.log(clientId);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster richColors />
    <GoogleOAuthProvider clientId={clientId}>
      <SocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
