import { useState } from "react";
import Filter from "../../components/channels/Filter";
import List from "../../components/channels/List";
import type { IPartialChannel } from "../../types/IChannel";

function Channels(){
    const [filters, setFilters] = useState<IPartialChannel>(null);

    function filterList(filters: IPartialChannel) {
        if(filters){
            setFilters((prev) => ({
                ...prev,
                ...filters
            }));
        }else{
            setFilters(null);
        }
    }

    return (
        <div className='flex column w-80'>
            <Filter filters={filters} filterList={filterList} />
            <List endpoint={'channels'} filters={filters} />
        </div>
    );
}

export default Channels;