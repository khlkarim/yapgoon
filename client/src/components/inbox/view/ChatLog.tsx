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
    const socket = useWS().socketRef?.current;

    const [messages, setMessages] = useState<IPartialMessage[]>([]);
    const messagesRef = useRef(messages);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

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
        };

        const handleMessage = (msg: IPartialMessage) => {
            if (msg) setMessages([...messagesRef.current, msg]);
        };

        const handleError = () => {
            notify({ status: "error", message: "An Error Occurred" });
        };

        socket.on("accepted", handleAccepted);
        socket.on("message", handleMessage);
        socket.on("error", handleError);

        return () => {
            socket.off("accepted", handleAccepted);
            socket.off("message", handleMessage);
            socket.off("error", handleError);
        };
    }, [socket, selectedChannel]);

    return (
        <div ref={scrollRef} className="flex column scrollable" style={{ flex: 1, justifyContent:'start', gap: '10px' }}>
            {messages.map((message, index) => {
                return <Message key={index} message={message} />
            })}
        </div>
    );
}

export default ChatLog;