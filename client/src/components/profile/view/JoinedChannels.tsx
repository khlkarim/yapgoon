import { useState } from "react";
import type { IPartialChannel } from "../../../types/IChannel";
import Filter from "../../channels/Filter";
import List from "../../channels/List";

function JoinedChannels(){
    const [filters, setFilters] = useState<IPartialChannel>({});

    return (
        <div className="flex column">
            <Filter filters={filters} filterList={setFilters} />
            <List endpoint={'channels/joined'} filters={filters} action="Leave" />
        </div>
    );  
}

export default JoinedChannels;