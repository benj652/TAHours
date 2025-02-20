import { uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

/* Hook to delete posts */
export const useDeletePost = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Function to delete a post
     * @param id - The id of the post to delete
     * @param posts - The current list of posts
     * @param setPosts - The function to set the list of posts
     * */
    const deletePost = async (
        id: ObjectId | undefined
    ) => {
        setLoading(true);
        try {
            if (!id) {
                throw new Error("No id provided");
            }
            const res = await httpClient.delete(`${uriRoutes.posts.deletePost}${id}`);
            await res.data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, deletePost, error };
};
