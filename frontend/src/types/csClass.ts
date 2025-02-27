import { ObjectId } from "mongodb";

export interface CSClass {
    _id?: ObjectId;
    name: string;
    activeQueue: ObjectId;
    queues: ObjectId[];
    isActive: boolean;
    semester: string;
    year: number;
}

export type CreateCSClassParams = {
    name: string | null;
    semester: string | null;
    year: number | null;
}

export const SEMESTER_NAMES = {
    FALL: "Fall",
    SPRING: "Spring",
}
