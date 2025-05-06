import { TicketPopupAnal } from "@/components/analytics/middleCol/ticketpopupanal";
import { useGetTicket } from "@/hooks/tickets/useGetTicket";
import { useGetUser } from "@/hooks/user/useGetUser";
import { analyticsPageStore } from "@/store";
import { DateRangeBounds, NIL_OBJECT_ID, Ticket, TicketPieType } from "@/types";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

interface TicketDisplayProps {
  curTicketId: ObjectId;
  dateRangeBounds: DateRangeBounds;
}

export const TicketDisplay: React.FC<TicketDisplayProps> = ({
  curTicketId,
  dateRangeBounds,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleOpenPopup = (ticket: Ticket) => {
    setSelectedTicket(ticket); // Sets selected ticket on click
  };

  const handleClosePopup = () => {
    setSelectedTicket(null); // Close popup when onClose is triggered
  };

  const { ticket, getTicket } = useGetTicket();
  const { selectedDates, ticketTypes, setTicketTypes } = analyticsPageStore();
  const { getUser, user } = useGetUser();

  const ticketDate = new Date(ticket?.date || 0);
  const isValid = ticketDate?.getTime() > dateRangeBounds?.startDate.getTime();

  useEffect(() => {
    getTicket(curTicketId);
  }, [curTicketId, getTicket]);

  useEffect(() => {
    if (!isValid) return;
    if (!ticket || !ticket.problemtype) return;

    const gettingUser = async () => {
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
      // console.log("Ticket TA ID: ", ticket?.taId.toString() !== NIL_OBJECT_ID);
      if (ticket?.taId && ticket?.taId !== NIL_OBJECT_ID) {
        newSet.add(ticket.taId);
      }
      // newSet.add(ticket.taId);
      return newSet;
    });

    gettingUser();

    // Update ticket types for analytics
    setTicketTypes((prevTypes: TicketPieType[]) =>
      prevTypes.map((type) =>
        type.name === ticket.problemtype
          ? { ...type, value: type.value + 1 }
          : type,
      ),
    );

    analyticsPageStore.getState().setRenderedTickets((prev) => prev + 1);
  }, [ticket, isValid, selectedDates, setTicketTypes]);

  if (!isValid) return;
  if (!ticket) return <p>Loading...</p>;

  return (
    <>
      <li
        key={ticket._id.toString()}
        onClick={() => handleOpenPopup(ticket)}
        className="p-4 flex items-center gap-4 bg-base-100 rounded-lg cursor-pointer hover:bg-base-300 transition duration-200"
      >
        <div className="size-10 rounded-full overflow-hidden">
          <img src={user?.profilePic} alt="Ticket Icon" />
        </div>
        <div className="font-semibold">{ticket.problem}</div>
        <div className="text-xs font-normal opacity-60">
          {ticket.description}
        </div>
      </li>

      {/* Ticket Popup (Modal) */}
      {selectedTicket && (
        <TicketPopupAnal
          ticket={selectedTicket}
          isOpen={!!selectedTicket} // Opens when a ticket is selected
          onClose={handleClosePopup} // Close popup when onClose is triggered
        />
      )}
    </>
  );
};

export default TicketDisplay;
