/*
 * MainPage.tsx
 *
 * React component for the main page of the TA Queue application.
 */
import { AddTaQueueButton, AddTaQueuePopup, TaQueue } from "@/components";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { useGetAllTaQueues } from "@/hooks";
import { taQueueStore } from "@/store";

export const MainPage = () => {
  const [addPopupOpen, setAddPopupOpen] = useState<boolean>(false); // Reactive state for popup
  const { getAllTaQueues } = useGetAllTaQueues(); // Hook to fetch TA queues

  // Store the ta queues cache
  const { allTaQueues: curTaQueues, setAllTaQueues } = taQueueStore();

  // On mount, fetch all TA queues. This is also in the analytics page, but the hook
  // has built in code to check the cache to see if stuff is already there. This is so
  // If the user refreshes either the main page or the analytics page, all needed data
  // is already there.
  useEffect(() => {
    getAllTaQueues();
  }, []);
  // console.log(curTaQueues);
  return (
    <div className={cn("flex flex-col items-center p-4 w-full")}>
      <ul className={cn("list-none w-full space-y-4")}>
        {curTaQueues && curTaQueues.length > 0 ? (
          curTaQueues.map((curTaQueue, index) => (
            <TaQueue key={index} _id={curTaQueue._id} />
          ))
        ) : (
          <p>No Classes Running</p>
        )}
      </ul>
      <AddTaQueuePopup
        isOpen={addPopupOpen}
        setIsOpen={setAddPopupOpen}
        curTaQueues={curTaQueues}
        setTaQueues={setAllTaQueues}
      />
      <AddTaQueueButton isOpen={addPopupOpen} setIsOpen={setAddPopupOpen} />
    </div>
  );
};



                       // ;;\\/;;;;;;;;
                   // ;;;;;;;;;;;;;;;;;
                // ;;;;;;;;;;;;     ;;;;;
               // ;;;;;    ;;;         \;;
              // ;;;;;      ;;          |;
             // ;;;;         ;          |
             // ;;;                     |
              // ;;                     )
               // \    ~~~~ ~~~~~~~    /
                // \    ~~~~~~~  ~~   /
              // |\ \                / /|
               // \\| %%%%%    %%%%% |//
              // [[====================]]
               // | |  ^          ^  |
               // | | :@: |/  \| :@: | |
                // \______/\  /\______/
                 // |     (@\/@)     |
                // /                  \
               // /  ;-----\  ______;  \
               // \         \/         /
                // )                  (
               // /                    \
               // \__                  /
                // \_                _/
                 // \______/\/\______/
                  // _|    /--\    |_
                 // /%%\  /"'"'\  /%%\
  // ______________/%%%%\/\'"'"/\/%%%%\______________
 // / :  :  :  /  .\%%%%%%%\"'/%%%%%%%/.  \  :  :  : \
// )  :  :  :  \.  .\%%%%%%/'"\%%%%%%/.  ./  :  :  :  (
