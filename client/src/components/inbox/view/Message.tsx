import type { IPartialMessage } from "../../../types/IMessage";

interface MessageProps {
    message: IPartialMessage;
}

function Message({ message }: MessageProps) {
    return (
        <div className="box">
            {message.content}
        </div>
    );
}

export default Message;