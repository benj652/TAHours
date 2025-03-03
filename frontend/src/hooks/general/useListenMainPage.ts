import { useSocketContext } from "@/context";
import { taQueueStore, ticketStore } from "@/store";
import {
  TaQueue,
  TaQueueJoinEvent,
  THREAD_EVENTS,
  TicketCreateEvent,
  TaQueueLeaveEvent,
} from "@/types";
import { useEffect } from "react";

/**
 * Hook to listen for events on the main page
 */
export const useListenMainPage = () => {
  const { setAllTaQueues, allTaQueues } = taQueueStore();
  const { socket } = useSocketContext();
  const { addTicketToCache } = ticketStore();

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      try {
        if (!allTaQueues) return;
        const newMessage = JSON.parse(event.data);
        if (newMessage.type === THREAD_EVENTS.TICKET_RESOLVE_EVENT) {
            
        }
        if (newMessage.type === THREAD_EVENTS.TA_LEAVE_QUEUE_EVENT) {
          const res = newMessage.data as TaQueueLeaveEvent;

          // If the last TA leaves a queue, set it to inactive and remove it
          if (!res.isActive) {
            const filteredTaQueues = allTaQueues.filter(
              (queue) => queue._id !== res.queueID,
            );
            setAllTaQueues(filteredTaQueues);
            return;
          }

          const targetTaQueue = allTaQueues.filter(
            (queue) => queue._id === res.queueID,
          );

          if (!targetTaQueue || targetTaQueue.length === 0) return;

          // Need to likely make this mutate global state idk if this
          // will work as as
          targetTaQueue[0].TAs = targetTaQueue[0].TAs.filter(
            (taId) => taId !== res.taId,
          );

          // const handleLeaveSession = async () => {
          //     if (!classId) return;
          //     if (!taQueueId) return;
          //     const res = await leaveTaQueue(taQueueId, classId);
          //     if (!res) return;
          //     if (!userItems?._id) return;
          //     const newCurTas = curTas.filter((taId) => taId !== userItems._id);
          //     const curTaQueue = allTaQueues.filter(
          //         (curTaQueueId) => curTaQueueId._id === taQueueId,
          //     );

          //     // these two cases will onlky happen if htere is an error
          //     if (curTaQueue.length === 0) return;
          //     if (!curTaQueues || curTaQueues.length === 0) return;
          //     if (curTaQueue[0].TAs.length === 0) return;

          //     if (curTaQueue[0].TAs.length === 1) {
          //         console.log("curTaQueue[0].TAs.length === 1");
          //         const newTaQueues = curTaQueues.filter(
          //             (taQueue) => taQueue._id !== taQueueId,
          //         );
          //         setTaQueues(newTaQueues);
          //     } else {
          //         curTaQueue[0].TAs = curTaQueue[0].TAs.filter(
          //             (taId) => taId !== userItems._id,
          //         );
          //     }
          //     setCurTas(newCurTas);
          // };
        }
        if (newMessage.type === THREAD_EVENTS.TA_JOIN_QUEUE_EVENT) {
          const res = newMessage.data as TaQueueJoinEvent;

          // Find the queue that the new ticket needs to be pushed to
          const targetQueue = allTaQueues.find(
            (queue) => queue._id === res.data.taQueue,
          );
          // These errors should never happen
          if (!targetQueue) return;

          // update the current store
          targetQueue.TAs.push(res.data.taId);
        }

        // if the message is a new ta queue event
        // Update the current store and cache to include the new queue
        if (newMessage.type === THREAD_EVENTS.NEW_TA_QUEUE_EVENT) {
          const res = newMessage.data as TaQueue;

          // add the queue to the cache
          setAllTaQueues([...allTaQueues, res]);
        }
        // if the message is a ticket create event
        // Update the curent store and cache to include the new ticket
        if (newMessage.type === THREAD_EVENTS.TICKET_CREATE_EVVENT) {
          const res = newMessage.data as TicketCreateEvent;
          const newTicketID = res.data.ticket._id;

          // add the ticket to the cache
          addTicketToCache(res.data.ticket);

          // Find the queue that the new ticket needs to be pushed to
          const targetQueue = allTaQueues.find(
            (queue) => queue._id === res.data.taQueue,
          );

          // These errors should never happen
          if (!targetQueue) return;
          if (!newTicketID) return;

          // update the current store
          targetQueue.tickets.push(newTicketID);
        }
      } catch (error) {
        console.error(error);
      }
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, allTaQueues, setAllTaQueues]);
};
