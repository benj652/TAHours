/*
 * LeaveSessionButton.tsx
 * This file contains the leave session button component
 * It is a button that allows the user to leave a ta queue
 */
import { useLeaveTaQueue } from "@/hooks/taQueue/useLeaveTaQueue";
import { authStore, forceUpdateStore, taQueueStore } from "@/store";
import { ObjectId } from "mongodb";

// type ExtendedSessionButtonProps = SessionButtonProps & {
//   classId: ObjectId | undefined;
//   // curTaQueues: TaQueue[] | null;
//   // setTaQueues: (taQueues: TaQueue[]) => void;
// };

type LeaveSessionButtonProps = {
  classId: ObjectId | undefined;
  taQueueId: ObjectId | undefined;
};

/**
 * This quite possibly is hte most trash file and componenet
 * in the entire project by a long shot but it is working for now
 */
export const LeaveSessionButton: React.FC<LeaveSessionButtonProps> = ({
  classId,
  taQueueId,
}) => {
  const { leaveTaQueue, loading } = useLeaveTaQueue();
  const { triggerRerender } = forceUpdateStore();
  const { allTaQueues: curTaQueues, setAllTaQueues: setTaQueues } =
    taQueueStore();
  const { userItems } = authStore();
  const { allTaQueues } = taQueueStore();
  const handleLeaveSession = async () => {
    if (!classId) return;
    if (!taQueueId) return;
    const res = await leaveTaQueue(taQueueId, classId);
    if (!res) return;
    if (!userItems?._id) return;
    // console.log("curTas", curTas);
    // const newCurTas = curTas.filter((taId) => taId !== userItems._id);
    // console.log("newCurTas", newCurTas);
    // setCurTas(newCurTas);
    triggerRerender();
    const curTaQueue = allTaQueues.filter(
      (curTaQueueId) => curTaQueueId._id === taQueueId
    );

    // these two cases will onlky happen if htere is an error
    if (curTaQueue.length === 0) return;
    if (!curTaQueues || curTaQueues.length === 0) return;
    if (curTaQueue[0].TAs.length === 0) return;

    if (!res.isActive) {
      // The ta was the last one in the queue, so the queue is now over as they have left.
      // console.log("curTaQueue[0].TAs.length === 1");
      const newTaQueues = curTaQueues.filter(
        (taQueue) => taQueue._id !== taQueueId
      );
      setTaQueues(newTaQueues);
    } else {
      // curTaQueue[0].TAs = curTaQueue[0].TAs.filter(
      //   (taId) => taId !== userItems._id
      // );
      const updatedQueues = curTaQueues.map((queue) => {
        if (queue._id === taQueueId) {
          return {
            ...queue,
            TAs: queue.TAs.filter((taId) => taId !== userItems._id),
          };
        }
        return queue;
      });
      setTaQueues(updatedQueues);
      // console.log("updatedQueues", updatedQueues);
      triggerRerender();
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleLeaveSession}
      className="bg-gray-300 hover:bg-accent hover:text-white px-2 rounded-box transition-colors duration-300 cursor-pointer"
    >
      Leave Session
    </button>
  );
};
