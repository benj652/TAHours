import { uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useJoinTaQueue = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const joinTaQueue = async (taQueueId: ObjectId) => {
    setLoading(true);
    setError(null);
    try {
      if (!taQueueId) throw new Error("TaQueue ID is required");
      // Send a request to the server
      const res = await httpClient.post(
        `${uriRoutes.taQueue.addTa}${taQueueId}`,
      );
      await res.data;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, joinTaQueue };
};
