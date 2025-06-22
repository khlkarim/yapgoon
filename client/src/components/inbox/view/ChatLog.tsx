import { useEffect, useState, useRef } from "react";
import useWS from "../../../hooks/useWS";
import { notify } from "../../../utils/notify";
import type { IPartialMessage } from "../../../types/IMessage";
import type { IPartialChannel } from "../../../types/IChannel";
import Message from "./Message";

interface ChatLogProps {
    selectedChannel: IPartialChannel;
}

function ChatLog({ selectedChannel }: ChatLogProps) {
    const socket = useWS();
    const [messages, setMessages] = useState<IPartialMessage[]>([]);
    const messagesRef = useRef(messages);

    // Keep messagesRef in sync with messages state
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        if (!socket) {
            notify({ status: "error", message: "Failed to establish connection" });
            return;
        }

        setMessages([]);

        const handleAccepted = (msgs: IPartialMessage[]) => {
            if (msgs) setMessages(msgs);
            console.log('accepted', msgs);
        };

        const handleMessage = (msg: IPartialMessage) => {
            if (msg) setMessages([...messagesRef.current, msg]);
            console.log(msg, messagesRef.current);
        };

        const handleJoined = (username: string) => {
            console.log(username + " joined");
        };

        const handleLeft = (username: string) => {
            console.log(username + " left");
        };

        const handleError = (err: unknown) => {
            notify({ status: "error", message: "An Error Occurred" });
            console.log(err);
        };

        socket.on("accepted", handleAccepted);
        socket.on("message", handleMessage);
        socket.on("joined", handleJoined);
        socket.on("left", handleLeft);
        socket.on("error", handleError);

        return () => {
            socket.off("accepted", handleAccepted);
            socket.off("message", handleMessage);
            socket.off("joined", handleJoined);
            socket.off("left", handleLeft);
            socket.off("error", handleError);
        };
    }, [socket, selectedChannel]);

    return (
        <div className="scrollable" style={{ flex: 1 }}>
            {messages.map((message, index) => {
                return <Message key={index} message={message} />
            })}
        </div>
    );
}

export default ChatLog;