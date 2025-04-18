import { authStore, forceUpdateStore } from "@/store";
import { TaQueue } from "@/types";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { ActiveTa } from "./ActiveTa";
import { JoinSessionButton } from "./JoinSessionButton";
import { LeaveSessionButton } from "./LeaveSessionButton";

type ActiveTasProps = {
    tas: ObjectId[];
    queueId: ObjectId | undefined;
    classId: ObjectId | undefined;
    curTaQueues: TaQueue[] | null;
    setTaQueues: (taQueues: TaQueue[]) => void;
};


export const ActiveTas: React.FC<ActiveTasProps> = ({
    tas,
    queueId,
    classId,
    curTaQueues,
    setTaQueues,
}) => {
    const { userItems } = authStore();

    const userInSession = tas.filter((taId) => taId === userItems?._id);

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
            {userInSession.length > 0 ? (
                <LeaveSessionButton
                    taQueueId={queueId}
                    classId={classId}
                    setTaQueues={setTaQueues}
                    curTaQueues={curTaQueues}
                />
            ) : (
                <JoinSessionButton
                    taQueueId={queueId}
                    curTaQueues={curTaQueues}
                    setTaQueues={setTaQueues}
                />
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
