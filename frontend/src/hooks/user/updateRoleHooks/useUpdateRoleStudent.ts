import { authStore, userStore } from "@/store";
import { RolesConfig, UserRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

/**
 * Custom hook: useUpdateRoleStudent
 *
 * This hook is used to update a user's role to student
 * It manages loading and error states and makes an API call to update the user's role
 * It also updates the user's role in the cache
 *
 * Less go
 */
export const useUpdateRoleStudent = () => {
    // Reactive state for this component
    const [studentLoading, setStudentLoading] = useState<boolean>(false); // Indicate that a request is in progress
    const [studentError, setStudentError] = useState<string | null>(null); // Store any errors encountered during the request

    // unpack caches from the user store
    const { addUserToCache, getItemsFromCache } = userStore();

    // unpack the user items, as in thier roles and stuff
    const { userItems } = authStore();

    /**
    *  Function to update the role of a user to student
    *  This function updates the user's role to student
    *  It makes an API request to update the role
    *  It also updates the user's role in the cache
    *  so cool
    *  @param userId - The id of the user to update
    *  e.g. 5f748650b8f4f4b6f8b4f4b6
    *  e.g. updateRoleStudent("5f748650b8f4f4b6f8b4f4b6")
    *  pretty cool right
     */
    const updateRoleStudent = async (userId: ObjectId) => {
        // Indicate that a request is in progress
        setStudentLoading(true);
        try {
            // if the user is not found, throw an error
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
            // Ensure required parameters are provided before making the API request
            if (!userId) {
                throw new Error("User not found");
            }

            // Send a request to the server to update the user's role to student
            const res = await httpClient.post(
                `${UserRoutes.UpdateRoleStudent}${userId}`,
            );

            // Extract the response data
            const rdata = res.data;

            // If no data is returned, throw an error
            if (!rdata) {
                throw new Error("User not found");
            }
            // ts ignore bc changing string and object id lowkey chill tg
            //@ts-ignore
            const user = getItemsFromCache(userId as string);
            if (!user) {
                throw new Error("User not found");
            }
            // Update the user's role to student
            user.roles = RolesConfig.Student;
            addUserToCache(user); // cache the updated user
        } catch (err) {
            // Capture and store any errors encountered during the request
            setStudentError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setStudentLoading(false); // Reset loading state after the request completes
        }
    };
    return { studentLoading, studentError, updateRoleStudent }; // Return the state values and function for use in components
};
