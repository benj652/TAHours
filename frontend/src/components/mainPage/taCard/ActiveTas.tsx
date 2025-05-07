/*
 * ActiveTas.tsx
 * This file contains the active ta component
 * It shows the active ta
 * It is a button that allows the user to navigate to the active ta page
 */

import { authStore, taQueueStore } from "@/store";
// import { TaQueue } from "@/types";
import { ObjectId } from "mongodb";
// import { useEffect, useState } from "react";
import { ActiveTa } from "./ActiveTa";
import { JoinSessionButton } from "./JoinSessionButton";
import { LeaveSessionButton } from "./LeaveSessionButton";

type ActiveTasProps = {
  // tas: ObjectId[];
  queueId: ObjectId | undefined;
  classId: ObjectId | undefined;
  // curTaQueues: TaQueue[] | null;
  // setTaQueues: (taQueues: TaQueue[]) => void;
};

/**
 * This component shows the active ta
 * It is a button that allows the user to navigate to the active ta page
 *
 * @param {ObjectId | undefined} queueId the id of the ta queue
 * @param {ObjectId | undefined} classId the id of the class
 * @returns {React.ReactElement} the active ta component
 */
export const ActiveTas: React.FC<ActiveTasProps> = ({
  // tas,
  queueId,
  classId,
  // curTaQueues,
  // setTaQueues,
}) => {
  const { userItems } = authStore();
  const { allTaQueues } = taQueueStore();
  const curTaQueue = allTaQueues?.find((taQueue) => taQueue._id === queueId);
  const tas = curTaQueue?.TAs;

  const userInSession = tas?.filter((taId) => taId === userItems?._id);
  if (!curTaQueue) return null;
  if (!tas || tas.length < 1) return null;
  return (
    <div className="bg-base-100 rounded-lg shadow-lg p-4 w-1/4 min-w-[100px] self-start">
      <h1 className="text-lg font-bold">Active TAs</h1>
      <ul className="list-none w-full space-y-4">
        {tas && tas.length > 0 ? (
          tas.map((taId, index) => <ActiveTa key={index} curTa={taId} />)
        ) : (
          <p>No Active TAs</p>
        )}
      </ul>
      {userInSession && userInSession.length > 0 ? (
        <LeaveSessionButton taQueueId={queueId} classId={classId} />
      ) : (
        <JoinSessionButton taQueueId={queueId} />
      )}
    </div>
  );
};

// export const ActiveTas: React.FC<ActiveTasProps> = ({
//     tas,
//     queueId,
//     classId,
//     curTaQueues,
//     setTaQueues,
// }) => {
//     const { forceRenderKey } = forceUpdateStore();

//     useEffect(() => {
//         setCurTas(tas);
//     }, [tas, forceRenderKey]);
//     const [curTas, setCurTas] = useState<ObjectId[]>(tas);
//     const { userItems } = authStore();
//     const userInSession = curTas.filter((taId) => taId === userItems?._id);
//     // console.log(userInSession);
//     return (
//         <div className="bg-base-100 rounded-lg shadow-lg p-4 w-1/4 min-w-[100px] self-start">
//             <h1 className="text-lg font-bold">Active TAs</h1>
//             <ul className="list-none w-full space-y-4">
//                 {curTas && curTas.length > 0 ? (
//                     curTas.map((taId, index) => <ActiveTa key={index} curTa={taId} />)
//                 ) : (
//                     <p>No Active TAs</p>
//                 )}
//             </ul>
//             {userInSession.length > 0 ? (
//                 <LeaveSessionButton
//                     taQueueId={queueId}
//                     curTas={curTas}
//                     classId={classId}
//                     curTaQueues={curTaQueues}
//                     setTaQueues={setTaQueues}
//                 />
//             ) : (
//                 <JoinSessionButton
//                     taQueueId={queueId}
//                     curTas={curTas}
//                     setCurTas={setCurTas}
//                 />
//             )}
//         </div>
//     );
// };
