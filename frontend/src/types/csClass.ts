import { ObjectId } from "mongodb";
import { TaQueue } from "./taQueue";

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
};

export enum SEMESTER_NAMES {
  FALL = "Fall",
  SPRING = "Spring",
}

export type CreateTaQueueResponse = {
    taqueue: TaQueue
}
