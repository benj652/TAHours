/**
 * useDeactivateClass.ts
 * Hook to deactivate a CS class
 *
 * @ returns - loading, error, data, deactivateClass
 *
 * Uses the httpClient to make a post request to the server to deactivate a CS class
 */
import { CsClassRoutes } from "@/types";
import { httpClient } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook to deactivate a CS class by its ID
 */
export const useDeactivateClass = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deactivateClass = async (classId: string): Promise<boolean> => {
    setLoading(true); // start loading
    setError(null);
    try {
      await httpClient.post(`${CsClassRoutes.DeactivateClass}/${classId}`, {});
      toast.success("Class deactivated successfully");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to deactivate class";
      toast.error(message);
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deactivateClass, loading, error };
};
