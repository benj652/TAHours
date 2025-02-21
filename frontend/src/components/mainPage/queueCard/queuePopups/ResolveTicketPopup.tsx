import { useResolveTicket } from "@/hooks/tickets/useResolveTicket";
import { useGetUser } from "@/hooks/user/useGetUser";
import { MainPageStoreProps } from "@/types";
import { useEffect, useState } from "react";

// type ResolveTicketPopupProps = {
//     ticket: ObjectId | undefined;
// };
//

/**
 * Popup to resolve tickets
 *
 * Triggered when the TA presses reesovle on a ticket
 * might want to add some checks to make sure normie users
 * can not see this by mistake
 */
export const ResolveTicketPopup: React.FC<MainPageStoreProps> = ({
  curStore,
}) => {
  // Gets the currently selected ticket from the local store
  const { curTicket } = curStore();

  // unpackers the getUser hook as we would like to disply information
  // about the sender of the ticket
  //
  // NOTE: This is NOT inefficeint/WILL NOT overload the backend
  // as this hook indefinently caches user info.
  const { getUser, user } = useGetUser();

  // Use the hook to get the user info
  useEffect(() => {
    // Need a better way to display errors
    if (!curTicket || !curTicket._id) return;
    getUser(curTicket.studentId);
  }, []);

  // State to handle what the ta puts in as their resolution message
  const [taMessage, setTaMessage] = useState<string>("");

  // unpack use resolve ticket hook
  const { resolveTicket, loading } = useResolveTicket();

  /**
   * Function to handle resolving the ticket
   * This will update all instances of the cached ticket
   * to mark it as having a TA which should mark it as resolved
   * in the queue
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent the default form submission
    e.preventDefault();

    // Validate that there is a ticket. Will need a better error thing like a toast
    // or maybe a message
    if (!curTicket) return;

    // Make sure the ta has put in a message
    if (!taMessage || taMessage === "") return;
    
    // Make sure the ticket has an id
    if (!curTicket._id) return;

    // Call the resolve ticket function from the hook
    const res = await resolveTicket(curTicket._id, taMessage);

    console.log(res);
  };

  // Returns a wait thing if the ticket is still loading
  // we will need a seperate waiter if the user is loading down in the main
  // return statement
  if (!curTicket) return <div>WAIIIIITTTTT</div>;
  return (
    <div className="bg-amber-500">
      <h1>Resolve Ticket</h1>
      <h2>{user?.email}</h2>
      <h2>{user?.firstName}</h2>
      <h2>{user?.lastName}</h2>
      <img src={user?.profilePic} />
      The issue:
      <h2>{curTicket.problem}</h2>
      <p>{curTicket.description}</p>
      <form onSubmit={handleSubmit}>
        <label>What do you think we should do about it mr ta?</label>
        <textarea
          value={taMessage}
          onChange={(e) => setTaMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 hover:bg-green-500"
        >
          Resolve
        </button>
      </form>
    </div>
  );
};
