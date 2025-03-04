import { TokenConfig } from "@/types";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";

export const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            // Do logout stuff
            googleLogout();
            localStorage.removeItem(TokenConfig.UserItemsToken);
            localStorage.removeItem(TokenConfig.UserTimeoutToken);
            localStorage.removeItem(TokenConfig.UserJWTResponseToken);
            window.location.reload();
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }

    }
    return { loading, logout, error };
}
