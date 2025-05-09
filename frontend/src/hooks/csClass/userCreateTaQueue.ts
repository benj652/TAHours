/**
 * useCreateTaQueue.ts
 * Hook to create a TA Queue
 *
 * @ returns - loading, error, data, createTaQueue
 *
 * Uses the httpClient to make a post request to the server to create a new TaQueue
 */
import { CreateTaQueueResponse, CsClassRoutes, TaQueue } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to create a TA queue
 *
 *  Works well for now
 *
 *  Big slump gorb moment
 *
 * Hey thats not a great comment -Zach
 * I disagree!! -Anya
 */
export const useCreateTaQueue = () => {
  // State variables
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [data, setData] = useState<TaQueue | null>(null); // Data state for response data

  /**
   * Function to create a TA queue
   * @param TAs - The TAs to add to the queue
   * @param ClassId - The class to add the queue to
   * @param directions - The directions for the queue
   *
   *returns - The new TA queue
   * Chill function atm
   * will need to add websockets as always
   */
  const createTaQueue = async (
    TAs: ObjectId[],
    ClassId: ObjectId,
    directions: string
  ) => {
    setLoading(true); // Sets the loading state as we start the call
    try {
      // If the TAs field is empty, throw an error, as you can not start an empty TA queue
      if (!TAs || TAs.length === 0) {
        throw new Error("TAs are required");
      }
      // If the ClassId field is empty, throw an error
      if (!ClassId) {
        toast.error("ClassId is required");
        throw new Error("ClassId is required");
      }
      // A ta queue needs directions so the simpltons are not lost in destress
      if (!directions) {
        toast.error("Directions are required");
        throw new Error("Directions are required");
      }

      const res = await httpClient.post<CreateTaQueueResponse>(
        CsClassRoutes.CreateTaQueue,
        {
          TAs,
          Class: ClassId,
          directions,
        }
      );

      const rdata = res.data;
      setData(rdata);
      toast.success("Ta queue created");
      return rdata;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error has occured"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, createTaQueue, error, data };
};
