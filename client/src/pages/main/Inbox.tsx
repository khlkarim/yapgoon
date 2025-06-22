import { useState } from "react";
import SideBar from "../../components/inbox/SideBar";
import View from "../../components/inbox/View";
import { useUser } from "../../hooks/useUser";
import type { IPartialChannel } from "../../types/IChannel";
import useWS from "../../hooks/useWS";

function Inbox(){
    useUser();
    const socket = useWS();
    const [selectedChannel, setSelectedChannel] = useState<IPartialChannel | null>(null);

    function selectChannel(channel: IPartialChannel | null) {
        setSelectedChannel(channel);
        
        if(socket && channel) {
            socket.emit('join', channel.name);
        }
    }

    return (
        <div className='flex w-80'>
            <SideBar selectedChannel={selectedChannel} selectChannel={selectChannel} />
            <View selectedChannel={selectedChannel} />
        </div>
    );
}

export default Inbox;