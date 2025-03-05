import { csClassStore } from "@/store";
import { CSClass, CsClassRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";

/**
 * hook to get all active classes
 * does not require any parameters
 */
export const useGetActiveClasses = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CSClass[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    getActiveCSClassesFetched,
    setGetActiveCSClassesFetched,
    getActiveCSClassesData,
    setGetActiveCSClassesData,
  } = csClassStore();

  /**
   * fuction to get all active classes
   * @throws {Error} - Throws an error if there is an issue fetching the data
   * @example
   * const { loading, getActiveClasses, data, error } = useGetActiveClasses();
   * getActiveClasses().then((activeClasses) => console.log(activeClasses));
   *
   * Does not require any parameters
   * Caches the data after the first fetch to the local storage
   * If the data has already been fetched, it will return the cached data
   * If the data has not been fetched, it will fetch the data and cache it
   **/
  const getActiveClasses = async () => {
    // Start loading while we fetch the data
    setLoading(true);
    setError(null);
    try {
      // If we have already fetched the active classes, return the cached data.
      if (getActiveCSClassesFetched) {
        setData(getActiveCSClassesData);
        return data;
      }
      const res = await httpClient.get<CSClass[]>(
        CsClassRoutes.GetActiveClasses,
      );

      // Set the data in the store to cache it
      const rdata = res.data;
      setGetActiveCSClassesData(rdata);
      setData(rdata);
      return rdata;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      // Set loading to false and say we have cached the data
      setGetActiveCSClassesFetched(true);
      setLoading(false);
    }
  };
  return { loading, getActiveClasses, data, error };
};
