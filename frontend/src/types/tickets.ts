import { Ticket } from "@/components";
import { ObjectId } from "mongodb";

export interface Ticket {
  _id?: ObjectId;
  date: Date;
  studentId: ObjectId;
  problem: string;
  description: string;
  taId: ObjectId;
  taNotes: string;
  problemtype: string;
  screenshots: string[];
}

export type TicketProps = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

// <option value="debugging">Debugging</option>
// <option value="syntax">Syntax</option>
// <option value="logic">Logic</option>
// <option value="runtime">Runtime</option>
// <option value="installation">Installation</option>
// <option value="other">Other</option>
export enum PROBLEM_TYPES  {
  DEBUGGING= "debugging",
  SYNTAX= "syntax",
  LOGIC= "logic",
  RUNTIME= "runtime",
  INSTALLATION= "installation",
  OTHER= "other",
};

export type TicketCreateEvent = {
  type: string;
  data: {
    ticket: Ticket;
    taQueue: ObjectId;
  };
};

export type TicketResolveEvent = {
    type: string;
    data: ObjectId
}


export enum TicketTypeLocations  {
    Debugging= 0,
    Syntax= 1,
    Logic= 2,
    Runtime= 3,
    Installation= 4,
    Other= 5,
}
export interface TicketPieType {
  name: PROBLEM_TYPES;
  value: number;
}

