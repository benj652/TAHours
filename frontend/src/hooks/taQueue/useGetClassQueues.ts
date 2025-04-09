import { analyticsPageStore, taQueueStore } from "@/store";
import { TaQueue, TaQueueRoutes, Ticket } from "@/types";
import { getDateRange, httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to get all TA queues
 *
 * Seems to be working for now
 */
export const useGetClassQueues = (classId: ObjectId) => {
  // Reactive state
  const [loading, setLoading] = useState<boolean>(true); // loading state
  const [error, setError] = useState<string | null>(null); // error state
  const [data, setData] = useState<TaQueue[] | null>(null); // return data state

  // unpacking the taQueue store
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

  // unpacking Analytics store
  const {
    selectedDates,
    selectedClassQueues,
    setSelectedClassQueues,
    setInRangeQueues,
    selectedTickets,
    setSelectedTickets,
  } = analyticsPageStore();

  /**
   * Function to get all ta queues associated with a given clas
   * @throws {Error} - Throws an error if there is an issue fetching the data
   *
   */
  const getClassQueues = async () => {
    setLoading(true);
    try {
      // If we already feteched the queues, use cached respones
      if (fetchedAllTaQueues) {
        setData(allTaQueues);
        return data;
      }

      //setSelectedClass(classId);

      // send API request to get the queues
      const res = await httpClient.get<TaQueue[]>(
        TaQueueRoutes.GetClassQueues + classId
      );

      const rdata = res.data;
      setSelectedClassQueues(rdata);

      let date;

      if (!selectedDates) {
        date = null;
      } else if (selectedDates == "Class Creation") {
        date = null;
      } else {
        date = getDateRange(selectedDates);
      }

      if (date == null) {
        setInRangeQueues(rdata);
      } else {
        setInRangeQueues(
          rdata.filter((queue) => {
            return queue.date.toString() <= date;
          })
        );
      }

      const { inRangeQueues } = analyticsPageStore();

      const internalTickets: Ticket[] = [];

      if (!inRangeQueues) {
        setSelectedTickets(null);
        return data;
      }

      for (const queue of inRangeQueues) {
        const tickets = queue.tickets;
        internalTickets.push(tickets);
      }
      setSelectedTickets(internalTickets);

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
    getClassQueues,
    setTaQueues,
  };
};
