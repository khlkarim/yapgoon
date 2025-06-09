import useFetch from "../../hooks/useFetch";
import type { IChannel } from "../../interfaces/entities/IChannel";
import type { IFetch } from "../../interfaces/fetch/IFetch";
import type { ListProps } from "../../interfaces/IProps";
import Item from "./list/Item";

function List({ filters }: ListProps) {
    const { data, isLoading, error }: IFetch = useFetch({
        uri: 'channels',
        filters
    });

    if (isLoading) {
        return (
            <div className="box">
                <h3>Loading ...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="box">
                <h3>Error: {error}</h3>
            </div>
        );
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className="box">
                <h3>No Channels Found</h3>
            </div>
        );
    }

    return (
        <div className="box flex column">
            {(data as IChannel[]).map((channel: IChannel) => (
                <Item key={channel.id} channel={channel} />
            ))}
        </div>
    );
};

export default List;