import { authStore, userStore } from "@/store";
import { User, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook: useUpdateUserDesc
 *
 * This is the hook that handles updating the user's description.
 */

export const useUpdateUserDesc = () => {
  const [loading, setDescriptionLoading] = useState<boolean>(false);
  const [error, setDescriptionError] = useState<string | null>(null);

  const { addUserToCache, getItemsFromCache } = userStore();
  const { userItems } = authStore();
  /**
   * Function to update the user's description
   *
   * @param userId - The ObjectId of the user to update
   * @param newDesc - The new description for the user
   */
  const updateUserDesc = async (userId: ObjectId, newDesc: string) => {
    setDescriptionLoading(true);
    try {
      if (!userId || !newDesc) {
        throw new Error("Invalid parameters");
      }

      // Log the URL and request data to debug
      console.log(`Updating description for user ${userId} with: ${newDesc}`);

      const res = await httpClient.post(
        `${UserRoutes.UpdateUserDesc}${userId}`,
        { description: newDesc }
      );

      const rdata = res.data;
      if (!rdata) {
        throw new Error("Failed to update description");
      }

      // Get the user from cache or create a new one if not found
      //@ts-ignore
      let user = getItemsFromCache(userId as string);

      if (!user) {
        // If no user exists, create a new user with default params
        user = {
          _id: userItems._id,
          description: newDesc,
          firstName: userItems.firstName,
          accessToken: userItems.accessToken,
          email: userItems.email,
          lastName: userItems.lastName,
          profilePic: userItems.profilePic,
          roles: userItems.roles,
        } as User;
      } else {
        user.description = newDesc;
      }

      // Add user to the cache
      addUserToCache(user);
      toast.success("Description changed");
    } catch (err) {
      // Enhanced error logging to see full error object
      console.error("Error updating user description:", err);
      setDescriptionError(
        err instanceof Error ? err.message : "An error occurred"
      );
    } finally {
      setDescriptionLoading(false);
    }
  };

  return { loading, error, updateUserDesc };
};
