import { ObjectId } from "mongodb";
import { ActiveTa } from "./ActiveTa";
import { JoinSessionButton } from "./JoinSessionButton";
import { LeaveSessionButton } from "./LeaveSessionButton";
import { useState } from "react";
import { authStore } from "@/store";

type ActiveTasProps = {
  tas: ObjectId[];
  queueId: ObjectId | undefined;
  classId: ObjectId | undefined;
};
export const ActiveTas: React.FC<ActiveTasProps> = ({
  tas,
  queueId,
  classId,
}) => {
  const [curTas, setCurTas] = useState<ObjectId[]>(tas);
  const { userItems } = authStore();
  const userInSession = curTas.filter((taId) => taId === userItems?._id);
  // console.log(userInSession);
  return (
    <div className="bg-base-100 rounded-lg shadow-lg p-4 w-1/4 min-w-[100px] self-start">
      <h1 className="text-lg font-bold">Active TAs</h1>
      <ul className="list-none w-full space-y-4">
        {curTas && curTas.length > 0 ? (
          curTas.map((taId, index) => <ActiveTa key={index} curTa={taId} />)
        ) : (
          <p>No Active TAs</p>
        )}
      </ul>
      {userInSession.length > 0 ? (
        <LeaveSessionButton
          taQueueId={queueId}
          curTas={curTas}
          setCurTas={setCurTas}
          classId={classId}
        />
      ) : (
        <JoinSessionButton
          taQueueId={queueId}
          curTas={curTas}
          setCurTas={setCurTas}
        />
      )}
    </div>
  );
};
