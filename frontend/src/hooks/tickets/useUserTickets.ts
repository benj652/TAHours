import { Ticket, TicketRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

export const useUserTickets = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const userTickets = async (id: ObjectId) => {
    setLoading(true);
    try {
      if (!id) throw new Error("No user ID provided");

      const res = await httpClient.get<{ message: string; data: Ticket[] }>(
        `${TicketRoutes.UserTickets}${id.toString()}`
      );

      setTickets(res.data.data);
      return res.data.data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { userTickets, loading, error, tickets };
};
