import { uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useCreateTaQueue = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<string | null>(null);

    const createTaQueue = async (
        TAs: ObjectId[],
        ClassId: ObjectId,
        directions: string,
    ) => {
        setLoading(true);
        try {
            if (!TAs || TAs.length === 0) {
                throw new Error("TAs are required");
            }
            if (!ClassId) {
                throw new Error("ClassId is required");
            }
            if (!directions) {
                throw new Error("Directions are required");
            }

            const res = await httpClient.post(uriRoutes.csClass.createTaQueue, {
                TAs,
                Class: ClassId,
                directions,
            });

            const rdata = res.data;
            setData(rdata);
            return rdata;
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "An unknown error has occured",
            );
        } finally {
            setLoading(false);
        }
    };

    return { loading, createTaQueue, error, data };
};
