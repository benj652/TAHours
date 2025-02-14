import { ObjectId } from "mongodb";

export interface TaQueue {
    _id?: ObjectId;
    tas: ObjectId[];
    isActive: boolean;
    class: ObjectId;
    directions: string;
    tickets: ObjectId[];
}
