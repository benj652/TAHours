import { useGetUser } from "@/hooks/user/useGetUser";
import { MainPageStoreProps } from "@/types";
import { useEffect } from "react";

// type ResolveTicketPopupProps = {
//     ticket: ObjectId | undefined;
// };
//

/**
 * Popup to resolve tickets
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

  // Returns a wait thing if the ticket is still loading
  // we will need a seperate waiter if the user is loading down in the main
  // return statement
  if (!curTicket) return <div>WAIIIIITTTTT</div>;
  return (
    <div>
      <h1>Resolve Ticket</h1>
      <h2>{user?.email}</h2>
      <h2>{user?.firstName}</h2>
      <h2>{user?.lastName}</h2>
      <img src={user?.profilePic} />
      The issue:
      <h2>{curTicket.problem}</h2>
      <p>{curTicket.description}</p>
    </div>
  );
};
