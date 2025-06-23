import { useState } from "react";
import type { IPartialChannel } from "../../../types/IChannel";
import Filter from "../../channels/Filter";
import List from "../../channels/List";

function JoinedChannels(){
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
        <div className="flex column">
            <Filter filters={filters} filterList={filterList} />
            <List endpoint={'channels/joined'} filters={filters} action="Leave" selectChannel={() => {}} selectedChannel={null} />
        </div>
    );  
}

export default JoinedChannels;