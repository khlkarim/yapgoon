import type { IPartialMessage } from "../../../types/IMessage";

interface MessageProps {
    message: IPartialMessage;
}

function Message({ message }: MessageProps) {
    return (
        <div className="box flex column">
            <div className="flex" style={{ justifyContent: 'left' }}>
                {message.owner? <div>{message.owner.username}</div>:<div>Anonymous Message</div>}
                <span style={{ color: "grey" }}>•</span>
                {
                    message.createdAt && 
                    <div style={{ color: "grey" }}>
                        {new Date(message.createdAt)
                            .toLocaleDateString("en-CA")
                            .replace(/\//g, "-")}
                    </div>
                }
            </div>

            <div>
                {message.content && <p>{message.content}</p>}
            </div>
        </div>
    );
}

export default Message;