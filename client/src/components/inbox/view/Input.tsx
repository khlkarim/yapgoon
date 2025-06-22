import { useState } from "react";
import useWS from "../../../hooks/useWS";
import type { IPartialChannel } from "../../../types/IChannel";

interface InputProps {
    selectedChannel: IPartialChannel;
}

function Input({ selectedChannel }: InputProps) {
    const socket = useWS();
    const [message, setMessage] = useState("");

    function handleSend() {
        if (!socket) return;
        if (message.trim().length > 0) {
            socket.emit("message", {
                content: message.trim(),
                channel: selectedChannel.name,
            });
            setMessage("");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="flex">
            <input
                type="text"
                value={message}
                style={{ background: "black", flex: 4 }}
                className="box"
                placeholder="Write a message"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className="box button"
                style={{ flex: 1 }}
                onClick={handleSend}
                disabled={!socket || message.trim().length === 0}
            >
                Send
            </button>
        </div>
    );
};

export default Input;