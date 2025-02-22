import { AddTaQueueButton, AddTaQueuePopup, TaQueue } from "@/components";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { useGetAllTaQueues } from "@/hooks";

export const MainPage = () => {
    const [addPopupOpen, setAddPopupOpen] = useState<boolean>(false);
    const {
        data: curTaQueues,
        getAllTaQueues,
        setTaQueues,
    } = useGetAllTaQueues();

    useEffect(() => {
        getAllTaQueues();
    }, []);
    // console.log(curTaQueues);
    return (
        <div className={cn("flex flex-col items-center p-4 w-full")}>
            <ul className={cn("list-none w-full space-y-4")}>
                {curTaQueues && curTaQueues.length > 0 ? (
                    curTaQueues.map((curTaQueue, index) => (
                        <TaQueue
                            key={index}
                            _id={curTaQueue._id}
                            TAs={curTaQueue.TAs}
                            class={curTaQueue.class}
                            directions={curTaQueue.directions}
                            tickets={curTaQueue.tickets}
                            isActive={curTaQueue.isActive}
                            setTaQueues={setTaQueues}
                            curTaQueues={curTaQueues}
                        />
                    ))
                ) : (
                    <p>No Classes Running</p>
                )}
            </ul>
            <AddTaQueuePopup
                isOpen={addPopupOpen}
                setIsOpen={setAddPopupOpen}
                curTaQueues={curTaQueues}
                setTaQueues={setTaQueues}
            />
            <AddTaQueueButton isOpen={addPopupOpen} setIsOpen={setAddPopupOpen} />
        </div>
    );
};
