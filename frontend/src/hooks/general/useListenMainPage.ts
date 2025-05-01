import { useSocketContext } from "@/context";
import {
  authStore,
  forceUpdateStore,
  taQueueStore,
  ticketStore,
  userStore,
} from "@/store";
import {
  TaQueue,
  TaQueueJoinEvent,
  TaQueueLeaveEvent,
  THREAD_EVENTS,
  TicketCreateEvent,
  TicketResolveEvent,
  TokenConfig,
  UserChageDescriptionEventPayload,
  UserRoleChangeEventPayload,
} from "@/types";
import { RANDOM_OBJECT_ID } from "@/types/misc";
import { ObjectId } from "mongodb";
import { useEffect } from "react";
import { toast } from "sonner";

/**
 * Hook to listen for events on the main page
 */
export const useListenMainPage = () => {
  const { setAllTaQueues, allTaQueues } = taQueueStore();
  const { socket } = useSocketContext();
  const { getTicketFromCache, addTicketToCache } = ticketStore();
  const { addUserToCache } = userStore();
  const { triggerRerender } = forceUpdateStore();
  const { userItems } = authStore();

  // Call `forceRender()` instead of `setForceRender`

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      try {
        if (!allTaQueues) return;
        const newMessage = JSON.parse(event.data);
        // console.log("new message", newMessage);
        if (newMessage.type === THREAD_EVENTS.TICKET_RESOLVE_EVENT) {
          const res = newMessage as TicketResolveEvent;
          const resolved = getTicketFromCache(res.data);
          if (!resolved) return;
          //@ts-expect-error noitems
          resolved.taId = RANDOM_OBJECT_ID as ObjectId;
          //console.log(newMessage, "resolved");
          // waiting till tomorrow to test
          if (userItems._id === resolved.studentId) {
            toast.success("Your ticket has been resolved");
          }
          addTicketToCache(resolved);
        }
        if (newMessage.type === THREAD_EVENTS.TA_LEAVE_QUEUE_EVENT) {
          // const curTaQueue = allTaQueues.filter(
          //   (curTaQueueId) => curTaQueueId._id === taQueueId
          // );

          // // these two cases will onlky happen if htere is an error
          // if (curTaQueue.length === 0) return;
          // if (!curTaQueues || curTaQueues.length === 0) return;
          // if (curTaQueue[0].TAs.length === 0) return;

          // if (!res.isActive) {
          //   // The ta was the last one in the queue, so the queue is now over as they have left.
          //   // console.log("curTaQueue[0].TAs.length === 1");
          //   const newTaQueues = curTaQueues.filter(
          //     (taQueue) => taQueue._id !== taQueueId
          //   );
          //   setTaQueues(newTaQueues);
          // } else {
          //   // curTaQueue[0].TAs = curTaQueue[0].TAs.filter(
          //   //   (taId) => taId !== userItems._id
          //   // );
          //  const updatedQueues = curTaQueues.map((queue) => {
          // if (queue._id === taQueueId) {
          //   return {
          //     ...queue,
          //     TAs: queue.TAs.filter((taId) => taId !== userItems._id),
          //   };
          // }
          // return queue;
          // });
          // setTaQueues(updatedQueues);
          const res = newMessage.data as TaQueueLeaveEvent;
          // If the last TA leaves a queue, set it to inactive and remove it
          // if (!res.isActive) {
          //     const filteredTaQueues = allTaQueues.filter(
          //         (queue) => queue._id !== res.queueID,
          //     );
          //     setAllTaQueues(filteredTaQueues);
          //     return;
          // }
          const targetTaQueue = allTaQueues.filter(
            (queue: TaQueue) => queue._id === res.queueID
          );
          if (!targetTaQueue || targetTaQueue.length === 0) return;

          if (!res.isActive) {
            // The ta was the last one in the queue, so the queue is now over as they have left.
            // console.log("curTaQueue[0].TAs.length === 1");
            const newTaQueues = allTaQueues.filter(
              (taQueue: TaQueue) => taQueue._id !== res.queueID
            );
            setAllTaQueues(newTaQueues);
          } else {
            // curTaQueue[0].TAs = curTaQueue[0].TAs.filter(
            //   (taId) => taId !== userItems._id
            // );
            const updatedQueues = allTaQueues.map((queue: TaQueue) => {
              if (queue._id === res.queueID) {
                return {
                  ...queue,
                  TAs: queue.TAs.filter((taId) => taId !== res.taId),
                };
              }
              return queue;
            });
            setAllTaQueues(updatedQueues);
          const targetTaQueue2 = allTaQueues.filter(
            (queue: TaQueue) => queue._id === res.queueID
          );
                        targetTaQueue2[0].TAs.push(res.taId);

            const updatedQueues2 = allTaQueues.map((queue: TaQueue) => {
              if (queue._id === res.queueID) {
                return {
                  ...queue,
                  TAs: queue.TAs.filter((taId) => taId !== res.taId),
                };
              }
              return queue;
            });
            setAllTaQueues(updatedQueues2);
            triggerRerender();

            // console.log(
            // "new ta oogachacka yeeeeeeeeeeww yeah buddy nascar geetin there get that bread",
            // );
            // console.log(targetTaQueue);
            // Need to likely make this mutate global state idk if this
            // will work as as
            // targetTaQueue[0].TAs = targetTaQueue[0].TAs.filter(
            //     (taId) => taId !== res.taId,
            // );
            // triggerRerender();
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
        }
        if (newMessage.type === THREAD_EVENTS.TA_JOIN_QUEUE_EVENT) {
          const res = newMessage as TaQueueJoinEvent;

          // Find the queue that the new ticket needs to be pushed to
          const targetQueue = allTaQueues.find(
            (queue: TaQueue) => queue._id === res.data.queueId
          );
          // console.log("new ta hjerere bro");
          // These errors should never happen
          if (!targetQueue) return;

          // update the current store
          if (newMessage.data.taId === userItems?._id) return;
          targetQueue.TAs.push(res.data.taId);
          triggerRerender();

          // console.log("new ta oogachacka", res);
        }

        // if the message is a new ta queue event
        // Update the current store and cache to include the new queue
        if (newMessage.type === THREAD_EVENTS.NEW_TA_QUEUE_EVENT) {
          const res = newMessage.data as TaQueue;
          // console.log("new queue", res);
          // add the queue to the cache
          setAllTaQueues([...(allTaQueues || []), res]);
          triggerRerender();
        }
        // if the message is a ticket create event
        // Update the curent store and cache to include the new ticket
        if (newMessage.type === THREAD_EVENTS.TICKET_CREATE_EVVENT) {
          const res = newMessage as TicketCreateEvent;
          // console.log("new ticket", res);
          if (res.data.ticket.studentId === userItems._id) return;
          const newTicketID = res.data.ticket._id;

          // add the ticket to the cache
          addTicketToCache(res.data.ticket);

          // Find the queue that the new ticket needs to be pushed to
          const targetQueue = allTaQueues.find(
            (queue: TaQueue) => queue._id === res.data.taQueue
          );

          // These errors should never happen
          if (!targetQueue) return;
          if (!newTicketID) return;
          // console.log("new ticket here");
          // update the current store
          // targetQueue.tickets.push(newTicketID);
          if (!allTaQueues) return;
          const updatedTaQueues = allTaQueues.map((queue: TaQueue) => {
            if (queue._id === res.data.taQueue) {
              return {
                ...queue,
                tickets: [...(queue.tickets || []), newTicketID],
              };
            }
            return queue;
          });
          setAllTaQueues(updatedTaQueues);

          //           setAllTaQueues((prevQueues: TaQueue[]) => {
          //               return prevQueues?.map((queue) => {
          //                   if (queue._id === res.data.taQueue) {
          //                       return {
          //                           ...queue,
          //                           tickets: [...queue.tickets, newTicketID],
          //                       };
          //                   }
          //                   return queue;
          //               });
          //           });
          triggerRerender();
        }
        if (newMessage.type === THREAD_EVENTS.USER_CHANGE_DESCRIPTION_EVENT) {
          // const res = newMessage as MessageEvent;
          // console.log("new message", res);
            const res = newMessage.data as UserChageDescriptionEventPayload;
            addUserToCache(res.updatedUser);
            setAllTaQueues([...(allTaQueues || [])]);
        }
        if (newMessage.type === THREAD_EVENTS.USER_ROLE_CHANGE_EVENT) {
          const res = newMessage.data as UserRoleChangeEventPayload;
          const curUser = {...userItems, roles : res.newRole}
          localStorage.setItem(TokenConfig.UserItemsToken, JSON.stringify(curUser));
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
