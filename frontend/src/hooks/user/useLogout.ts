import { TokenConfig } from "@/types";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook: useLogout
 *
 * This is the hook and stuff for logging out the user.
 * It manages loading and error states and makes an API call to remove the user.
 *  - loading: Boolean indicating if the request is in progress.
 *  - error: A string representing any error that occurred.
 *  - logout: Function to initiate the process of logging out the user.
 *
 *  Pretty epic if i do say so myself
 */
export const useLogout = () => {
  // State to track whether the API request is in progress
  const [loading, setLoading] = useState<boolean>(false); // Indicate that a request is in progress
  // State to store any error messages encountered during the request
  const [error, setError] = useState<string | null>(null);
  /**
   * Logout function to log the user out
   *
   * This function logs the user out by removing the user's token from local storage.
   * It also calls the googleLogout function to log the user out of Google.
   *
   * It gets rid of all the trash I put in the local storqage
   *
   * Acctual garbage code and auth system at the moment will fix later
   */
  const logout = async () => {
    setLoading(true); // Indicate that a request is in progress
    setError(null);
    try {
      // Do logout stuff
      googleLogout(); // Log the user out of Google

      localStorage.removeItem(TokenConfig.UserItemsToken); // Remove the user's items from local storage

      localStorage.removeItem(TokenConfig.UserTimeoutToken); // Remove the user's timeout from local storage

      localStorage.removeItem(TokenConfig.UserJWTResponseToken); // Remove the user's JWT response from local storage

      // is never visible but why not
      toast.success("Logged out successfully");

      window.location.reload(); // Reload the page to reflect the logout
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // Capture and store any errors encountered during the request
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false); // When all is set and done, stop loading
    }
  };
  return { loading, logout, error }; // Return the state values and function for use in components
};
