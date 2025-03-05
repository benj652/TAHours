import { authStore } from "@/store";
import { RolesConfig, SOCKET_URI_CONSTS } from "@/types";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface OnlineUsersMessage {
  type: "onlineUsers";
  users: string[]; 
}

interface SocketContextType {
  socket: WebSocket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider",
    );
  }
  return context;
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { userItems: authUser } = authStore();

  useEffect(() => {
    if (authUser) {
      const canSeeThread =
        authUser.roles === RolesConfig.Admin ||
        authUser.roles === RolesConfig.Ta ||
        authUser.roles === RolesConfig.Professor;
      const ws = new WebSocket(
        canSeeThread
          ? `${SOCKET_URI_CONSTS.SOCKET_URI}?${SOCKET_URI_CONSTS.USER_WS_ID}=${authUser._id}&${SOCKET_URI_CONSTS.THREAD_ACCESS}=9284091284920149`
          : `${SOCKET_URI_CONSTS.SOCKET_URI}?${SOCKET_URI_CONSTS.USER_WS_ID}=${authUser._id}`,
      );

      ws.onopen = () => {
        console.log("WebSocket connected");
        setSocket(ws);
      };

      ws.onmessage = (event: MessageEvent) => {
        try {
          const data: OnlineUsersMessage = JSON.parse(event.data);
          if (data.type === "onlineUsers") {
            setOnlineUsers(data.users);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setSocket(null);
      };

      return () => {
        ws.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
