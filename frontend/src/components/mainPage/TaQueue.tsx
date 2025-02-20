import { QueuePopup, Tickets } from "./queueCard";
import CuteStar from "../../assets/star.svg";
import { cn } from "@/utils";
import { ActiveTas } from "./taCard";
import { useState } from "react";

export const TaQueue = ({ curQueue }) => {
    const [isExpanded, setIsExpanded] = useState(false);
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
                            {curQueue.name}
                        </div>
                        <div className="text-xs font-normal opacity-60">
                            {curQueue.location}
                        </div>
                    </button>
                </div>
                <div className="collapse-content bg-gray-300">
                    <div className="flex w-full gap-4">
                        {/* Active TAs Card */}
                        <ActiveTas curQueue={curQueue} />
                        {/* Current Queue */}
                        <Tickets
                            curQueue={curQueue}
                            setIsExpanded={setIsExpanded}
                            isExpanded={isExpanded}
                        />
                        <QueuePopup isOpen={isExpanded} setIsOpen={setIsExpanded} />
                    </div>
                </div>
            </div>
        </li>
    );
};
