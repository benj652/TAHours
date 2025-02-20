import { useState } from "react";
import { authStore } from "@/store";
import { httpClient } from "@/utils";
import { uriRoutes, Comment } from "@/types";
import { ObjectId } from "mongodb";

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
            if (!id) {
                throw new Error("No id provided");
            }
            if (!body) {
                throw new Error("No body provided");
            }
            if (!userItems) {
                throw new Error("No user items found");
            }
            const fullName = userItems?.firstName + " " + userItems?.lastName;
            const res = await httpClient.post(`${uriRoutes.posts.createComment}${id}`, {
                User: fullName,
                Content: body,
                Title: userItems?.profilePic,
            });
            const newComment = (await res.data.comment) as Comment | null;
            if (!newComment) {
                throw new Error("No comment returned");
            }
            return newComment;
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, createComment, error };
};
