import { ResolvePopup } from "@/components";
import CuteStar from "../../assets/star.svg";
import { useState } from "react";
import { cn } from "@/utils";

interface UserProps {
  classesRunning: string[];
  activeTas: string[];
}

const bruh = { 
  classesRunning: ["CS150", "CS232", "CS400"], 
  activeTas: ["Super Genius", "Glasses Emoji"], 
  currentQueue: ["dumb ticket", "dumb ticket 2", "dumb ticket 3", "dumb ticket 4"] 
};

export const MainPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <ul className="list-none w-full space-y-4">
        {bruh.classesRunning.length > 0 ? (
          bruh.classesRunning.map((className, index) => (
            <li key={index}>
              <div className="collapse bg-gray-300 border border-base-300">
                <input type="checkbox" className="peer" /> 
                <div className="collapse-title p-0">
                  <button className="flex items-center gap-4 w-full p-3 bg-gray-300 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
                    <div className="size-10 rounded-full overflow-hidden">
                      <img src={CuteStar} alt="Ticket Icon" />
                    </div>
                    <div className="font-semibold flex-1 text-left">{className}</div>
                    <div className="text-xs font-normal opacity-60">Davis 105</div>
                  </button>
                </div>
                <div className="collapse-content bg-gray-300">
                  <div className="flex w-full gap-4">
                    
                    {/* Active TAs Card */}
                    <div className="bg-base-100 rounded-lg shadow-lg p-4 w-1/4 min-w-[100px] self-start">
                      <h1 className="text-lg font-bold">Active TAs</h1>
                      <ul className="list-none w-full space-y-4">
                        {bruh.activeTas.length > 0 ? (
                          bruh.activeTas.map((taName) => (
                            <button key={taName} className="flex items-center gap-4 w-full p-3 bg-base-100 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
                              <div className="size-10 rounded-full shadow-lg overflow-hidden">
                                <img src="https://robohash.org/dsfaasdf.jpeg" alt="TA Avatar" />
                              </div>
                              <div className="text-sm font-normal flex-1 text-left">{taName}</div>
                            </button>
                          ))
                        ) : (
                          <p>No Active TAs</p>
                        )}
                      </ul>
                    </div>

                    {/* Current Queue */}
<div className={cn(`bg-base-100 rounded-lg p-4 shadow-lg ${isOpen ? "w-1/3" : "w-2/3"}`)}>
                      <h1 className="text-lg font-bold">Current Queue (9)</h1>
                      <ul className="list-none w-full space-y-2">
                        {bruh.currentQueue.length > 0 ? (
                          bruh.currentQueue.map((ticketName, index) => (
                            <li key={index} className="p-4 flex items-center gap-4 bg-gray-200 rounded-lg">
                              <div className="size-10 rounded-full overflow-hidden">
                                <img src="https://img.daisyui.com/images/profile/demo/1@94.webp" alt="Ticket Icon" />
                              </div>
                              <div className="font-semibold">{ticketName}</div>
                              <div className="text-xs font-normal opacity-60">Debugging help on project 2</div>
                              <button className="btn btn-ghost bg-accent ml-auto shadow-lg" onClick={() => setIsOpen(true)}>
                                <div className="text-xs uppercase font-semibold text-base-100 ">Resolve</div>
                              </button>
                            </li>
                          ))
                        ) : (
                          <p>No Unresolved Tickets</p>
                        )}
                      </ul>
                    </div>
                                        <ResolvePopup isOpen={isOpen} setIsOpen={setIsOpen}/>

                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No Classes Running</p>
        )}
      </ul>
    </div>
  );
};
