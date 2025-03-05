import { TokenConfig } from "@/types";
import axios from "axios";

export const httpClient = axios.create({
    withCredentials: true,
});


httpClient.interceptors.request.use((config) => {
    const JWTR = localStorage.getItem(TokenConfig.UserJWTResponseToken); // Get the token from localStorage

    if (JWTR) {
        // Add the Authorization header if the token is available
        config.headers["Authorization"] = `Bearer ${JWTR}`;
    }

    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});
