import { useJoinTaQueue } from "@/hooks";
import { authStore, taQueueStore } from "@/store";
import { SessionButtonProps } from "@/types";

export const JoinSessionButton: React.FC<SessionButtonProps> = ({
  curTas,
  setCurTas,
  taQueueId,
}) => {
  const { error, joinTaQueue, loading } = useJoinTaQueue();
  const { userItems } = authStore();
  const { allTaQueues } = taQueueStore();
  const handleJoinSession = async () => {
    if (!taQueueId) return;
    if (!userItems?._id) return;
    await joinTaQueue(taQueueId);
    if (error) return;
    setCurTas([...curTas, userItems._id]);
    const curTaQueue = allTaQueues.filter(
      (taQueue) => taQueue._id === taQueueId
    );
    const curUserInTaQueue = curTaQueue[0].TAs.filter(
      (user) => user === userItems._id
    );
    if (curUserInTaQueue.length > 0) return;
    curTaQueue[0].TAs.push(userItems._id);
  };
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
