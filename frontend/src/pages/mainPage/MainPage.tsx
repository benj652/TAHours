import { AddTaQueueButton, AddTaQueuePopup, TaQueue } from "@/components";
import { cn } from "@/utils";
import { BasicQueueMock } from "@/mocks";
import { useState } from "react";



export const MainPage = () => {
    const [ addPopupOpen, setAddPopupOpen ] = useState<boolean>(false);
    return (
        <div className={cn("flex flex-col items-center p-4 w-full")}>
            <ul className={cn("list-none w-full space-y-4")}>
                {BasicQueueMock.classesRunning.length > 0 ? (
                    BasicQueueMock.classesRunning.map((className, index) => (
                        <TaQueue key={index} curQueue={className} />
                    ))
                ) : (
                    <p>No Classes Running</p>
                )}
            </ul>
            <AddTaQueuePopup isOpen={addPopupOpen} setIsOpen={setAddPopupOpen}/>
            <AddTaQueueButton isOpen={addPopupOpen} setIsOpen={setAddPopupOpen}/>
        </div>
    );
};
