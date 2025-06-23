import { useState } from "react";
import type { IPartialChannel } from "../../types/IChannel";
import List from "../channels/List";
import Filter from "./sidebar/Filter";

interface SidebarProps {
    selectedChannel: IPartialChannel | null;
    selectChannel: (channel: IPartialChannel | null) => void;
}

function SideBar({ selectedChannel, selectChannel }: SidebarProps){
    const [filters, setFilters] = useState<IPartialChannel>({});

    function filterList(filters: IPartialChannel) {
        if(filters){
            setFilters(() => ({
                ...filters
            }));
        }else{
            setFilters({});
        }
    }

    return (
        <div className="sidebar flex column" style={{ justifyContent: 'start' }}>
            <Filter filters={filters} filterList={filterList} />
            <List endpoint="channels/joined" filters={filters} action={'Select'} selectedChannel={selectedChannel} selectChannel={selectChannel} />
        </div>
    );
}

export default SideBar;