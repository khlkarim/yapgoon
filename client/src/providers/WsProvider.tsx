import { useEffect, useRef, type ReactNode } from "react";
import { WsContext } from "../contexts/WsContext";
import { io, Socket } from "socket.io-client";

function WsProvider({ children }: { children: ReactNode }) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:3000', {
            withCredentials: true,
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return (
        <WsContext.Provider value={socketRef}>
            {children}
        </WsContext.Provider>
    );
}

export default WsProvider;