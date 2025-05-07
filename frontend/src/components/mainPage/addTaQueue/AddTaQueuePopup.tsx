/*
 * AddTaQueuePopup.tsx
 * This file contains the add ta queue popup component
 * It is a popup that allows the user to add a ta queue
 */

import { useCreateTaQueue, useGetActiveClasses } from "@/hooks";
import { authStore } from "@/store";
import { AddPopUpProps, TaQueue, TaQueueCreateResponse } from "@/types";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

// Props for the AddTaQueuePopup component
type AddTaQueuePopupProps = AddPopUpProps & {
  curTaQueues: TaQueue[] | null;
  setTaQueues: (taQueues: TaQueue[]) => void;
};
/**
 * A popup that allows the user to add a ta queue
 *
 * @param isOpen boolean indicating if the popup is open or not
 * @param setIsOpen function to set the isOpen state
 * @param curTaQueues current ta queues
 * @param setTaQueues function to set the ta queues
 * @returns a popup component
 */
export const AddTaQueuePopup: React.FC<AddTaQueuePopupProps> = ({
  isOpen,
  setIsOpen,
  curTaQueues,
  setTaQueues,
}) => {
  const { createTaQueue, loading: createLoading } = useCreateTaQueue();
  const { userItems } = authStore();

  // const [fetched, setFetched] = useState<boolean>(false); // State for fetching class data

  const {
    getActiveClasses,
    loading: activeClassesLoading,
    data: activeClasses,
  } = useGetActiveClasses();

  // Fetches the classsses if they have not been fetched
  // const fetchClasses = useCallback(() => {
  //     if (!fetched) {
  //         getActiveClasses();
  //         setFetched(true);
  //     }
  // }, [fetched]);

  // useEffect(() => {
  //     fetchClasses();
  // }, [fetchClasses]);

  useEffect(() => {
    getActiveClasses();
  }, []);
  // Form state variables and values
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [directions, setDirections] = useState<string>("");

  // const { setTaQueues, data: taQueues } = useGetAllTaQueues();

  /** Function to handle the form submission */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-expect-error noitems
    const classObject = selectedClass as ObjectId;
    if (!userItems?._id) return "error";
    const res = (await createTaQueue(
      [userItems._id],
      classObject,
      directions
    )) as TaQueueCreateResponse;
    //@ts-expect-error setqueues
    setTaQueues([...(curTaQueues || []), res.taQueue]);
    // setTaQueues([...(taQueues || []), res.taQueue]);
    // console.log("new quesues", taQueues);
    console.log(res.taQueue);
    setIsOpen(false);
  };

  // If the popup is not open, do nothing
  if (!isOpen) return null;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Class </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="rounded-md border mt-1"
        >
          <option value="" disabled>
            Select a class
          </option>
          {activeClasses?.map((csClass, index) => (
            <option key={index} value={csClass._id?.toString()}>
              {csClass.name}
            </option>
          ))}
        </select>
        <label> Class Room </label>
        <input
          type="text"
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
          className="rounded-md border mt-1 mr-2"
        />
        <button
          type="submit"
          className="bg-gray-300 hover:bg-accent hover:text-base-100 transition-colors duration-300 cursor-pointer px-2 rounded-box"
          disabled={activeClassesLoading || createLoading}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};
