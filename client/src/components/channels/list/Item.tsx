import { channels } from "../../../api/channels";
import type { IChannel } from "../../../types/IChannel";

interface ItemProps {
    channel: IChannel;
    action: string | undefined;
}

function Item({ channel, action }: ItemProps) {

    function handleAction() {
        switch(action) {
            case "Join":
                channels.joinChannel({ channel });
                break;
            case "Leave":
                channels.leaveChannel({ channel });
                break;
            case "Delete":
                channels.deleteChannel({ channel });
                break;
        }
    }

    return (
        <div className="box flex" style={{ alignItems: 'center' }}>
            <div style={{ flex: 5 }}>
                <div className="flex" style={{ justifyContent: 'left' }}>
                    <div style={{ fontWeight: 'bold' }}>{channel.name}</div>
                    <span style={{ color: 'grey' }}>•</span>
                    <div style={{ color: 'grey' }}>{channel.public ? 'Public' : 'Private'}</div>
                    {action && (
                        <>
                            <span style={{ color: 'grey' }}>•</span>
                            <div style={{ color: 'grey' }}>
                                {new Date(channel.createdAt).toLocaleDateString('en-CA').split('/').join('-')}
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <p>{channel.description}</p>
                </div>
            </div>
            {action && (
                <button
                    className="box button"
                    style={{ flex: 1 }}
                    onClick={handleAction}
                >
                    {action}
                </button>
            )}
        </div>
    );
}

export default Item;