import { userStore } from "@/store";
import { User, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook: useGetUser
 *
 * It gets a user from the server and caches it
 *
 * What can i say, it gets a user
 *
 * If the user is already in the cache, it does not make a api call
 * It just returns the user from the cache
 * otherwise it fetches the user from the server
 * and caches it
 *
 * so efficient
 *
 * genius play
 */
export const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const { getItemsFromCache, addUserToCache } = userStore();

  // The id parameter can be changed to a string if need be
  const getUser = async (id: ObjectId) => {
    // console.log("Getting user", id);
    setLoading(true);
    try {
      if (!id) throw new Error("No user id provided");

      // Check if the user is in the cache
      const cachedUser = getItemsFromCache(id.toString());
      if (cachedUser) {
        // console.log("User fetched from cache", cachedUser);
        setUser(cachedUser);
        return cachedUser;
      }

      // If not, fetch the user from the server
      const res = await httpClient.get<User>(`${UserRoutes.GetOneUser}${id}`);
      // console.log("User fetched", res.data);
      const data = res.data;
      setUser(data);
      // Cache the user
      addUserToCache(data);

      return data;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // Capture and store any errors encountered during the request
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      // Reset loading state after the request completes
      setLoading(false);
    }
  };
  return { loading, user, getUser, error, setError }; // Return the state values and function for use in components
};
