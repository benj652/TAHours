import { Ticket, TicketRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to retrieve user tickets by user ID.
 *
 * This hook provides a function to fetch tickets associated with a specific user ID.
 * It manages loading and error states, and returns the list of tickets.
 *
 * @returns {Object} An object containing:
 * - userTickets: A function that fetches tickets for a given user ID.
 * - loading: A boolean indicating if the fetch operation is in progress.
 * - error: A string containing an error message, if any occurred during the fetch.
 * - tickets: An array of Ticket objects representing the user's tickets.
 */

export const useUserTickets = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  /**
   * Retrieves tickets associated with the given user ID.
   *
   * @param {ObjectId} id - The ID of the user whose tickets to fetch.
   * @returns {Promise<Ticket[]>} A promise that resolves to an array of Ticket objects.
   * If the request fails, the promise resolves to an empty array, and the error message
   * is stored in the error state.
   */
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
