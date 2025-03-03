import { useSocketContext } from "@/context";
import { threadStore } from "@/store";
import { THREAD_EVENTS } from "@/types";
import { useEffect, useState } from "react";

// type useListenMessagesProps = {
//     messages: Post[];
//     setMessages: React.Dispatch<React.SetStateAction<Post[]>>;
// };
//

/**
 * This hook listens for messages from the WebSocket connection and updates the messages state accordingly.
 *
 * It only listens for messages that have to do with the thread, which are only broadcasted
 * to TAs, Admins, and Professors.
 *
 * @returns void
 */
const useListenMessages = () => {
  // unpacking needed context
  const { socket } = useSocketContext(); // socket is the WebSocket connection
  const { data: messages, setData: setMessages } = threadStore(); // messages is the state of the messages
  const [, setForceRender] = useState(false); // force render to update the UI

  /**
   * This hook listens for messages from the WebSocket connection and updates the messages state accordingly.
   *
   * It updates whenever the socket or messages change.
   */
  useEffect(() => {
    // console.log("useListenMessages HEHREHREHRHERHE");
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      try {
        if (!messages) return;
        const newMessage = JSON.parse(event.data);
        console.log("newMessage", newMessage);
        if (newMessage.type === THREAD_EVENTS.NEW_MESSAGE) {
          setMessages([...(messages || []), newMessage.data]);
        } else if (newMessage.type === THREAD_EVENTS.DELETE_MESSAGE) {
          const newMessages = messages.filter(
            (message) => message._id !== newMessage.data,
          );
          setMessages(newMessages);
        } else if (newMessage.type === THREAD_EVENTS.NEW_COMMENT) {
          // WORK IN PROGRESS
          const targetId = newMessage.data.postId;
          console.log(newMessage.data.comment);
          // const targetMessage = messages.find(
          const targetMessage = messages.find((post) => post._id === targetId);
          console.log("targetMessage", targetMessage);
          if (!targetMessage) return;
          targetMessage.comments?.push(newMessage.data.comment);
          setForceRender((prev) => !prev);
        }
      } catch (error) {
        console.error(error);
      }
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
// setMessages( messages.map((message) => { if (message._id === targetId) { return { ...message, comments: [ ...(message.comments || []), newMessage.data.comment, ], }; } return message; }),);
