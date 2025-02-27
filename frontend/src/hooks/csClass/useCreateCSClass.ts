import { csClassStore } from "@/store";
import { CreateCSClassParams, CSClass, uriRoutes } from "@/types";
import { httpClient } from "@/utils";
import { ObjectId } from "mongodb";
import { useState } from "react";

export const useCreateCSClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CSClass | null>(null);
  const { getActiveCSClassesData, setGetActiveCSClassesData } = csClassStore();

  const createCSClass = async ({
    name,
    semester,
    year,
  }: CreateCSClassParams) => {
    try {
      if (!name) {
        throw new Error("Name is required");
      }
      if (!semester) {
        throw new Error("Semester is required");
      }
      if (!year || year < 2000) {
        throw new Error("Year is required");
      }
      const response = await httpClient.post<CSClass>(
        uriRoutes.csClass.createCsClass,
        { name, semester, year, isactive: true },
      );
      setData(response.data);
      setGetActiveCSClassesData([...getActiveCSClassesData, response.data]);
    return response.data;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error has occured",
      );
    } finally {
      setLoading(false);
    }
  };
  return { loading, createCSClass, error, data };
};
