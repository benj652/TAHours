import { userStore } from "@/store";
import { uriRoutes, User } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";

export const useGetAllUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addUserToCache } = userStore();

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await httpClient.get<User[]>(uriRoutes.user.getAllUsers);
      const rdata = res.data;
      if (!rdata) {
        throw new Error("No users found");
      }
      for (const user of rdata) {
        addUserToCache(user);
      }
      setData(rdata);
      return rdata;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { loading, getAllUsers, data, error };
};
