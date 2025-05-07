/*
 * csClass.ts
 *
 * This file contains a bunch of types and enums for the CSClass data.
 *
 * This file is used to define the types and enums for the CSClass data
 */
import { ObjectId } from "mongodb";
import { TaQueue } from "./taQueue";

// This is for the CSClass data
//
// It is for all CSClass objects
export interface CSClass {
    _id?: ObjectId;
    name: string;
    activeQueue: ObjectId;
    queues: ObjectId[];
    isActive: boolean;
    semester: string;
    year: number;
}

// This is the parameters for creating CS Classes
export type CreateCSClassParams = {
    name: string | null;
    semester: string | null;
    year: number | null;
};

// This enum is for the CSClass data
//
// Used mostly for dropdowns 
export enum SEMESTER_NAMES {
    FALL = "Fall",
    SPRING = "Spring",
}

// This is what the hook for creating TA queues returns
export type CreateTaQueueResponse = {
    taqueue: TaQueue;
};
