import { ObjectId } from "mongodb";

export interface Ticket {
    _id?: ObjectId;
    date: Date;
    student: ObjectId;
    problem: string;
    description: string;
    ta: ObjectId;
    taNotes: string;
    screenshots: string[];
}
