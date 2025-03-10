import { TokenConfig, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to login a user
 *
 * sets a bunch of item stuiff
 */
export const useLogin = () => {
  // react hooks to set the loading and error states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Login function to log hte user in
   *
   * @param jwtResponse - The response from the google login
   *
   * Pretty cool
   */
  const login = async (jwtResponse: CredentialResponse) => {
    setLoading(true);
    setError(null);
    try {
      // Do login stuff
      //
      // Gets the JWT response from the google login
      const JWTR = jwtResponse.credential;

      // Sets the JWT response in the local storage
      localStorage.setItem(TokenConfig.UserJWTResponseToken, JWTR as string);

      // makes a post request to the server to get or create the user
      const res = await httpClient.post(UserRoutes.GetOrCreateUser);

      // Sets the user items in the local storage
      localStorage.setItem(TokenConfig.UserTimeoutToken, Date.now().toString());
      // const res = await httpClient.post(uriRoutes.getOrCreateUser, {}, {
      //     headers: {
      //        Authorization: `Bearer ${JWTR}`
      //     }
      // });
      //
      // sets the user items in the local storage
      localStorage.setItem(
        TokenConfig.UserItemsToken,
        JSON.stringify(res.data)
      );

      // is never visible but why not
      toast.success("Successfully logged in");

      // reloads the page
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // Capture and store any errors encountered during the request
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false); // When all is set and done, stop loading
    }
  };
  return { loading, login, error, setError };
};
