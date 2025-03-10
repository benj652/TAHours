import { taQueueStore } from "@/store";
import { TaQueue, TaQueueRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to get all TA queues
 *
 * Seems to be working for now
 */
export const useGetAllTaQueues = () => {
  // Reactive state
  const [loading, setLoading] = useState<boolean>(true); // loading state
  const [error, setError] = useState<string | null>(null); // error state
  const [data, setData] = useState<TaQueue[] | null>(null); // return data state

  // unpacking the store
  const {
    fetchedAllTaQueues,
    setAllTaQueues,
    setFetchAllTaQueues,
    allTaQueues,
  } = taQueueStore();

  // helper function to change TA queues in both the cache and locally
  const setTaQueues = async (taQueues: TaQueue[]) => {
    setAllTaQueues(taQueues);
    setData(taQueues);
  };

  /**
   * Function to get all ta queues
   * @throws {Error} - Throws an error if there is an issue fetching the data
   *
   * dont think anything boiut it is overtly sus aside from the fact that
   * there is an isActive parameter on the TA queues, which I am pretty sure
   * is just some deprecateed trash
   */
  const getAllTaQueues = async () => {
    setLoading(true);
    try {
      // If we already feteched the queues, use cached respones
      if (fetchedAllTaQueues) {
        setData(allTaQueues);
        return data;
      }

      // send API request to get the queues
      const res = await httpClient.get<TaQueue[]>(TaQueueRoutes.GetAll);
      const rdata = res.data;
      setTaQueues(rdata);
      return data;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setFetchAllTaQueues(true);
      setLoading(false);
    }
  };
  return {
    loading,
    data,
    error,
    getAllTaQueues,
    setTaQueues,
  };
};
