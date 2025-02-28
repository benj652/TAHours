import { CSClass } from "@/types";
import { create } from "zustand";

type AnalyticsPageStore = {
  selectedClass: CSClass | null;
  setSelectedClass: (selectedClass: CSClass | null) => void;
  selectedDates: string | null;
  setSelectedDates: (selectedDates: string | null) => void;
};

/**
 * Context for the analytics page
 *
 * @param selectedClass - the class selected by the user. This is the class in which the middle column will display info on
 * @param setSelectedClass - function to set the selected class
 *
* @param selectedDates - the dates selected by the user. This is the date range in which the middle column will display info on
* @param setSelectedDates - function to set the selected dates
 */
export const analyticsPageStore = create<AnalyticsPageStore>((set) => ({
  selectedClass: null,
  setSelectedClass: (selectedClass: CSClass | null) => set({ selectedClass }),
  selectedDates: null,
  setSelectedDates: (selectedDates: string | null) => set({ selectedDates }),
}));
