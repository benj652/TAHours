import { authStore } from "@/store";
import { uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useCreateTicket = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { userItems } = authStore();

    const createTicket = async (
        classId: ObjectId,
        taQueueId: string,
        description: string,
        problem: string,
    ) => {
        setLoading(true);
        try {
            if (!userItems._id) throw new Error("No user id provided");
            if (!description) throw new Error("No description provided");
            if (!taQueueId) throw new Error("No TA queue id provided");

            // send API request to create the ticket
            const res = await httpClient.post(
                `${uriRoutes.ticket.createTicket}${taQueueId}`,
                {
                    studentId: userItems._id,
                    problem: problem,
                    description: description,
                    classId: classId,
                },
            );

            const data = res.data;

            return data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { createTicket, loading, error };
};
