import { useCreateTicket } from "@/hooks";
import { taQueueStore, ticketStore } from "@/store";
import { MainPageStoreProps, Ticket } from "@/types";
import { useState } from "react";

// type AddTicketPopupProps = {
//     classId: ObjectId;
//     taQueueId: ObjectId;
//     tickets: ObjectId[];
//     setTickets: React.Dispatch<React.SetStateAction<ObjectId[]>>;
// };
/**
 * This is the popup used when you want to add a ticket
 * It looks ugly atm and will need to be looking bussin
 */
export const AddTicketPopup: React.FC<MainPageStoreProps> = ({ curStore }) => {
  const {
    classId,
    taQueueId,
    setCurTickets: setTickets,
    curTickets: tickets,
  } = curStore();

  // We unpack a bunch of caching stuff so no reloads are needed
  const { loading, createTicket } = useCreateTicket();
  const { addTicketToCache } = ticketStore();
  const { allTaQueues } = taQueueStore();

  /**
   * Function to handle adding a new ticket
   * It updates all caches associated with the process
   * Web sockets will need to be implemented with this maybe
   *
   * @returns nothing bruh
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: work out a way to display errors.
    if (!taQueueId) return;
    if (!classId) return;
    const res = (await createTicket(
      classId,
      taQueueId.toString(),
      curDescription,
      curProblem,
    )) as Ticket;
    //need to toast this or something
    if (!res) return;
    if (!res._id) return;

    // the following lines up to line #44 will/should likely reside in thier own function at somepoint
    addTicketToCache(res);

    // It is saying that tickets needs some object tytpe iterator or whatever but I always just ignore that error and it all works out
    //@ts-ignore
    setTickets([...tickets, res._id]);

    // Updates the cached queue to have the new id
    const targetQueue = allTaQueues.find((queue) => queue._id === taQueueId);

    if (!targetQueue) return;
    targetQueue.tickets.push(res._id);
    console.log(res);
  };

  // Trackers to see what is netered in the form
  const [curProblem, setCurProblem] = useState<string>("");
  const [curDescription, setCurDescription] = useState<string>("");
  return (
    <form className="bg-amber-500" onSubmit={handleSubmit}>
      <label> Problem </label>
      <input
        type="text"
        value={curProblem}
        onChange={(e) => setCurProblem(e.target.value)}
      />
      <label> Description </label>
      <textarea
        value={curDescription}
        onChange={(e) => setCurDescription(e.target.value)}
      />
        <label> Attachments </label>
            <input className="bg-pink-500 hover:bg-green-500" type="file" />
            <input className="bg-pink-500 hover:bg-green-500" type="file" />
            <input className="bg-pink-500 hover:bg-green-500" type="file" />
      <button
        type="submit"
        disabled={loading}
        className="bg-pink-500 hover:bg-green-500"
      >
        submit
      </button>
    </form>
  );
};
