import { useSocketContext } from "@/context";
import { taQueueStore } from "@/store";
import { useEffect } from "react";

/**
 * Hook to listen for events on the main page
 */
export const useListenMainPage = () => {
    const { setAllTaQueues, allTaQueues } = taQueueStore();
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket) return;
        const handleMessage = (event: MessageEvent) => {
            try {
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

