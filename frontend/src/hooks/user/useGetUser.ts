import { userStore } from "@/store";
import { User, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useGetUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const { getItemsFromCache, addUserToCache } = userStore();

    // The id parameter can be changed to a string if need be
    const getUser = async (id: ObjectId) => {
        // console.log("Getting user", id);
        setLoading(true);
        try {
            if(!id) throw new Error("No user id provided");
            
            // Check if the user is in the cache
            const cachedUser = getItemsFromCache(id.toString());
            if(cachedUser){
                // console.log("User fetched from cache", cachedUser);
                setUser(cachedUser);
                return cachedUser;
            } 

            // If not, fetch the user from the server
            const res = await httpClient.get<User>(`${UserRoutes.GetOneUser}${id}`);
            // console.log("User fetched", res.data);
            const data = res.data;
            setUser(data);
            // Cache the user
            addUserToCache(data);
            
            return data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { loading, user, getUser, error, setError };
};
