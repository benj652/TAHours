import { ticketStore } from "@/store";
import { TicketRoutes } from "@/types";
import { RANDOM_OBJECT_ID } from "@/types/misc";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

export const useResolveTicket = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getTicketFromCache, addTicketToCache } = ticketStore();
  const resolveTicket = async (
    ticketId: ObjectId,
    taNote: string,
    problemType: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      // Validate the input
      if (!ticketId) throw new Error("Ticket ID is required");
      if (!taNote) throw new Error("TA Note is required");
      if (!problemType) throw new Error("Problem type is required");

      // Send a request to the server
      const res = await httpClient.post(
        `${TicketRoutes.ResolveTicket}${ticketId}`,
        {
          taNote,
          newProblemType: problemType,
        }
      );
      console.log(res);

      const data = await res.data;
      if (!data) throw new Error("No data received");

      const resolved = getTicketFromCache(ticketId);
      if (resolved) {
        //@ts-expect-error no type
        resolved.taId = RANDOM_OBJECT_ID as ObjectId;
        //@ts-expect-error no type
        addTicketToCache({ resolved });
      }
      toast.success("Ticket resolved successfully");
      return "Ticket resolved successfully";
    } catch (error) {
      toast.error("Failed to resolve ticket");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, resolveTicket };
};
