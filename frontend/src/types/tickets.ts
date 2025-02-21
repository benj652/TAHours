import { ObjectId } from "mongodb";

export interface Ticket {
    _id?: ObjectId;
    date: Date;
    studentId: ObjectId;
    problem: string;
    description: string;
    ta: ObjectId;
    taNotes: string;
    screenshots: string[];
}

export type TicketProps = {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
