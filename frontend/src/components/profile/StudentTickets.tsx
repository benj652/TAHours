/*
 * StudentTickets.tsx
 * This file contains the student tickets component
 * It shows the tickets the user has created
 * It is a list of tickets which can be accessed with TicketPopup
 */
import { authStore } from "@/store";
import { Ticket } from "@/types";
import { useState } from "react";
import { TicketPopup } from "./TicketPopup";

interface StudentTicketsProps {
  tickets: Ticket[];
}

/**
 * StudentTickets component
 * Shows the tickets the user has created
 * It is a list of tickets which can be accessed with TicketPopup
 * @param {StudentTicketsProps} props
 * @returns {JSX.Element}
 */
export const StudentTickets: React.FC<StudentTicketsProps> = ({ tickets }) => {
  const { userItems } = authStore();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  /**
   * Handles opening the ticket popup when a ticket is clicked
   * Sets selected ticket to the clicked ticket
   * @param {Ticket} ticket - The ticket that was clicked
   */
  const handleOpenPopup = (ticket: Ticket) => {
    setSelectedTicket(ticket); // Sets selected ticket on click
  };

  /**
   * Handles closing the ticket popup
   * Resets selected ticket to null
   */
  const handleClosePopup = () => {
    setSelectedTicket(null); // Close popup when onClose is triggered
  };

  // Reverse tickets for display purposes
  const reversedTickets = [...(tickets || [])].reverse();

  return (
    <>
      <div className="bg-base-300 rounded-lg p-4 shadow-lg h-96 overflow-y-auto relative">
        <ul className="list-none w-full space-y-2">
          {reversedTickets.length > 0 ? (
            reversedTickets.map((ticket) => (
              <li
                key={ticket._id.toString()}
                onClick={() => handleOpenPopup(ticket)} // Set selected ticket on click
                className="p-4 flex items-center gap-4 bg-base-100 rounded-lg cursor-pointer hover:bg-base-200 transition"
              >
                <div className="size-10 rounded-full overflow-hidden">
                  <img src={userItems.profilePic} alt={userItems.firstName} />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">{ticket.problem}</div>
                  <div className="text-xs font-normal opacity-60 truncate max-w-xs">
                    {ticket.description || "No description"}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center">No Unresolved Tickets</p>
          )}
        </ul>
      </div>

      {/* Ticket Popup (Modal) */}
      {selectedTicket && (
        <TicketPopup
          ticket={selectedTicket}
          isOpen={!!selectedTicket} // Opens when a ticket is selected
          onClose={handleClosePopup} // Close popup when onClose is triggered
        />
      )}
    </>
  );
};
