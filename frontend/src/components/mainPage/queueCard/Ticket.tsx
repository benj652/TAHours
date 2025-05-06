import { useGetTicket } from "@/hooks/tickets/useGetTicket";
import { useGetUser } from "@/hooks/user/useGetUser";
import { authStore, mainPageStore } from "@/store";
import {  Modals, PopUpTypes, Role } from "@/types";
import { NIL_OBJECT_ID } from "@/types/misc";
import { ObjectId } from "mongodb";
import { useEffect } from "react";

// type TicketProps = {
//     ticketId: ObjectId;
//     setTicketOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     setPopupType: React.Dispatch<React.SetStateAction<string>>;
// };
// type TicketProps = MainPageStoreProps & {
//   ticketId: ObjectId;
//   // inactiveTicekts: number;
//   // setInactiveTickets: React.Dispatch<React.SetStateAction<number>>;
// };
type TicketProps = {
    ticketId: ObjectId;
    taQueueId: ObjectId;
}

export const Ticket: React.FC<TicketProps> = ({
  ticketId,
    taQueueId,
  // inactiveTicekts,
  // setInactiveTickets,
}) => {
  // console.log("Yppppppppppppp", ticketId);
  // unpack the ticket and the getTicket function from the useGetTicket hook
  const { ticket, getTicket, loading: ticketLoading } = useGetTicket();
  const { user, loading: userLoading, getUser } = useGetUser();
  const { userItems } = authStore();
  const unauthorized =
    userItems.roles !== Role.Ta &&
    userItems.roles !== Role.Admin &&
    userItems.roles !== Role.Professor;
  // const {
  //   taQueueId,
  //   setCurTicket,
  //   setIsExpanded: setTicketOpen,
  //   setCurrentPopUpType: setPopupType,
  //   curTicket,
  // } = curStore();

  

    const { setCurTicket, setCurrentPopUpType: setPopupType } = mainPageStore();
  //function to handle the click of the resolve button
  //this function will set the ticket open to true and the popup type to resolve ticket
  //this will open the resolve ticket popup
  const handleClick = async () => {
    if (unauthorized && ticket?.studentId !== userItems._id) {
      //toast.error("You do not have permission to view this ticket");
      return;
    }
    // setTicketOpen(true);
    setCurTicket(ticket);
    setPopupType(PopUpTypes.ResolveTicket);

    document.getElementById(`${Modals.QueuePopup}${taQueueId}`).showModal();
    // <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
  };

  // useEffect to get the ticket and the user
  // this will get the ticket and the user when the component mounts
  // this will get the ticket and the user when the ticket changes
  // this is cached
  useEffect(() => {
    getTicket(ticketId);
  }, []);

  // useEffect to get the user
  // this will get the user when the ticket changes
  // this is cached
  useEffect(() => {
    if (ticket) getUser(ticket.studentId);
    //if it is inactive, increaase the inactive tickets count
    //use effect so this only triggers once
    // if (inactive) setInactiveTickets(inactiveTicekts + 1);
  }, [ticket]);

  // if the ticket is loading, return a loading div otherwise, this
  // is a shortend description of the ticket for display purposes
  const shortendDescription = ticket
    ? ticket.description.slice(0, 20) + "..."
    : "loading";

  // console.log("ticlket", ticket);
  // console.log("user", user);
  // console.log("ticket", ticket);

  // check if hte ticket is active
  const inactive = ticket?.taId && ticket.taId.toString() !== NIL_OBJECT_ID;

  // If there is a TA id present in the ticket, it is resolved
  // and we return no object here
  if (inactive) {
    return null;
  }
  // if the ticket is loading, return a loading div otherwise, this is the ticket component
  if (ticketLoading || userLoading) return <div>Loading...</div>;
  return (
    <li
      className={`p-4 flex items-center gap-4 bg-gray-300 rounded-lg mb-2 ${
        (!unauthorized || ticket?.studentId == userItems._id) &&
        "hover:cursor-pointer hover:bg-gray-200"
      }`}
      onClick={handleClick}
    >
      <div className="size-10 rounded-full overflow-hidden">
        <img
          src={user ? user.profilePic : "https://robohash.org/dsfaasdf.jpeg"}
          alt="Ticket Icon"
        />
      </div>
      <div className="font-semibold">{ticket?.problem}</div>
      <div className="text-xs font-normal opacity-60">
        {shortendDescription}
      </div>
    </li>
  );
};
