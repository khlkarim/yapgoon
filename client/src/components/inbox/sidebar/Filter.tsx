import { useState } from "react";
import type { FilterProps } from "../../../interfaces/IProps";
import type { IPartialChannel } from "../../../interfaces/entities/IChannel";

function Filter({ filters, filterList }: FilterProps){
    const [search, setSearch] = useState(filtersToString(filters));

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        filterList(stringToFilters(search));
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex column">
            <input
                type="text"
                name="search"
                style={{ background: 'black' }}
                className="box"
                placeholder="Seach for a specific channel..."
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
            />
            <button className="box button">Search</button>
        </form>
    );
}

export default Filter;

function filtersToString(filters: IPartialChannel): string {
    return filters?.name ?? '';
}

function stringToFilters(search: string): IPartialChannel {
    return {name: search};
}