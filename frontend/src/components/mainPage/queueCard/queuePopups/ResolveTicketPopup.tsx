import { ObjectId } from "mongodb";

type ResolveTicketPopupProps = {
    ticket: ObjectId;
};
export const ResolveTicketPopup: React.FC<ResolveTicketPopupProps> = ({
    ticket,
}) => {
    return (
        <div>
            <h1>Resolve Ticket</h1>
            <h2>{ticket.toString()}</h2>
        </div>
    );
};
