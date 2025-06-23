import { useState } from "react";
import Filter from "../../channels/Filter";
import type { IPartialChannel } from "../../../types/IChannel";
import List from "../../channels/List";

function OwnedChannels(){
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
            <List endpoint={'channels/owned'} filters={filters}  action="Delete" selectChannel={() => {}} selectedChannel={null} />
        </div>
    );  
}

export default OwnedChannels;