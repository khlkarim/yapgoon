import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import type { IPartialChannel } from "../../../types/IChannel";
import TextInput from "../../form/TextInput";

interface FilterProps {
    filters: IPartialChannel,
    filterList: Dispatch<SetStateAction<IPartialChannel>>
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
        <form onSubmit={handleSubmit} className="flex column">
            <TextInput name="search" value={search} placeholder="Seach for a specific channel... (you can use tags: @name, @owner...)" handleChange={handleChange} />
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