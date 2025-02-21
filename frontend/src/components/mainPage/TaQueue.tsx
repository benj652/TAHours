import { QueuePopup, Tickets } from "./queueCard";
import CuteStar from "../../assets/star.svg";
import { cn } from "@/utils";
import { ActiveTas } from "./taCard";
import { useState } from "react";
import { PopUpType, TaQueue as TaQueueType } from "@/types";
import { csClassStore } from "@/store";
import { ObjectId } from "mongodb";

export const TaQueue: React.FC<TaQueueType> = ({
    _id,
    directions,
    TAs,
    class: classId,
    tickets,
}) => {
    const [curPopUpType, SetCurPopUpType] = useState<PopUpType | undefined>();
    const [isExpanded, setIsExpanded] = useState(false);

    const [curTicket, setCurTicket] = useState<ObjectId>();
    const [curTickets, setCurTickets] = useState(tickets);
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
                        <Tickets
                            curTickets={curTickets}
                            setCurPopUp={SetCurPopUpType}
                            setIsExpanded={setIsExpanded}
                            isExpanded={isExpanded}
                        />
                        <QueuePopup
                            taQueueId={_id}
                            classId={classId}
                            type={curPopUpType}
                            isOpen={isExpanded}
                            setIsOpen={setIsExpanded}
                            tickets={curTickets}
                            setTickets={setCurTickets}
                            curTicket={curTicket}
                            setCurTicket={setCurTicket}
                        />
                    </div>
                </div>
            </div>
        </li>
    );
};
