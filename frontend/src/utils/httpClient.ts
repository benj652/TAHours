/*
 * httpClient.ts
 * This file contains the http client for making requests to the backend
 * It is used in the frontend
 */
import { TokenConfig } from "@/types";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";

export const httpClient = axios.create({
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    const JWTR = localStorage.getItem(TokenConfig.UserJWTResponseToken); // Get the token from localStorage

    if (JWTR) {
      // Add the Authorization header if the token is available
      config.headers["Authorization"] = `Bearer ${JWTR}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    // Just return the response if there's no error
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token or do any logout logic here

      googleLogout(); // Log the user out of Google

      localStorage.removeItem(TokenConfig.UserItemsToken); // Remove the user's items from local storage

      localStorage.removeItem(TokenConfig.UserTimeoutToken); // Remove the user's timeout from local storage

      localStorage.removeItem(TokenConfig.UserJWTResponseToken); // Remove the user's JWT response from local storage

      // is never visible but why not
      toast.success("Logged out successfully");
      window.location.reload(); // Reload the page to reflect the logout
    }

    return Promise.reject(error);
  }
);
