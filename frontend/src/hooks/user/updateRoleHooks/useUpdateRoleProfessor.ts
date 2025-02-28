import { authStore, userStore } from "@/store";
import { RolesConfig, rolesConfig, uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useUpdateRoleProfessor = () => {
  const [professorLoading, setProfessorLoading] = useState<boolean>(false);
  const [professorError, setProfessorError] = useState<string | null>(null);

  const { addUserToCache, getItemsFromCache } = userStore();

  const { userItems } = authStore();

  const updateRoleProfessor = async (userId: ObjectId) => {
    setProfessorLoading(true);
    try {
      if (!userItems) {
        throw new Error("User not found");
      }
      if (
        userItems.roles != rolesConfig.admin &&
        userItems.roles != rolesConfig.professor
      ) {
        throw new Error("User is not an allowed to update this user");
      }
      if (!userId) {
        throw new Error("User not found");
      }

      const res = await httpClient.post(
        `${uriRoutes.user.UPDATE_ROLE_PROFESSOR}${userId}`,
      );

      const rdata = res.data;

      if (!rdata) {
        throw new Error("User not found");
      }
      const user = getItemsFromCache(userId as string);
      if (!user) {
        throw new Error("User not found");
      }
      user.roles = RolesConfig.Professor;
      addUserToCache(user);
    } catch (err) {
      setProfessorError(err.message);
    } finally {
      setProfessorLoading(false);
    }
  };
  return { professorLoading, professorError, updateRoleProfessor };
};
