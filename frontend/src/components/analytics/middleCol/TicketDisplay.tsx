import { useGetTicket } from "@/hooks/tickets/useGetTicket";
import { useGetUser } from "@/hooks/user/useGetUser";
import { analyticsPageStore } from "@/store";
import { DateRangeBounds, NIL_OBJECT_ID, Ticket, TicketPieType } from "@/types";
import { ObjectId } from "mongodb";
import { useEffect } from "react";

const TicketDisplay = ({
  curTicketId,
  dateRangeBounds,
}: {
  curTicketId: ObjectId;
  dateRangeBounds: DateRangeBounds;
}) => {
  const { ticket, getTicket } = useGetTicket();
  const { selectedDates, ticketTypes, setTicketTypes } = analyticsPageStore();
  const { getUser, user } = useGetUser();
  const ticketDate = new Date(ticket?.date || 0);
  const isValid = ticketDate?.getTime() > dateRangeBounds?.startDate.getTime();
  useEffect(() => {
    getTicket(curTicketId);
  }, []);

  // console.log(ticket)
  useEffect(() => {
    if(!isValid) return;
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
    analyticsPageStore.getState().setTaAttenders((prev) => {
        const newSet = new Set(prev);
        newSet.add(ticket.taId);
            return newSet;
        })
    gettingUSer();
    // const updatedType = ticketTypes.map((type) => {
    //   if (type.name === ticket?.problemtype) {
    //     return { ...type, value: type.value + 1 };
    //   }
    //   return type;
    // });

    //     // console.log("updatedType", updatedType);
    //     setTicketTypes(updatedType);
    analyticsPageStore.getState().setRenderedTickets((prev) => prev + 1);

    setTicketTypes((prevTypes: TicketPieType[]) =>
      prevTypes.map((type) =>
        type.name === ticket.problemtype 
          ? { ...type, value: type.value + 1 }
          : type,
      ),
    );
  }, [ticket, isValid, selectedDates]);

  // console.log("TicketDisplay", ticket);
  // console.log("ticket date", ticketDate.getTime())
  // console.log("start date", dateRangeBounds?.startDate.getTime())
  // console.log("end date", dateRangeBounds?.endDate.getTime())
  // console.log(ticketDate.getTime() > dateRangeBounds?.startDate.getTime())
  if (!isValid) return;
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
