import { authStore, userStore } from "@/store";
import { RolesConfig, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

/**
 * Custom hook: useUpdateRoleProfessor
 *
 * This hooks is used to, you guessed it, update a user's role to professor
 * Wow so cool
 */
export const useUpdateRoleProfessor = () => {

    // Reactive state for this component

    // Indicate that a request is in progress
    const [professorLoading, setProfessorLoading] = useState<boolean>(false);
    //
    // Store any errors encountered during the request
    const [professorError, setProfessorError] = useState<string | null>(null);

    // unpack caches from the user store
    const { addUserToCache, getItemsFromCache } = userStore();

    // unpack the user items, as in thier roles and stuff
    const { userItems } = authStore();

    /**
    * Funmciton to update the role of a user to professor
    *
    * @param userId - The id of the user to update
    * e.g. 5f748650b8f4f4b6f8b4f4b6
    *
    * e.g. updateRoleProfessor("5f748650b8f4f4b6f8b4f4b6")
    *
    * pretty cool right
     */
    const updateRoleProfessor = async (userId: ObjectId) => {
        setProfessorLoading(true); // Indicate that a request is in progress
        try {
            // Ensure required parameters are provided before making the API request
            if (!userItems) {
                throw new Error("User not found");
            }
            // Check if the user is an admin or a professor if not, throw an error
            if (
                userItems.roles != RolesConfig.Admin &&
                userItems.roles != RolesConfig.Professor
            ) {
                throw new Error("User is not an allowed to update this user");
            }
            if (!userId) {
                throw new Error("User not found");
            }

            // Send a request to the server to update the user's role to professor
            const res = await httpClient.post(
                `${UserRoutes.UpdateRoleProfessor}${userId}`,
            );

            const rdata = res.data;

            // If no data is returned, throw an error
            if (!rdata) {
                throw new Error("User not found");
            }

            //ts ignore cause object ids and strings are chill to convert
            //@ts-ignore
            const user = getItemsFromCache(userId as string);
            if (!user) {
                throw new Error("User not found");
            }
            user.roles = RolesConfig.Professor; // Update the user's role to professor
            addUserToCache(user); // cache the updated user
        } catch (err) {
            // Capture and store any errors encountered during the request
            setProfessorError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setProfessorLoading(false); // Reset loading state after the request completes
        }
    };
    return { professorLoading, professorError, updateRoleProfessor }; // Return the state values and function for use in components
};
