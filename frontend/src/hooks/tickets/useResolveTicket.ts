import { authStore, ticketStore } from "@/store";
import { Role, TicketRoutes } from "@/types";
import { RANDOM_OBJECT_ID } from "@/types/misc";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

/**
 * A hook to resolve a ticket.
 *
 * @returns An object with a function to resolve a ticket, a boolean indicating if the function is loading, and a string with an error message if there was an error.
 */
export const useResolveTicket = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userItems } = authStore();

  const { getTicketFromCache, addTicketToCache } = ticketStore();
  /**
   * Resolve a ticket.
   *
   * This function sends a request to the server to update the ticket with the given TA note and problem type.
   * If the request is successful, the ticket is updated in the cache and a success message is displayed.
   * If the request fails, an error message is displayed.
   *
   * @param {ObjectId} ticketId - The ID of the ticket to resolve
   * @param {string} taNote - The note written by the TA
   * @param {string} problemType - The type of the problem
   * @returns {Promise<string | null>} A promise that resolves to a success message if the ticket is resolved successfully, or a null if there is an error
   */
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
      const role = userItems.roles;
      if (role !== Role.Ta && role !== Role.Professor && role !== Role.Admin) {
        throw new Error("You do not have permission to resolve tickets");
      }

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
