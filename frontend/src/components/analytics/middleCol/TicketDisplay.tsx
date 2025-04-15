import { useGetTicket } from "@/hooks/tickets/useGetTicket";
import { useGetUser } from "@/hooks/user/useGetUser";
import { analyticsPageStore } from "@/store";
import { ObjectId } from "mongodb";
import { useEffect } from "react";

const TicketDisplay = ({ curTicketId }: { curTicketId: ObjectId }) => {
  const { ticket, getTicket } = useGetTicket();
  const { ticketTypes, setTicketTypes } = analyticsPageStore();
  const { getUser, user } = useGetUser();
  useEffect(() => {
    getTicket(curTicketId);
  }, []);

    console.log(ticket)
  useEffect(() => {
    if (!ticket || !ticket.problemtype) return;
    const gettingUSer = async () => {
      if (ticket?.studentId) {
        const res = await getUser(ticket?.studentId);
        analyticsPageStore.getState().setIndividualAttenders((prev) => {
          const newSet = new Set(prev);
            if (res && res._id) {
                newSet.add(res._id);
            }
          return newSet;
        });
      }
    };
    gettingUSer();
    // const updatedType = ticketTypes.map((type) => {
    //   if (type.name === ticket?.problemtype) {
    //     return { ...type, value: type.value + 1 };
    //   }
    //   return type;
    // });

    //     // console.log("updatedType", updatedType);
    //     setTicketTypes(updatedType);
    setTicketTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.name === ticket.problemtype
          ? { ...type, value: type.value + 1 }
          : type,
      ),
    );
  }, [ticket]);

  // console.log("TicketDisplay", ticket);
  return (
    <li className="p-4 flex items-center gap-4 bg-base-100 rounded-lg">
      {ticket ? (
        <>
          <div className="size-10 rounded-full overflow-hidden">
            <img src={user?.profilePic} alt="Ticket Icon" />
          </div>
          <div className="font-semibold">{ticket.problem}</div>
          <div className="text-xs font-normal opacity-60">
            {ticket.description}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </li>
  );
};

export default TicketDisplay;

// {tickets && tickets.length > 0 ? (
//     tickets.map((ticketName, index) => (
//     ))
// ) : (
//         <p>No Unresolved Tickets</p>
//     )}
