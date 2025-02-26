import { useState } from "react";
import { httpClient } from "@/utils";
import { uriRoutes, Post } from "@/types";
import { threadStore } from "@/store";

export const useGetAllPosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Post[] | null>(null);
  const {
    setFetched,
    setData: setCachedData,
    data: cachedData,
  } = threadStore();

  const getAllPosts = async () => {
    setLoading(true);
    try {
      // Do get all posts stuff
    if (cachedData && cachedData.length > 0) {
        setData(cachedData);
      } else {
        const res = await httpClient.get(uriRoutes.posts.getAllPosts);
        const data = (await res.data) as Post[] | null;
        setData(data);
        setCachedData(data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setFetched(true);
      setLoading(false);
    }
  };
  return { loading, getAllPosts, error, data, setData };
};
