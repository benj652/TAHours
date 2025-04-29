import { analyticsPageStore, taQueueStore } from "@/store";
import { ObjectId } from "mongodb";
import { useEffect } from "react";
import { SearchFilter } from "./SearchFilter";
import { TextAnalytics } from "./TextAnalytics";
import { TicketQueue } from "./TicketQueue";

export const MiddleCol: React.FC = () => {
  const {
    selectedClass,
    // selectedClassQueues,
    setSelectedClassQueues,
    // selectedTickets,
    setSelectedTickets,
  } = analyticsPageStore();
  const { allTaQueues } = taQueueStore();

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
      (taQueue) => taQueue.class === selectedClass._id
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
