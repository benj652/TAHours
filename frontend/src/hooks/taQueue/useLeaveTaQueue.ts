import { TaQueueLeaveResponse, TaQueueRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook: useLeaveTaQueue
 *
 * This hook provides functionality for a TA (Teaching Assistant) to leave a queue.
 * It manages loading and error states and makes an API call to remove the TA.
 *
 * If the last TA leaves the queue, the corresponding class state might need to be updated.
 *
 *   - loading: Boolean indicating if the request is in progress.
 *   - error: A string representing any error that occurred.
 *   - leaveTaQueue: Function to initiate the process of leaving the TA queue.
 */
export const useLeaveTaQueue = () => {
  // State to track whether the API request is in progress
  const [loading, setLoading] = useState(false);

  // State to store any error messages encountered during the request
  const [error, setError] = useState<string | null>(null);

  /**
   * Function: leaveTaQueue
   *
   * Allows a TA to leave a queue by making an API call.
   * If the TA is the last one in the queue, the backend is expected to handle class state updates.
   */
  const leaveTaQueue = async (taQueueId: ObjectId, classId: ObjectId) => {
    setLoading(true); // Indicate that a request is in progress
    try {
      // Ensure required parameters are provided before making the API request
      if (!taQueueId) throw new Error("TaQueue ID is required");
      if (!classId) throw new Error("Class ID is required");

      // Send a request to the server to remove the TA from the queue
      // If the TA is the last one in the queue, it stops the queue and updates the class state
      // The class will have no active queue if it is the last TA leaving
      const res = await httpClient.post<TaQueueLeaveResponse>(
        `${TaQueueRoutes.RemoveTa}${taQueueId}`, // Constructing API endpoint dynamically
        {
          classId: classId,
        }
      );

      const data = res.data; // Extract the response data

      return data; // Return API response data
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      // Capture and store any errors encountered during the request
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      toast.success("Left TA session successfully");
      setLoading(false); // Reset loading state after the request completes
    }
  };

  // Return the state values and function for use in components
  return { loading, error, leaveTaQueue };
};
