/*
 * JoinSessionButton.tsx
 * This file contains the join session button component
 * It is a button that allows the user to join a ta queue
 */
import { useJoinTaQueue } from "@/hooks";
import { authStore, taQueueStore } from "@/store";
import { Role } from "@/types";
import { ObjectId } from "mongodb";
// import { SessionButtonProps } from "@/types";

type JoinSessionButtonProps = {
  taQueueId: ObjectId | undefined;
  // setTaQueues: (taQueues: TaQueue[]) => void;
};
/**
 * A button that allows a user to join a TA queue.
 * @param {ObjectId | undefined} taQueueId The id of the TA queue to join.
 * @param {(taQueues: TaQueue[]) => void} setTaQueues A function to update the TA queues in the store.
 * @returns {React.ReactElement | null} The button component.
 */
export const JoinSessionButton: React.FC<JoinSessionButtonProps> = ({
  taQueueId,
  // setTaQueues,
}) => {
  const { error, joinTaQueue, loading } = useJoinTaQueue();
  const { userItems } = authStore();
  const { allTaQueues, setAllTaQueues: setTaQueues } = taQueueStore();
  const handleJoinSession = async () => {
    if (!taQueueId) return;
    if (!userItems?._id) return;
    await joinTaQueue(taQueueId);
    if (error) return;

    const queue = allTaQueues.find((q) => q._id === taQueueId);
    if (!queue) return;

    const alreadyInQueue = queue.TAs.includes(userItems._id);
    if (alreadyInQueue) return;

    // Create new updated TA queues immutably
    const updatedQueues = allTaQueues.map((q) => {
      if (q._id === taQueueId) {
        return {
          ...q,
          TAs: [...q.TAs, userItems._id],
        };
      }
      return q;
    });

    setTaQueues(updatedQueues);

    // setCurTas([...curTas, userItems._id]);
    // const curTaQueue = allTaQueues.filter(
    //   (taQueue) => taQueue._id === taQueueId
    // );
    // const curUserInTaQueue = curTaQueue[0].TAs.filter(
    //   (user) => user === userItems._id
    // );
    // if (curUserInTaQueue.length > 0) return;
    // curTaQueue[0].TAs.push(userItems._id);
  };
  if (userItems?.roles === Role.Student) return null;
  return (
    <button
      onClick={handleJoinSession}
      disabled={loading}
      className="bg-gray-300 px-2 rounded-box hover:bg-accent hover:text-white transition-colors duration-300 cursor-pointer"
    >
      Join Session
    </button>
  );
};
