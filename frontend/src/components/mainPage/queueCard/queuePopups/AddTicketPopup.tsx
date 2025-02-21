import { useCreateTicket } from "@/hooks";
import { ObjectId } from "mongodb";
import { useState } from "react";

type AddTicketPopupProps = {
    classId: ObjectId;
    taQueueId: ObjectId;
};

export const AddTicketPopup: React.FC<AddTicketPopupProps> = ({
    classId,
    taQueueId,
}) => {
    const { loading, createTicket } = useCreateTicket();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await createTicket(classId, taQueueId.toString(), curDescription, curProblem);
        console.log(res);
    };
    const [curProblem, setCurProblem] = useState<string>("");
    const [curDescription, setCurDescription] = useState<string>("");
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
            <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 hover:bg-green-500"
            >
                submit
            </button>
        </form>
    );
};
