import { authStore, userStore } from "@/store";
import { RolesConfig, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

/**
 * Hook to update the role of a user to TA
 */
export const useUpdateRoleTA = () => {
  const [taLoading, setTaLoading] = useState<boolean>(false);
  const [taError, setTaError] = useState<string | null>(null);

  const { addUserToCache, getItemsFromCache } = userStore();

  const { userItems } = authStore();

  /**
   * Function to update the role of a user to TA
   * @param userId - the id of the user to update
   * @returns - void
   * @throws - Error
   * blah blah blaju
   */
  const updateRoleTA = async (userId: ObjectId) => {
    setTaLoading(true);
    try {
      if (!userItems) {
        throw new Error("User not found");
      }
      if (
        userItems.roles != RolesConfig.Admin &&
        userItems.roles != RolesConfig.Professor
      ) {
        throw new Error("User is not an allowed to update this user");
      }
      if (!userId) {
        throw new Error("User not found");
      }

      const res = await httpClient.post(`${UserRoutes.UpdateRoleTA}${userId}`);

      const rdata = res.data;

      if (!rdata) {
        throw new Error("User not found");
      }
      const user = getItemsFromCache(userId as string);
      if (!user) {
        throw new Error("User not found");
      }
      user.roles = RolesConfig.Ta;
      addUserToCache(user);
    } catch (err) {
      setTaError(err.message);
    } finally {
      setTaLoading(false);
    }
  };
  return { taLoading, taError, updateRoleTA };
};
