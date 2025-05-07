/**
 * useGetCSClassts
 * Hook to get a single class
 *
 * @ returns - loading, error, data, getCSClass
 *
 * Uses the httpClient to make a get request to return a single class
 */
import { CSClass } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

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
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, getCSClass, data, error };
};
