import { CreateCSClassParams } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react"

export const useCreateCSClass = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ObjectId | null>(null);

    const createCSClass = async ({name, semester, year}: CreateCSClassParams) => {
        try {
            if(!name) {
                throw new Error("Name is required");
            }
            if(!semester) {
                throw new Error("Semester is required");
            }
            if(!year) {
                throw new Error("Year is required");
            }
            const response = await httpClient.post<{ id: ObjectId }>(`/api/cs-class/create`, {name, semester, year});
            setData(response.data.id);
            return data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error has occured") 
        } finally {
            setLoading(false);
        }
    }
    return { loading, createCSClass, error, data };
}
