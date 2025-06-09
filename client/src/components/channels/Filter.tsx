import type { IPartialChannel } from "../../interfaces/entities/IChannel";
import type { FilterProps } from "../../interfaces/IProps";
import { useState } from "react";

function Filter({ filters, filterList }: FilterProps){
    const [search, setSearch] = useState(filtersToString(filters));

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        filterList(stringToFilters(search));
    }
    
    return (
        <form onSubmit={handleSubmit} className="box flex channel-filter">
            <input
                type="text"
                name="search"
                style={{ flex:5, background: 'black' }}
                className="box"
                placeholder="Seach for a specific channel... (you can use tags: @name, @owner...)"
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
            />
            <button className="box button" style={{ flex:2 }}>Search</button>
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