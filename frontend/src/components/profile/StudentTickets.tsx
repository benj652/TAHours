import { authStore } from "@/store";
import { Ticket } from "@/types";

interface StudentTicketsProps {
  tickets: Ticket[];
}

export const StudentTickets: React.FC<StudentTicketsProps> = ({ tickets }) => {
  const { userItems } = authStore();
  return (
    <div className="bg-base-300 rounded-lg p-4 shadow-lg h-96 overflow-y-auto">
      <ul className="list-none w-full space-y-2">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li
              key={ticket._id.toString()}
              className="p-4 flex items-center gap-4 bg-base-100 rounded-lg"
            >
              <div className="size-10 rounded-full overflow-hidden">
                <img src={userItems.profilePic} alt={userItems.firstName} />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">{ticket.problem}</div>
                <div className="text-xs font-normal opacity-60">
                  {ticket.description || "No description"}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No Unresolved Tickets</p>
        )}
      </ul>
    </div>
  );
};
