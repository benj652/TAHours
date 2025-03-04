import { useLeaveTaQueue } from "@/hooks/taQueue/useLeaveTaQueue";
import { authStore, taQueueStore } from "@/store";
import { SessionButtonProps, TaQueue } from "@/types";
import { ObjectId } from "mongodb";

type ExtendedSessionButtonProps = SessionButtonProps & {
  classId: ObjectId | undefined;
  curTaQueues: TaQueue[] | null;
  setTaQueues: (taQueues: TaQueue[]) => void;
};

/**
 * This quite possibly is hte most trash file and componenet
 * in the entire project by a long shot but it is working for now
 */
export const LeaveSessionButton: React.FC<ExtendedSessionButtonProps> = ({
  classId,
  setCurTas,
  curTas,
  taQueueId,
  curTaQueues,
  setTaQueues,
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
      (curTaQueueId) => curTaQueueId._id === taQueueId
    );

    // these two cases will onlky happen if htere is an error
    if (curTaQueue.length === 0) return;
    if (!curTaQueues || curTaQueues.length === 0) return;
    if (curTaQueue[0].TAs.length === 0) return;

    if (!res.isActive) {
      console.log("curTaQueue[0].TAs.length === 1");
      const newTaQueues = curTaQueues.filter(
        (taQueue) => taQueue._id !== taQueueId
      );
      setTaQueues(newTaQueues);
    } else {
      curTaQueue[0].TAs = curTaQueue[0].TAs.filter(
        (taId) => taId !== userItems._id
      );
    }
    setCurTas(newCurTas);
  };
  return (
    <button
      disabled={loading}
      onClick={handleLeaveSession}
      className="bg-gray-300 hover:bg-accent hover:text-white px-2 rounded-box"
    >
      Leave Session
    </button>
  );
};
