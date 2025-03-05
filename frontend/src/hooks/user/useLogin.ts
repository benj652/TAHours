import { TokenConfig, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";

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
    const login = async (jwtResponse : CredentialResponse) => {
        setLoading(true);
        setError(null);
        try {
            // Do login stuff
            const JWTR = jwtResponse.credential 
            localStorage.setItem(TokenConfig.UserJWTResponseToken, JWTR as string);
            const res = await httpClient.post(UserRoutes.GetOrCreateUser)
            localStorage.setItem(TokenConfig.UserTimeoutToken, Date.now().toString());
            // const res = await httpClient.post(uriRoutes.getOrCreateUser, {}, {
            //     headers: {
            //        Authorization: `Bearer ${JWTR}`
            //     }
            // });
            localStorage.setItem(TokenConfig.UserItemsToken, JSON.stringify(res.data));
            window.location.reload();
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, login, error, setError };
};
