import { authStore } from "@/store";
import { Post, PostRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

/*
 * Hook to create posts. Because of how the DB is set up, there is no space for profile pictures but there is a space for titles.
 * To counteract this, and because both titles and profile pics can be stored as strings, the title parameter will serve as
 * profile pics. Also, The date is usefull. But because we have no date in the DB. It will just be stored as part
 * of the usename for now.
 * */
export const useCreatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { userItems } = authStore();
  /**
   * Function to send a post to the backend to create a post
   * @param body - The body of the post
   * */
  const createPost = async (body: string): Promise<Post | void> => {
    setLoading(true);
    try {
      if (!body) {
        throw new Error("No body provided");
      }
      if (!userItems) {
        throw new Error("No user items found");
      }
      // format the date and time
      const now = new Date();
      const formattedDate = now.toLocaleString("en-US", {
        weekday: "long", // e.g., "Monday"
        year: "numeric", // e.g., "2025"
        month: "long", // e.g., "February"
        day: "numeric", // e.g., "19"
        hour: "2-digit", // e.g., "02"
        minute: "2-digit", // e.g., "05"
        second: "2-digit", // e.g., "45"
        hour12: true, // Use 12-hour clock (AM/PM)
      });
      // add the formatted date-time to the body as there is no data param of the post.
      // Also, concatinate the users full name from app state.
      const fullName =
        userItems?.firstName +
        " " +
        userItems?.lastName +
        "------" +
        formattedDate;
      const title = userItems?.profilePic;
      const res = await httpClient.post(PostRoutes.CreatePost, {
        user: fullName,
        title: title,
        body: body,
      });
      await res.data;
      toast.success("Post created successfully");
      return res.data.post as Post;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      // Once we have done everything we want to, set the loading to false.
      setLoading(false);
    }
  };
  return { loading, createPost, error };
};
