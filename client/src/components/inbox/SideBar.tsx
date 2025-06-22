import type { IPartialChannel } from "../../types/IChannel";
import List from "../channels/List";
import Filter from "./sidebar/Filter";

interface SidebarProps {
    selectedChannel: IPartialChannel | null;
    selectChannel: (channel: IPartialChannel | null) => void;
}

function SideBar({ selectedChannel, selectChannel }: SidebarProps){
    function filterList(){
        console.log("hi");
    }

    return (
        <div className="sidebar flex column" style={{ justifyContent: 'start' }}>
            <Filter filters={{}} filterList={filterList} />
            <List endpoint="channels/joined" filters={{}} action={'Select'} selectedChannel={selectedChannel} selectChannel={selectChannel} />
        </div>
    );
}

export default SideBar;