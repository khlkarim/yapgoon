import type { IChannel } from "../../../types/IChannel";

interface ItemProps {
    channel: IChannel
}

function Item({ channel }: ItemProps) {
    return (
        <div className="box flex" style={{ alignItems:'center' }}>
            <div style={{ flex:5 }}>
                <div className="flex" style={{ justifyContent:'left' }}>
                    <div style={{ fontWeight: 'bold' }}>{channel.name}</div>
                    <span style={{ color: 'grey' }}>•</span>
                    <div style={{ color: 'grey' }}>{channel.status ? 'Public' : 'Private'}</div>
                    <span style={{ color: 'grey' }}>•</span>
                    <div style={{ color: 'grey' }}>{new Date(channel.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                    <p>{channel.description}</p>
                </div>
            </div>
            <button className="box button" style={{ flex:1 }}>Join</button>
        </div>
    );
}

export default Item;