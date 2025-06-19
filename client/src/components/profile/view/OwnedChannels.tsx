import { useState } from "react";
import Filter from "../../channels/Filter";
import type { IPartialChannel } from "../../../types/IChannel";
import List from "../../channels/List";

function OwnedChannels(){
    const [filters, setFilters] = useState<IPartialChannel>({});

    return (
        <div className="flex column">
            <Filter filters={filters} filterList={setFilters} />
            <List endpoint={'channels/owned'} filters={filters}  action="Delete" />
        </div>
    );  
}

export default OwnedChannels;