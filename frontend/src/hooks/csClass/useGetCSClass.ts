import { CSClass } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";

export const useGetCSClass = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<CSClass | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getCSClass = async (classId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await httpClient.get(`/api/cs-class/get/${classId}`);
            setData(response.data);
            return data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, getCSClass, data, error };
};
