import useFetch from "../../hooks/useFetch";
import type { IChannel, IPartialChannel } from "../../types/IChannel";
import Item from "./list/Item";

interface ListProps {
    endpoint: string,
    filters: IPartialChannel,
    action: string | undefined;
}

function List({ endpoint, filters, action }: ListProps) {
    const { data, isLoading, error } = useFetch({
        endpoint,
        params: filters
    });

    if (isLoading) {
        return (
            <div className="box">
                <h4>Loading ...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div className="box">
                <h4>Error: {error}</h4>
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
        <div className="flex column">
            {(data as IChannel[]).map((channel) => (
                <Item key={channel.id} channel={channel} action={action} />
            ))}
        </div>
    );
};

export default List;