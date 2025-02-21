import { useGetTicket } from "@/hooks/tickets/useGetTicket";
import { useGetUser } from "@/hooks/user/useGetUser";
import { MainPageStoreProps, PopUpTypes } from "@/types";
import { NIL_OBJECT_ID } from "@/types/misc";
import { ObjectId } from "mongodb";
import { useEffect } from "react";

// type TicketProps = {
//     ticketId: ObjectId;
//     setTicketOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     setPopupType: React.Dispatch<React.SetStateAction<string>>;
// };
type TicketProps = MainPageStoreProps & {
  ticketId: ObjectId;
  inactiveTicekts: number;
  setInactiveTickets: React.Dispatch<React.SetStateAction<number>>;
};
export const Ticket: React.FC<TicketProps> = ({
  ticketId,
  curStore,
  inactiveTicekts,
  setInactiveTickets,
}) => {
  // console.log("Yppppppppppppp", ticketId);
  // unpack the ticket and the getTicket function from the useGetTicket hook
  const { ticket, getTicket, loading: ticketLoading } = useGetTicket();
  const { user, loading: userLoading, getUser } = useGetUser();
  const {
    setCurTicket,
    setIsExpanded: setTicketOpen,
    setCurrentPopUpType: setPopupType,
    curTicket,
  } = curStore();

  //function to handle the click of the resolve button
  //this function will set the ticket open to true and the popup type to resolve ticket
  //this will open the resolve ticket popup
  const handleClick = async () => {
    setTicketOpen(true);
    setCurTicket(ticket);
    setPopupType(PopUpTypes.ResolveTicket);
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
  }, [ticket]);

  // if the ticket is loading, return a loading div otherwise, this
  // is a shortend description of the ticket for display purposes
  const shortendDescription = ticket
    ? ticket.description.slice(0, 20) + "..."
    : "loading";

  // console.log("ticlket", ticket);
  // console.log("user", user);
  console.log("ticket", ticket);

  // check if hte ticket is active
  const inactive = ticket?.taId && ticket.taId.toString() !== NIL_OBJECT_ID;

  //if it is inactive, increaase the inactive tickets count
  //use effect so this only triggers once
  useEffect(() => {
    if (inactive) setInactiveTickets(inactiveTicekts + 1);
  }, [ticket]);
  // If there is a TA id present in the ticket, it is resolved
  // and we return no object here
  if (inactive) {
    return null;
  }
  // if the ticket is loading, return a loading div otherwise, this is the ticket component
  if (ticketLoading) return <div>Loading...</div>;
  return (
    <li className="p-4 flex items-center gap-4 bg-gray-200 rounded-lg">
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
      <button
        className="btn btn-ghost bg-accent ml-auto shadow-lg"
        onClick={handleClick}
        disabled={curTicket && curTicket?._id && curTicket?._id === ticketId}
      >
        <div className="text-xs uppercase font-semibold text-base-100 ">
          Resolve
        </div>
      </button>
    </li>
  );
};
