import { DeletePostResponse, PostRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

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
  const deletePost = async (id: ObjectId | undefined) => {
    setLoading(true);
    try {
      // Check if the id is provided
      if (!id) {
        throw new Error("No id provided");
      }
      // Send a delete request to the server to delete the post
      const res = await httpClient.delete<DeletePostResponse>(
        `${PostRoutes.DeletePost}${id}`
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.data;
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { loading, deletePost, error };
};
