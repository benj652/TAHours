
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

/**
 * Custom hook to fetch a CS class by its ID.
 *
 * @returns loading - A boolean indicating if the request is still loading
 * @returns getCSClass - A function to initiate the fetch request with the given class ID
 * @returns data - A CSClass object containing the fetched class data, or null if not fetched
 * @returns error - A string indicating the error message, or null if no error occurred
 *
 * @example
 * const { loading, getCSClass, data, error } = useGetCSClass();
 * useEffect(() => {
 *   getCSClass("classId123");
 * }, []);
 */
export const useGetCSClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CSClass | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches a CS class by its ID.
   *
   * @param classId - The ID of the class to fetch
   * @returns The fetched CS class, or null if no class was found
   * @throws {Error} - Throws an error if there is an issue fetching the class
   */
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
