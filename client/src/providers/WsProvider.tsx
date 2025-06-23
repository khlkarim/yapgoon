import { useEffect, useRef, type ReactNode } from "react";
import { WsContext } from "../contexts/WsContext";
import { io, Socket } from "socket.io-client";

function WsProvider({ children }: { children: ReactNode }) {
    const socketRef = useRef<Socket | null>(null);

    function connect() {
        if(socketRef.current) {
            socketRef.current.disconnect();
        }
        socketRef.current = io('http://localhost:3000', {
            withCredentials: true,
        });   
    }
    
    useEffect(() => {
        connect();

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return (
        <WsContext.Provider value={{socketRef, connect}}>
            {children}
        </WsContext.Provider>
    );
}

export default WsProvider;