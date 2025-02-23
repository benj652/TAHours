import { ticketStore } from "@/store";
import { uriRoutes } from "@/types";
import { RANDOM_OBJECT_ID } from "@/types/misc";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useResolveTicket = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { getTicketFromCache, addTicketToCache } = ticketStore();
    const resolveTicket = async (
        ticketId: ObjectId,
        taNote: string,
        problemType: string,
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
                `${uriRoutes.ticket.resoloveTicket}${ticketId}`,
                {
                    taNote,
                    newProblemType: problemType,
                },
            );
            console.log(res);

            const data = await res.data;
            if (!data) throw new Error("No data received");

            const resolved = getTicketFromCache(ticketId);
            if (resolved) {
                //@ts-ignore
                resolved.taId = RANDOM_OBJECT_ID as ObjectId;
                //@ts-ignore
                addTicketToCache({ resolved });
            }
            return "Ticket resolved successfully";
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, resolveTicket };
};
