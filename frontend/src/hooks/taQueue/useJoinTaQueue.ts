import { TaQueueRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/** Hook to join a TA queue */
export const useJoinTaQueue = () => {
  // react state variables
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  /**
   * Functio nto join a Ta queue
   * @param taQueueId - The id of the ta queue to join
   *
   * It works well for now
   */
  const joinTaQueue = async (taQueueId: ObjectId) => {
    setLoading(true); // set the loading state as we start the call
    setError(null);
    try {
      // If the taQueueId field is empty, throw an error
      if (!taQueueId) throw new Error("TaQueue ID is required");
      // Send a request to the server
      const res = await httpClient.post(`${TaQueueRoutes.AddTa}${taQueueId}`);
      toast.success("Joined TA session successfully");
      await res.data;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // If an error occurs, set the error state to the error message
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false); // set the loading state to false once everything is ran through
    }
  };
  return { loading, error, joinTaQueue }; // return the loading state, error state, and the joinTaQueue function
};
