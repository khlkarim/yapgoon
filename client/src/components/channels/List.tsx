import useFetch from "../../hooks/useFetch";
import { useUser } from "../../hooks/useUser";
import type { IChannel, IPartialChannel } from "../../types/IChannel";
import Item from "./list/Item";

interface ListProps {
    endpoint: string,
    filters: IPartialChannel
}

function List({ endpoint, filters }: ListProps) {
    const { user } = useUser();

    const { data, isLoading, error } = useFetch({
        endpoint,
        params: (filters as object)
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
                <Item key={channel.id} channel={channel} user={user}/>
            ))}
        </div>
    );
};

export default List;