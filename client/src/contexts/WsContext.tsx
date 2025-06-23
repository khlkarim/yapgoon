import { createContext, type RefObject } from "react";
import type { Socket } from "socket.io-client";

export interface IWsContext {
    socketRef: RefObject<Socket | null> | null;
    connect: () => void;
}

export const WsContext = createContext<IWsContext>({
    socketRef: null,
    connect: () => {}
});