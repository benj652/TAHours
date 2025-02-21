import { uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useResolveTicket = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resolveTicket = async (ticketId: ObjectId, taNote: string) => {
    setLoading(true);
    setError(null);
    try {
      // Validate the input
      if (!ticketId) throw new Error("Ticket ID is required");
      if (!taNote) throw new Error("TA Note is required");

      // Send a request to the server
      const res = await httpClient.post(
        `${uriRoutes.ticket.resoloveTicket}${ticketId}`,
        { taNote },
      );

      const data = await res.data;
      if (!data) throw new Error("No data received");
      return "Ticket resolved successfully";
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, resolveTicket };
};
