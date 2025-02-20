import { ObjectId } from "mongodb";

export interface TaQueue {
    _id?: ObjectId;
    TAs: ObjectId[];
    isActive: boolean;
    class: ObjectId;
    directions: string;
    tickets: ObjectId[];
}

export type QueueProps = {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

type PopUpType = string;

export const PopUpTypes = {
    AddTicket: "AddTicket" as PopUpType,
    ResolveTicket: "ResolveTicket" as PopUpType,
}

export type AddPopUpProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TaQueueCreateResponse = {
    taQueue: TaQueue;
};
