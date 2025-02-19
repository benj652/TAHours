import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async () => {
        setLoading(true);
        setError(null);
        try {
            // Do login stuff
            localStorage.setItem("token", Date.now().toString());
            window.location.reload();
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, login, error, setError };
};
