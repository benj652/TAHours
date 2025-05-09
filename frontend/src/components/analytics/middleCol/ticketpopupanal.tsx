/*
 * TicketPopup.tsx
 * This file contains the ticket popup component for the analytics page
 * It shows the ticket details
 */
import { useGetUser } from "@/hooks/user/useGetUser";
import { Modals, Ticket } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

// defines the props for the TicketPopup component
interface TicketPopupProps {
  ticket: Ticket;
  isOpen: boolean;
  onClose: () => void;
}

// defines the TicketPopup component
export const TicketPopupAnal: React.FC<TicketPopupProps> = ({
  ticket,
  isOpen,
  onClose,
}) => {
  const { getUser } = useGetUser();
  const [taUser, setTaUser] = useState<any>(null);
  const [createdByUser, setCreatedByUser] = useState<any>(null);

  useEffect(() => {
    const PLACEHOLDER_TA_ID = "000000000000000000000000";

    if (ticket?.taId && ticket.taId.toString() !== PLACEHOLDER_TA_ID) {
      getUser(ticket.taId).then(setTaUser);
    }

    if (ticket?.studentId) {
      getUser(ticket.studentId).then(setCreatedByUser);
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ticket?.taId, ticket?.studentId, getUser]);

  return (
    // displays the ticket popup
    <dialog
      id={`${Modals}${ticket._id}`}
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </form>

        <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>

        {/* Created By Info */}
        {ticket.studentId && createdByUser && (
          <div className="flex items-center gap-4 bg-base-300 p-4 rounded-lg mb-4">
            <img
              src={createdByUser.profilePic}
              alt="User profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-500">{createdByUser.email}</p>
              <p className="text-lg font-medium">
                {createdByUser.firstName} {createdByUser.lastName}
              </p>
              <p className="text-sm text-gray-500">Ticket Creator</p>
            </div>
          </div>
        )}

        {/* TA Info */}
        {ticket.taId && taUser && (
          <div className="flex items-center gap-4 bg-base-300 p-4 rounded-lg mb-6">
            <img
              src={taUser.profilePic}
              alt="TA profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-500">{taUser.email}</p>
              <p className="text-lg font-medium">
                {taUser.firstName} {taUser.lastName}
              </p>
              <p className="text-sm text-gray-500">Assigned TA</p>
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
