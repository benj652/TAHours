import { useState } from "react";
import { httpClient } from "@/utils";
import { uriRoutes, Post} from "@/types";

export const useGetAllPosts = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Post[] | null>(null);

    const getAllPosts = async () => {
        setLoading(true);
        try {
            // Do get all posts stuff
            const res = await httpClient.get(uriRoutes.posts.getAllPosts);
            const data = await res.data as Post[] | null;
            setData(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, getAllPosts, error, data, setData};
};
