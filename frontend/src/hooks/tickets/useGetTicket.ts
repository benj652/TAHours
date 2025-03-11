import { ticketStore } from "@/store";
import { Ticket, TicketRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { toast } from "sonner";

export const useGetTicket = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket>();

  const { getTicketFromCache, addTicketToCache } = ticketStore();
  // getTicket is a function that takes in an ObjectId and returns a ticket object
  // it sets the loading state to true, and tries to get the ticket from the cache
  // if the ticket is in the cache, it sets the ticket state to the cached ticket and returns it
  // if the ticket is not in the cache, it sends an API request to get the ticket
  // if the request is successful, it sets the ticket state to the ticket data and caches the ticket
  // if the request fails, it sets the error state to the error message
  // finally, it sets the loading state to false
  // the function returns the ticket object
  const getTicket = async (id: ObjectId) => {
    setLoading(true);
    try {
      if (!id) throw new Error("No ticket id provided");

      // check if ticket is in cache
      const cachedTicket = getTicketFromCache(id);
      if (cachedTicket) {
        setTicket(cachedTicket);
        return ticket;
      }
      // send API request to get the ticket
      const res = await httpClient.get<Ticket>(
        `${TicketRoutes.GetTicket}${id}`
      );
      const data = res.data;

      setTicket(data);

      // cache the ticket
      addTicketToCache(data);
      return ticket;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { getTicket, loading, error, ticket };
};
