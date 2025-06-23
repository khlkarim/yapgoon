import { useState } from "react";
import Filter from "../../components/channels/Filter";
import List from "../../components/channels/List";
import type { IPartialChannel } from "../../types/IChannel";
import { useUser } from "../../hooks/useUser";

function Channels(){
    useUser();
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
        <div className='flex column w-80'>
            <Filter filters={filters} filterList={filterList} />
            <List endpoint={'channels'} filters={filters} action="Join" selectedChannel={null} selectChannel={() => {}} />
        </div>
    );
}

export default Channels;