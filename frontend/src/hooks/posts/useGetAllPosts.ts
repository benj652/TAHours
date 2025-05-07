/**
 * useGetAllPosts.ts
 *  Hook to get all posts
 *  @returns loading - A boolean indicating if the request is still loading
 *  @returns error - A string indicating the error message
 *  @returns data - An array of posts
 *  @returns setData - A function to set the data
 *  @returns getAllPosts - A function to get all posts
 *
 *  I kinda changed how it works a bit but its still chillen at the moment of this comment
 *  lowkey bussin frfr
 */
import { threadStore } from "@/store";
import { Post, PostRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

export const useGetAllPosts = () => {
  // Reactive State
  const [loading, setLoading] = useState<boolean>(false); // Set the loading state to false
  const [error, setError] = useState<string | null>(null); // Set the error state to null
  const [data, setData] = useState<Post[] | null>(null); // Set the data state to null This is what is returned

  // unpack the threadStore
  const {
    setFetched,
    setData: setCachedData,
    data: cachedData,
  } = threadStore();

  /**
   *  Function to get all posts
   *
   *  It cahces them all too
   *
   *  Pretty swell frfr
   */
  const getAllPosts = async () => {
    setLoading(true); // Set the loading state to true
    try {
      // Do get all posts stuff
      // If the data is already cached, we just set the data to the cached data
      if (cachedData && cachedData.length > 0) {
        setData(cachedData);
        setFetched(true); // Set the fetched state to true
      } else {
        // otherwise: we make a request to the server to get all posts
        const res = await httpClient.get(PostRoutes.GetAllPosts);
        const data = (await res.data) as Post[] | null;
        setData(data);
        setCachedData(data);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // Set the error state to the error message if an error happens
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false); // after all, set loading to false
    }
  };
  return { loading, getAllPosts, error, data, setData }; // return the loading, error, data, and setData
};
