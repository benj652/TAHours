import { userStore } from "@/store";
import { User, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook to get all users
 *
 * This hook is used on the Professor view, tp get all users
 * So that they can change thier roles
 *
 * It manages loading and error states and makes an API call to get all use
 * of the users
 *
 * Unlike most hooks on this app, this one DOES NOT cache the API reequest
 * in total, it only adds all users to the existing cache
 *
 * This means, that whenenever this is called (it is called once upon mount) it sends a new API
 * Request and updates the cache
 */
export const useGetAllUsers = () => {
  // Reactive state for this component
  const [loading, setLoading] = useState<boolean>(false); // Indicate that a request is in progress
  const [data, setData] = useState<User[] | null>(null); // Store the fetched data
  const [error, setError] = useState<string | null>(null); // Store any errors encountered during the request

  // unpack the user store
  const { addUserToCache } = userStore();

  /**
   *  Function to get all users
   *  This function gets all users from the API
   *  and updates the cache
   *  It also sets the data state
   *  and returns the data
   *
   *  It does not rely on cached data when caled
   */
  const getAllUsers = async () => {
    setLoading(true); // Indicate that a request is in progress
    try {
      // Do the API request
      const res = await httpClient.get<User[]>(UserRoutes.GetAllUsers);
      // Get the data from the response
      const rdata = res.data;

      // If no data is returned, throw an error
      if (!rdata) {
        throw new Error("No users found");
      }

      // Loop through the data and add each user to the cache
      for (const user of rdata) {
        addUserToCache(user);
      }

      setData(rdata); // Set the data state
      return rdata; // Return the data
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // Capture and store any errors encountered during the request
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };
  return { loading, getAllUsers, data, error }; // Return the state values and function for use in components
};
