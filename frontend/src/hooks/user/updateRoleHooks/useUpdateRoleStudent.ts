import { authStore, userStore } from "@/store";
import { RolesConfig, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useUpdateRoleStudent = () => {
  const [studentLoading, setStudentLoading] = useState<boolean>(false);
  const [studentError, setStudentError] = useState<string | null>(null);

  const { addUserToCache, getItemsFromCache } = userStore();

  const { userItems } = authStore();

  const updateRoleStudent = async (userId: ObjectId) => {
    setStudentLoading(true);
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

      const res = await httpClient.post(
        `${UserRoutes.UpdateRoleStudent}${userId}`,
      );

      const rdata = res.data;

      if (!rdata) {
        throw new Error("User not found");
      }
      const user = getItemsFromCache(userId as string);
      if (!user) {
        throw new Error("User not found");
      }
      user.roles = RolesConfig.Student;
      addUserToCache(user);
    } catch (err) {
      setStudentError(err.message);
    } finally {
      setStudentLoading(false);
    }
  };
  return { studentLoading, studentError, updateRoleStudent };
};
