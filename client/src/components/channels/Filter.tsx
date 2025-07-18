import type { IPartialChannel } from "../../types/IChannel";
import { useState, type ChangeEvent } from "react";

interface FilterProps {
    filters: IPartialChannel,
    filterList: (filters: IPartialChannel) => void
}

function Filter({ filters, filterList }: FilterProps){
    const [search, setSearch] = useState(filtersToString(filters));

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const { value } = e.target;
        setSearch(value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        filterList(stringToFilters(search));
    }
    
    return (
        <form onSubmit={handleSubmit} className="box flex">
            <input
                type="text"
                name="search"
                style={{ flex:5, background: 'black' }}
                className="box"
                placeholder="Seach for a specific channel..."
                value={search}
                onChange={handleChange}
            />            
            <button className="box button" style={{ flex:2 }}>Search</button>
        </form>
    );
}

export default Filter;

function filtersToString(filters: IPartialChannel): string {
    return filters.name ?? '';
}

function stringToFilters(search: string): IPartialChannel {
    if(search.length == 0) return {};
    return {name: search};
}