import { csClassStore } from "@/store";
import axios from "axios";

export const useDeactivateClass = () => {
  const { getActiveClasses } = csClassStore();

  const deactivateClass = async (id: string) => {
    try {
      await axios.put(`/api/classes/${id}/deactivate`);
      await getActiveClasses(); // refresh list after deactivation
    } catch (error) {
      console.error("Failed to deactivate class:", error);
    }
  };

  return { deactivateClass };
};
