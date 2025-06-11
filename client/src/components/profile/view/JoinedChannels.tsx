import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import type { IPartialChannel } from "../../../types/IChannel";
import Filter from "../../channels/Filter";
import List from "../../channels/List";

function JoinedChannels(){
    const { user } = useUser();
    const [filters, setFilters] = useState<IPartialChannel>({ owner: user?.id });

    return (
        <div className="flex column">
            <Filter filters={filters} filterList={setFilters} />
            <List filters={filters} />
        </div>
    );  
}

export default JoinedChannels;