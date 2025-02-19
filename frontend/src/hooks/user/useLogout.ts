import { googleLogout } from "@react-oauth/google";
import { useState } from "react";

export const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            googleLogout();
            localStorage.removeItem("token");
            localStorage.removeItem("JWTR");
            localStorage.removeItem("user");
            window.location.reload();
            // Do logout stuff
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }

    }
    return { loading, logout, error };
}
