import { useSocketContext } from "@/context";
import { threadStore } from "@/store";
import { useEffect, useState } from "react";

// type useListenMessagesProps = {
//     messages: Post[];
//     setMessages: React.Dispatch<React.SetStateAction<Post[]>>;
// };
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { data: messages, setData: setMessages } = threadStore();
  const [, setForceRender] = useState(false);

  useEffect(() => {
    console.log("useListenMessages HEHREHREHRHERHE");
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      try {
        const newMessage = JSON.parse(event.data);
        console.log("newMessage", newMessage);
        if (newMessage.type === "newMessage") {
          setMessages([...(messages || []), newMessage.data]);
        } else if (newMessage.type === "deleteMessage") {
          const newMessages = messages.filter(
            (message) => message._id !== newMessage.data,
          );
          setMessages(newMessages);
        } else if (newMessage.type === "newComment") {
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
