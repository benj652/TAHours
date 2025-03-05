import { authStore } from "@/store";
import { Ticket, TicketRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

/**
 * Hook for creating a ticket
 * returns {Object} - The ticket object, loading state, and error state
 *
 * Works nice for now
 * may want to implement websockets to this
 *
 * Ben epic
 */
export const useCreateTicket = () => {
  // Reactive state
  const [loading, setLoading] = useState<boolean>(false); // Set loading state
  const [error, setError] = useState<string | null>(null); // Set error state

  const { userItems } = authStore(); // Get the user's information from the auth store

  /**
   * Function to create the ticket
   * @param classId - The id of the class the ticket is for
   * @param taQueueId - The id of the TA queue the ticket is for
   * @param description - The description of the ticket
   * @param problem - The problem of the ticket
   * @param curType - The type of the ticket
   * @param screenshots - The screenshots of the ticket
   *
   * Throws errors if the user has no id, no description, or no TA queue id
   * or if it is sent ot an invalid TA queue
   */
  const createTicket = async (
    classId: ObjectId,
    taQueueId: string,
    description: string,
    problem: string,
    curType: string,
    screenshots: string[],
  ) => {
    // console.log(screenshots);
    setLoading(true); // start the loading state
    try {
      // if the userItems field is empty, throw an error
      if (!userItems._id) throw new Error("No user id provided");
      // if the description field is empty, throw an error
      if (!description) throw new Error("No description provided");
      // if the taQueueId field is empty, throw an error
      if (!taQueueId) throw new Error("No TA queue id provided");

      // send API request to create the ticket
      const res = await httpClient.post<Ticket>(
        `${TicketRoutes.CreateTicket}${taQueueId}`,
        {
          studentId: userItems._id,
          problem: problem,
          description: description,
          classId: classId,
          problemType: curType,
          screenshots: screenshots,
        },
      );
      // console.log(res);

      const data = res.data;

      return data; // return the data as a ticket
    } catch (error) {
      // if an error occurs, set the error state to the error message
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false); // aftrer all is done, set the loading state to false
    }
  };
  return { createTicket, loading, error }; // return the createTicket function, loading state, and error state
};
