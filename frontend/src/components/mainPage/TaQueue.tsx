/*
 * TaQueue.tsx
 * This file contains the ta queue component
 * It shows the ta queue
 * It is a button that allows the user to navigate to the ta queue page
 */
import { cn } from "@/utils";
import CuteStar from "../../assets/star.svg";
import { QueuePopup, Tickets } from "./queueCard";
import { ActiveTas } from "./taCard";
// import { useEffect, useRef } from "react";
// import { TaQueue as TaQueueType } from "@/types";
import { csClassStore, taQueueStore } from "@/store";
import { ObjectId } from "mongodb";

// create local shared store amoung these components
// this did not work as expected as it made the store global
// const useMainPageStore = createMainPageStore();

// type TaQueueProps = TaQueueType & {
//     curTaQueues: TaQueueType[] | null;
//     setTaQueues: (taQueues: TaQueueType[]) => void;
// };

type TaQueueProps = {
  _id: ObjectId;
};

/**
 * The TaQueue component shows the ta queue
 * It is a button that allows the user to navigate to the ta queue page
 * If there are no active TAs, the queue is inactive and should not be displayed
 *
 * @param {ObjectId} _id The id of the ta queue
 * @returns {React.ReactElement} The ta queue component
 */
export const TaQueue: React.FC<TaQueueProps> = ({ _id }) => {
  // initialize a local store with userRef
  // const storeRef = useRef(createMainPageStore());
  // const { setCurTickets, setClassId, setTaQueueId } = storeRef.current();
  // useEffect(() => {
  //     setCurTickets(tickets);
  //     setClassId(classId);
  //     setTaQueueId(_id);
  // }, []);
  const { allTaQueues: curTaQueues } = taQueueStore();
  const curTaQueue = curTaQueues?.find((taQueue) => taQueue._id === _id);

  // console.log(getActiveCSClassesData);
  // console.log(tas);
  const { getActiveCSClassesData } = csClassStore();
  const curCsClassName = getActiveCSClassesData?.find(
    (csClass) => csClass._id === curTaQueue?.class
  )?.name;

  // If there are no active TAs, the queue is inactive and should not be displayed
  if (!curTaQueue) return null;
  if (!curTaQueue.TAs || curTaQueue.TAs.length < 1) return null;
  return (
    <li>
      <div className={cn("collapse bg-gray-300 border border-base-300")}>
        <input type="checkbox" className="peer" />
        <div className="collapse-title p-0">
          <button className="flex items-center gap-4 w-full p-3 bg-gray-300 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
            <div className="size-10 rounded-full overflow-hidden">
              <img src={CuteStar} alt="Ticket Icon" />
            </div>
            <div className="font-semibold flex-1 text-left">
              {curCsClassName}
            </div>
            <div className="text-xs font-normal opacity-60">
              {curTaQueue.directions}
            </div>
          </button>
        </div>
        <div className="collapse-content bg-gray-300">
          <div className="flex w-full gap-4">
            {/* Active TAs Card */}
            <ActiveTas queueId={curTaQueue._id} classId={curTaQueue.class} />
            {/* Current Queue */}
            <Tickets queueId={curTaQueue._id} curTickets={curTaQueue.tickets} />
            <QueuePopup curTaQueue={curTaQueue} />
          </div>
        </div>
      </div>
    </li>
  );
};
