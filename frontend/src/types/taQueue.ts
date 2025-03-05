import { ObjectId } from "mongodb";
import { StoreApi, UseBoundStore } from "zustand";
import { Ticket } from "./tickets";

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
};

export type PopUpType = string;

export const PopUpTypes = {
  AddTicket: "AddTicket" as PopUpType,
  ResolveTicket: "ResolveTicket" as PopUpType,
};

export type AddPopUpProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TaQueueCreateResponse = {
  taQueue: TaQueue;
};

export type MainPageStore = {
  curTickets: ObjectId[] | null;
  setCurTickets: (tickets: ObjectId[] | null) => void;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  taQueueId: ObjectId | undefined;
  setTaQueueId: (taQueueId: ObjectId | undefined) => void;
  classId: ObjectId | null;
  setClassId: (classId: ObjectId | null) => void;
  curPopUpType: PopUpType | undefined;
  setCurrentPopUpType: (popUpType: PopUpType | undefined) => void;
  curTicket: Ticket;
  setCurTicket: (ticket: Ticket | undefined) => void;
};

export type MainPageStoreProps = {
  curStore: UseBoundStore<StoreApi<MainPageStore>>;
};

export type SessionButtonProps = {
  curTas: ObjectId[];
  setCurTas: React.Dispatch<React.SetStateAction<ObjectId[]>>;
  taQueueId: ObjectId | undefined;
};

// return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 	"id":       taQueue.ID,
// 	"isActive": taQueue.IsActive,
// })

export type TaQueueLeaveResponse = {
  queueId: ObjectId;
  isActive: boolean;
};

export type TaQueueJoinEvent = {
  type: string;
  data: {
    queueId: ObjectId;
    taId: ObjectId;
  };
};

// payload := map[string]interface{}{
// 	"taId":     TaID,
// 	"isActive": taQueue.IsActive,
// 	"queueID":  queueID,
// }
export type TaQueueLeaveEvent = {
  taId: ObjectId;
  isActive: boolean;
  queueID: ObjectId;
};
