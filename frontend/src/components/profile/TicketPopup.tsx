/*
 * TicketPopup.tsx
 * This file contains the ticket popup component
 * It shows the ticket details
 */
import { useGetUser } from "@/hooks/user/useGetUser";
import { Modals, Ticket } from "@/types";
import { X } from "lucide-react";
import { useEffect } from "react";

interface TicketPopupProps {
  ticket: Ticket;
  isOpen: boolean; // Whether the modal is open or not
  onClose: () => void;
}

/**
 * TicketPopup component
 * Shows the ticket details
 * @param {TicketPopupProps} props - The props for the TicketPopup component
 * @returns {JSX.Element} - The TicketPopup component
 */
export const TicketPopup: React.FC<TicketPopupProps> = ({
  ticket,
  isOpen,
  onClose,
}) => {
  const { getUser, user } = useGetUser();

  // Fetchs ta info on mount/update
  useEffect(() => {
    const PLACEHOLDER_TA_ID = "000000000000000000000000";

    if (ticket?.taId && ticket.taId.toString() !== PLACEHOLDER_TA_ID) {
      getUser(ticket.taId);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ticket?.taId, getUser]);

  return (
    <dialog
      id={`${Modals}${ticket._id}`} // Use ticket ID to uniquely identify the modal
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-xl">
        <form method="dialog">
          {/* Close button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </form>

        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>

        {/* TA Info (only show if TA exists) */}
        {ticket.taId && user && (
          <div className="flex items-center gap-4 bg-base-300 p-4 rounded-lg mb-6">
            <img
              src={user.profilePic}
              alt="TA profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
        )}

        {/* Ticket Info */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Problem Title</p>
            <h2 className="text-lg font-semibold">{ticket.problem}</h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-base">
              {ticket.description || "No description provided."}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Problem Type</p>
            <p className="text-base font-medium">{ticket.problemtype}</p>
          </div>

          {ticket.screenshots?.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Screenshots</p>
              <div className="flex gap-2 overflow-x-auto max-w-full">
                {ticket.screenshots.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    className="h-32 rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="mt-5">
            <p className="text-sm text-gray-500">TA Comments</p>
            <p className="text-base font-medium">
              {ticket.taNote || "unresolved"}
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
};
