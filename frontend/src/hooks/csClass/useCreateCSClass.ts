import { csClassStore } from "@/store";
import { CreateCSClassParams, CSClass, CsClassRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to create a CS class
 *
 * @ returns - loading, error, data, createCSClass
 *
 * Uses the httpClient to make a post request to the server to create a new CS class
 */
export const useCreateCSClass = () => {
  const [loading, setLoading] = useState<boolean>(false); // Set loading state
  const [error, setError] = useState<string | null>(null); // Set error state
  const [data, setData] = useState<CSClass | null>(null); // Set data state

  // unpacking the getActiveCSClassesData and setGetActiveCSClassesData from the csClassStore
  const { getActiveCSClassesData, setGetActiveCSClassesData } = csClassStore();

  /**
   *  Creates a CS class
   *  @param name - The name of the class
   *  @param semester - The semester of the class
   *  @param year - The year of the class
   *  returns - The new CS class
   *
   *  Works fine for now
   *  may want to implement websockets to this
   */
  const createCSClass = async ({
    name,
    semester,
    year,
  }: CreateCSClassParams) => {
    try {
      // If the name field is empty, throw na error
      if (!name) {
        throw new Error("Name is required");
      }

      // if the semester field is empty, throw an error
      if (!semester) {
        throw new Error("Semester is required");
      }

      // if the year field is empty or less than 2000, throw an error
      if (!year || year < 2000) {
        throw new Error("Year is required and must be greater than 2000");
      }

      // send a post request to the server to create a new CS class
      const response = await httpClient.post<CSClass>(
        CsClassRoutes.CreateCsClass,
        { name, semester, year, isactive: true }
      );
      // set the data state to the response data
      setData(response.data);

      // Cache the response data
      setGetActiveCSClassesData([...getActiveCSClassesData || [], response.data]);
      toast.success("Class created successfully");
      return response.data; // return the response data
    } catch (error) {
      // If there is an error, set the error state to the error message
      toast.error(
        error instanceof Error ? error.message : "An unknown error has occured"
      );
      setError(
        error instanceof Error ? error.message : "An unknown error has occured"
      );
    } finally {
      setLoading(false); // set the loading state to false after everything has been ran through
    }
  };
  return { loading, createCSClass, error, data }; // return the loading, error, data, and createCSClass function
};
