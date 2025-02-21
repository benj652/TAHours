import { useLeaveTaQueue } from "@/hooks/taQueue/useLeaveTaQueue";
import { authStore, taQueueStore } from "@/store";
import { SessionButtonProps } from "@/types";
import { ObjectId } from "mongodb";

type ExtendedSessionButtonProps = SessionButtonProps & {
  classId: ObjectId | undefined;
};
export const LeaveSessionButton: React.FC<ExtendedSessionButtonProps> = ({
  classId,
  setCurTas,
  curTas,
  taQueueId,
}) => {
  const { leaveTaQueue, loading } = useLeaveTaQueue();
  const { userItems } = authStore();
  const { allTaQueues } = taQueueStore();
  const handleLeaveSession = async () => {
    if (!classId) return;
    if (!taQueueId) return;
    const res = await leaveTaQueue(taQueueId, classId);
    if (!res) return;
    if (!userItems?._id) return;
    const newCurTas = curTas.filter((taId) => taId !== userItems._id);
    const curTaQueue = allTaQueues.filter(
      (curTaQueueId) => curTaQueueId._id === taQueueId,
    );
    curTaQueue[0].TAs = curTaQueue[0].TAs.filter((taId) => taId !== userItems._id);

    setCurTas(newCurTas);
  };
  return (
    <button
      disabled={loading}
      onClick={handleLeaveSession}
      className="bg-pink-500 hover:bg-green-500"
    >
      {" "}
      Leave Session Button{" "}
    </button>
  );
};
