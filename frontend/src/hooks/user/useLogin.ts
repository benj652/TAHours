import { uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (jwtResponse : CredentialResponse) => {
        setLoading(true);
        setError(null);
        try {
            // Do login stuff
            const JWTR = jwtResponse.credential 
            localStorage.setItem("JWTR", JWTR as string);
            const res = await httpClient.post(uriRoutes.getOrCreateUser)
            localStorage.setItem("token",Date.now().toString());
            // const res = await httpClient.post(uriRoutes.getOrCreateUser, {}, {
            //     headers: {
            //        Authorization: `Bearer ${JWTR}`
            //     }
            // });
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.reload();
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, login, error, setError };
};
