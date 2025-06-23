import { channels } from "../../../api/channels";
import type { IChannel, IPartialChannel } from "../../../types/IChannel";

interface ItemProps {
    channel: IChannel;
    action?: "Join" | "Leave" | "Delete" | "Select";
    selectedChannel: IPartialChannel | null;
    selectChannel: (channel: IPartialChannel | null) => void;
}

function Item({ channel, action, selectChannel }: ItemProps) {
    const handleAction = (e: React.MouseEvent) => {
        e.stopPropagation();
        switch (action) {
            case "Join":
                channels.joinChannel({ channel });
                break;
            case "Leave":
                channels.leaveChannel({ channel });
                break;
            case "Delete":
                channels.deleteChannel({ channel });
                break;
            case "Select":
                selectChannel(channel);
                break;
            default:
                break;
        }
    };

    const handleSelect = () => {
        if (action === "Select") {
            selectChannel(channel);
        }
    };

    return (
        <div
            className="box flex"
            style={{
            alignItems: "center",
            cursor: action === "Select" ? "pointer" : undefined,
            }}
            onClick={handleSelect}
        >
            <div style={{ flex: 5 }}>
            <div className="flex" style={{ justifyContent: "left" }}>
                <div style={{ fontWeight: "bold" }}>{channel.name}</div>
                <span style={{ color: "grey" }}>•</span>
                <div style={{ color: "grey" }}>
                {channel.public ? "Public" : "Private"}
                </div>
                {action !== "Select" && (
                <>
                    <span style={{ color: "grey" }}>•</span>
                    <div style={{ color: "grey" }}>
                    {new Date(channel.createdAt)
                        .toLocaleDateString("en-CA")
                        .replace(/\//g, "-")}
                    </div>
                </>
                )}
            </div>
            <div>
                <p>{channel.description}</p>
            </div>
            </div>
            {action && action !== "Select" && (
            <button
                className="box button"
                style={{ flex: 1 }}
                onClick={handleAction}
                type="button"
            >
                {action}
            </button>
            )}
        </div>
    );
};

export default Item;