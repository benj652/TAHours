import { analyticsPageStore, taQueueStore } from "@/store";
import { ObjectId } from "mongodb";
import { useEffect } from "react";
import { SearchFilter } from "./SearchFilter";
import { TextAnalytics } from "./TextAnalytics";
import { TicketQueue } from "./TicketQueue";
import { PROBLEM_TYPES } from "@/types";
import { useGetAllTaQueues } from "@/hooks";

export const MiddleCol: React.FC = () => {
  const {
    selectedClass,
    // selectedClassQueues,
    setSelectedClassQueues,
    // selectedTickets,
    setSelectedClass,
    setTicketTypes,
    setRenderedTickets,
    setSelectedDates,
    setSelectedTickets,
  } = analyticsPageStore();
  const { allTaQueues } = taQueueStore();

  // This is cached so no big deal
  const { getAllTaQueues } = useGetAllTaQueues();
  useEffect(() => {
    getAllTaQueues();
  }, []);
  //   const selectedClassChanged = () => {
  //     const selectedTaQueues = allTaQueues.filter(
  //       (taQueue) => taQueue.class === selectedClass?._id,
  //     );
  //     setSelectedClassQueues(selectedTaQueues);
  //     const collectedTickets = [];
  //     if (selectedClassQueues && selectedClassQueues.length > 0) {
  //             for (let i = 0; i < selectedClassQueues.length; i++) {
  //                 const queue = selectedClassQueues[i];
  //                 if (queue.tickets && queue.tickets.length > 0) {
  //                     collectedTickets.push(...queue.tickets);
  //                 }
  //             }
  //     }
  //         setSelectedTickets(collectedTickets);
  //     console.log(collectedTickets);

  //   };

  useEffect(() => {
    // selectedClassChanged();
    // console.log("change");
    if (!selectedClass) {
      setSelectedClassQueues([]);
      setSelectedTickets([]);
      return;
    }

    const selectedTaQueues = allTaQueues?.filter(
      (taQueue) => taQueue.class === selectedClass._id,
    );
    if (!selectedTaQueues) return;

    setSelectedClassQueues(selectedTaQueues);

    const collectedTickets: ObjectId[] = [];
    for (const queue of selectedTaQueues) {
      if (queue.tickets && queue.tickets.length > 0) {
        collectedTickets.push(...(queue.tickets || []));
      }
    }

    setSelectedTickets(collectedTickets);
  }, [selectedClass, allTaQueues]);

  // clear all to prevent duplication bug
  useEffect(() => {
    // clear class
    setTicketTypes([
      { name: PROBLEM_TYPES.DEBUGGING, value: 0 },
      { name: PROBLEM_TYPES.SYNTAX, value: 0 },
      { name: PROBLEM_TYPES.LOGIC, value: 0 },
      { name: PROBLEM_TYPES.RUNTIME, value: 0 },
      { name: PROBLEM_TYPES.INSTALLATION, value: 0 },
      { name: PROBLEM_TYPES.OTHER, value: 0 },
    ]);
    setRenderedTickets(0);
    setSelectedDates("0");
    setSelectedClass(null);

    analyticsPageStore.getState().setIndividualAttenders((prev) => {
      const newSet = new Set();
      return newSet;
    });
    analyticsPageStore.getState().setTaAttenders((prev) => {
      const newSet = new Set();
      return newSet;
    });
  }, [location.pathname]);
  const handleSelect = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };

  return (
    <div className="ml-0 xl:ml-0">
      <SearchFilter onSelect={handleSelect} />
      <TextAnalytics />
      <h1 className="text-lg font-semibold my-2">Detailed Tickets:</h1>
      <TicketQueue />
    </div>
  );
};
