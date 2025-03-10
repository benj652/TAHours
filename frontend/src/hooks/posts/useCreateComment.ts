import { authStore } from "@/store";
import { Comment, PostRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to create a comment
 *
 * websocketws in this one already
 *
 *We are so bakc we chilling bois
 */
export const useCreateComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { userItems } = authStore();
  /**
   * Creates a comment
   * @param id - The id of the post to create a comment for
   * @param body - The body of the comment
   * returns - The new comment
   * */
  const createComment = async (id: ObjectId | undefined, body: string) => {
    setLoading(true);
    try {
      // If the id field is empty, throw an error
      if (!id) {
        throw new Error("No id provided");
      }
      // If the body field is empty, throw an error
      if (!body) {
        throw new Error("No body provided");
      }
      // If the userItems field is empty, throw an error
      if (!userItems) {
        throw new Error("No user items found");
      }
      const fullName = userItems?.firstName + " " + userItems?.lastName; // concatenate the first and last name

      // send a post request to the server to create a new comment
      const res = await httpClient.post(`${PostRoutes.CreateComment}${id}`, {
        User: fullName,
        Content: body,
        Title: userItems?.profilePic,
      });
      const newComment = (await res.data.comment) as Comment | null;

      // If no comment is returned, throw an error
      if (!newComment) {
        throw new Error("No comment returned");
      }
      // Return the new comment
      return newComment;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setError(error instanceof Error ? error.message : "An error occurred"); // set the error state to the error message
    } finally {
      toast.success("Comment created");
      setLoading(false); // set the loading state to false
    }
  };
  return { loading, createComment, error }; // return the loading, createComment, and error states
};
