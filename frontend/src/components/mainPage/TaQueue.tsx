import { QueuePopup, Tickets } from "./queueCard";
import CuteStar from "../../assets/star.svg";
import { cn } from "@/utils";
import { ActiveTas } from "./taCard";
import { useEffect, useRef } from "react";
import { TaQueue as TaQueueType } from "@/types";
import { createMainPageStore, csClassStore } from "@/store";

// create local shared store amoung these components
// this did not work as expected as it made the store global
// const useMainPageStore = createMainPageStore();

export const TaQueue: React.FC<TaQueueType> = ({
  _id,
  directions,
  TAs,
  class: classId,
  tickets,
}) => {
  // initialize a local store with userRef
  const storeRef = useRef(createMainPageStore());
  const { setCurTickets, setClassId, setTaQueueId } = storeRef.current();
  useEffect(() => {
    setCurTickets(tickets);
    setClassId(classId);
    setTaQueueId(_id);
  }, []);

  // console.log(getActiveCSClassesData);
  // console.log(tas);
  const { getActiveCSClassesData } = csClassStore();
  const curCsClassName = getActiveCSClassesData?.find(
    (csClass) => csClass._id === classId,
  )?.name;
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
            <div className="text-xs font-normal opacity-60">{directions}</div>
          </button>
        </div>
        <div className="collapse-content bg-gray-300">
          <div className="flex w-full gap-4">
            {/* Active TAs Card */}
            <ActiveTas tas={TAs} />
            {/* Current Queue */}
            <Tickets curStore={storeRef.current} />
            <QueuePopup curStore={storeRef.current} />
          </div>
        </div>
      </div>
    </li>
  );
};
