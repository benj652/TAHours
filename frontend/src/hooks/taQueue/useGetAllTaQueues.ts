import { taQueueStore } from "@/store";
import { TaQueue, uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";

export const useGetAllTaQueues = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<TaQueue[] | null>(null);

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
            const res = await httpClient.get<TaQueue[]>(uriRoutes.taQueue.getAll);
            const rdata = res.data;
            setTaQueues(rdata);
            return data;
        } catch (error) {
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
