import type { IChannel } from "../../../interfaces/entities/IChannel";

interface ItemProps {
    channel: IChannel
}

function Item({ channel }: ItemProps) {
    return (
        <div className="box">
            <div>{channel.name}</div>
            <div>{channel.description}</div>
            <div>{channel.status? 'Public': 'Private'}</div>
            <div>{new Date(channel.createdAt).toLocaleDateString()}</div>
        </div>
    );
}

export default Item;