import { CSClass, PROBLEM_TYPES, TaQueue, TicketPieType } from "@/types";
import { ObjectId } from "mongodb";
import { create } from "zustand";

type AnalyticsPageStore = {
  selectedClass: CSClass | null;
  setSelectedClass: (selectedClass: CSClass | null) => void;
  selectedDates: string | null;
  setSelectedDates: (selectedDates: string | null) => void;
  selectedClassQueues: TaQueue[] | null;
  setSelectedClassQueues: (selectedClassQueues: TaQueue[] | null) => void;
  inRangeQueues: TaQueue[] | null;
  setInRangeQueues: (inRangeQueues: TaQueue[] | null) => void;
  selectedTickets: ObjectId[] | null;
  setSelectedTickets: (selectedTickets: ObjectId[] | null) => void;
  ticketTypes: TicketPieType[];
  setTicketTypes: (ticketTypes: TicketPieType[]) => void;
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
  selectedClassQueues: null,
  setSelectedClassQueues: (selectedClassQueues: TaQueue[] | null) =>
    set({ selectedClassQueues }),
  inRangeQueues: null,
  setInRangeQueues: (inRangeQueues: TaQueue[] | null) => set({ inRangeQueues }),
  selectedTickets: [],
  setSelectedTickets: (selectedTickets: ObjectId[] | null) =>
    set({ selectedTickets }),
  ticketTypes: [
    { name: PROBLEM_TYPES.DEBUGGING, value: 0 },
    { name: PROBLEM_TYPES.SYNTAX, value: 0 },
    { name: PROBLEM_TYPES.LOGIC, value: 0 },
    { name: PROBLEM_TYPES.RUNTIME, value: 0 },
    { name: PROBLEM_TYPES.INSTALLATION, value: 0 },
    { name: PROBLEM_TYPES.OTHER, value: 0 },
  ],
  // setTicketTypes: (ticketTypes: TicketPieType[]) => set({ ticketTypes }),
    setTicketTypes: (updater) =>
  set((state) => ({
    ticketTypes:
      typeof updater === "function" ? updater(state.ticketTypes) : updater,
  })),
}));
