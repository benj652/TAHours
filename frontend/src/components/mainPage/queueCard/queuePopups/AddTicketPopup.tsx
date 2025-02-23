import { useCreateTicket } from "@/hooks";
import { taQueueStore, ticketStore } from "@/store";
import { MainPageStoreProps, PROBLEM_TYPES, Ticket } from "@/types";
import { useState } from "react";

// type AddTicketPopupProps = {
//     classId: ObjectId;
//     taQueueId: ObjectId;
//     tickets: ObjectId[];
//     setTickets: React.Dispatch<React.SetStateAction<ObjectId[]>>;
// };
/**
 * This is the popup used when you want to add a ticket
 * It looks ugly atm and will need to be looking bussin
 */
export const AddTicketPopup: React.FC<MainPageStoreProps> = ({ curStore }) => {
    const {
        classId,
        taQueueId,
        setCurTickets: setTickets,
        curTickets: tickets,
        setIsExpanded,
    } = curStore();

    // We unpack a bunch of caching stuff so no reloads are needed
    const { loading, createTicket, error } = useCreateTicket();
    const { addTicketToCache } = ticketStore();
    const { allTaQueues } = taQueueStore();

    /**
     * Function to handle adding a new ticket
     * It updates all caches associated with the process
     * Web sockets will need to be implemented with this maybe
     *
     * @returns nothing bruh
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: work out a way to display errors.
        if (!taQueueId) return;
        if (!classId) return;
        const res = (await createTicket(
            classId,
            taQueueId.toString(),
            curDescription,
            curProblem,
            curType,
            curAttachments,
        )) as Ticket;
        //need to toast this or something
        if (!res) return;
        if (!res._id) return;

        // the following lines up to line #44 will/should likely reside in thier own function at somepoint
        addTicketToCache(res);

        // It is saying that tickets needs some object tytpe iterator or whatever but I always just ignore that error and it all works out
        //@ts-ignore
        setTickets([...tickets, res._id]);

        // Updates the cached queue to have the new id
        const targetQueue = allTaQueues.find((queue) => queue._id === taQueueId);

        if (!targetQueue) return;
        targetQueue.tickets.push(res._id);
        console.log(res);

        // Closes the popup
        setIsExpanded(false);
    };

    // Trackers to see what is netered in the form
    const [curProblem, setCurProblem] = useState<string>("");
    const [curDescription, setCurDescription] = useState<string>("");
    const [curType, setCureType] = useState<string>(PROBLEM_TYPES.DEBUGGING);

    // Tracker for uploaded screenshots
    const [curAttachments, setCurAttachments] = useState<string[]>([]);
    const [curAttatchment, setCurAttatchment] = useState<string>("");

    // Function to handle file uploads
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target) return;
            setCurAttatchment(e.target.result as string);
            console.log(curAttatchment);
        };
        reader.readAsDataURL(file);
    };

    // function to add the screenshot to the list of attachments
    const handleFileUpload = async () => {
        const newAttatchment = curAttatchment;
        if (!newAttatchment || newAttatchment === "") return;
        setCurAttachments([...curAttachments, newAttatchment]);
        setCurAttatchment("");
    };

    const handleDeleteAttachment = async (index: number) => {
        const newAttachments = curAttachments.filter((_, i) => i !== index);
        console.log(newAttachments.length);
        setCurAttachments(newAttachments);
    };

    return (
        <form className="bg-amber-500" onSubmit={handleSubmit}>
            <label> Problem </label>
            <input
                type="text"
                value={curProblem}
                onChange={(e) => setCurProblem(e.target.value)}
            />
            <label> Description </label>
            <textarea
                value={curDescription}
                onChange={(e) => setCurDescription(e.target.value)}
            />
            <label>Problem Type</label>
            <select onChange={(e) => setCureType(e.target.value)}>
                <option value={PROBLEM_TYPES.DEBUGGING}>Debugging</option>
                <option value={PROBLEM_TYPES.SYNTAX}>Syntax</option>
                <option value={PROBLEM_TYPES.LOGIC}>Logic</option>
                <option value={PROBLEM_TYPES.RUNTIME}>Runtime</option>
                <option value={PROBLEM_TYPES.INSTALLATION}>Installation</option>
                <option value={PROBLEM_TYPES.OTHER}>Other</option>
                </select>
            <label> Attachments </label>
            <div>
                {curAttachments.map((attatchment, index) => (
                    <div key={index} className="flex flex-row">
                        <img className="w-96 h-auto" src={attatchment} />
                        <button
                            type="button"
                            onClick={() => handleDeleteAttachment(index)}
                            className="bg-pink-500 hover:bg-green-500"
                        >
                            {" "}
                            remove{" "}
                        </button>
                    </div>
                ))}
                <input
                    className="bg-pink-500 hover:bg-green-500"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleFileUpload}
                    className="bg-pink-500 hover:bg-green-500"
                    type="button"
                >
                    {" "}
                    upload{" "}
                </button>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 hover:bg-green-500"
            >
                submit
            </button>
            {error}
        </form>
    );
};
